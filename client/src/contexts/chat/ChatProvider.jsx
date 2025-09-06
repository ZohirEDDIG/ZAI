import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteChat, saveChat, renameChat, updateChat } from '../../api/chat';
import sendPrompt from '../../services/geminiApis';
import { useAuth, useChats } from '../index' ;
import ChatContext from './ChatContext';


const ChatProvider = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const { token , user, loginMutation } = useAuth();
  const { getChatsQuery } = useChats();
  
  
  const saveChatMutation = useMutation({ mutationFn: saveChat });
  const updateChatMutation = useMutation({ mutationFn: updateChat });
  const deleteChatMutation  = useMutation({ mutationFn: deleteChat });
  const renameChatMutation  = useMutation({ mutationFn: renameChat });

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      if(loading) return;
      if(prompt) handleSendPrompt(prompt);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value); 
  };

  const handleCurrentChatChange = (chat, id) => {
    setCurrentChat([...chat]);
    setCurrentChatId(id);
  };
  
  const handleCreateNewChat = () => {
    setCurrentChat([]);
    setCurrentChatId(null);
  }

  const handleSendPrompt = async (prompt) => {
    
    if(!prompt.trim()) return;

    const userMsg = { sender: 'user', content: prompt };
    const aiMsg = { sender: 'ai', content: 'Loading' };

    setCurrentChat([...currentChat, userMsg, aiMsg]);

    setPrompt('');

    setLoading(true);
    const aiResponse = await sendPrompt(prompt);

    setCurrentChat((prev) => {
      const updateCurrentChat = [...prev];
      updateCurrentChat[updateCurrentChat.length - 1] = { sender: 'ai', content: aiResponse };
      return updateCurrentChat;
    });

    setLoading(false);

    if(user) {
      if(currentChat.length === 0 && !currentChatId ) {
        const chat = {
          title: prompt.split(' ').slice(0, 10).join(' '),
          chat: [
            userMsg,
            { sender: 'ai', content: aiResponse }
          ]
        }

        saveChatMutation.mutate({ token, chat });
      } else {
        const newMessages = [userMsg, { sender: 'ai', content: aiResponse }];
        updateChatMutation.mutate({ token, chatId: currentChatId, newMessages });
      }
    }
  };


  useEffect(() => {
    if(saveChatMutation.isSuccess) {
      setCurrentChatId(saveChatMutation.data.data.chatId);
      getChatsQuery.refetch();
    }
  }, [saveChatMutation.isSuccess]);

  useEffect(() => {
    if(updateChatMutation.isSuccess ) {
      getChatsQuery.refetch();
    }
  }, [updateChatMutation.isSuccess]);

  useEffect(() => {
    if(loginMutation.isSuccess) {
      handleCreateNewChat();
    }
  }, [loginMutation.isSuccess]);
  

  const value = {
    prompt,
    loading,
    currentChat,
    setCurrentChat,
    handlePromptChange, 
    handleCurrentChatChange,
    handleKeyDown,
    handleSendPrompt,
    handleCreateNewChat,
    deleteChatMutation,
    renameChatMutation,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;