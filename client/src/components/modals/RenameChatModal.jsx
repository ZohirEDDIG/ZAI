import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAuth, useChat, useChats } from '../../contexts/index';
import darkToast  from '../../utils/darkToast';


const RenameChatModal = ({ isRenameChatModalOpen, setIsRenameChatModalOpen, chatToShowOptions, setChatToShowOptions  }) => {
  const [newTitle, setNewTitle] = useState('Simple Test and Respons');

  const { token } = useAuth();
  const { renameChatMutation } = useChat();
  const { getChatsQuery } = useChats();

  const disabled  = newTitle === '' || newTitle === 'Simple Test and Respons';

  const handleRenameChat = () => {
    renameChatMutation.mutate({ chatId: chatToShowOptions, newTitle, token });
  }

  useEffect(() => {
      if(renameChatMutation.isSuccess) {
        setNewTitle('Simple Test and Respons');
        setIsRenameChatModalOpen(false);
        setChatToShowOptions(null);
        getChatsQuery.refetch();
        darkToast(renameChatMutation.data.data.message || 'Chat renamed successfully', '✅');
      }
  
      if(renameChatMutation.isError) {
        darkToast(renameChatMutation.error.response.data.error || 'Failed to rename chat', '❌');
      }
  
  }, [renameChatMutation.isSuccess, renameChatMutation.isError]);

  const handleCancelRenameChat = () => {
    setIsRenameChatModalOpen(false);
    setChatToShowOptions(null);
  }


  return (
    <Modal className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' overlayClassName='bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 right-0 bottom-0 z-[1000]' isOpen={isRenameChatModalOpen}   onRequestClose={() => setIsRenameChatModalOpen(false)}  contentLabel="Rename Chat Modal">
      
      <div className='bg-[#1F1F1F] w-[300px] sm:w-[400px] p-4 rounded-md flex flex-col gap-y-8'>
        
        <h1 className='text-white text-base sm:text-xl'>Rename this chat</h1>
        
        <input type="text" id='title' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className='text-gray-200 text-sm p-2 border border-gray-400 outline-none  focus:border-[#a8c7fa]'  />
        
        <div className='flex justify-end gap-x-4'>
          
          <button type='button' onClick={handleCancelRenameChat} className='text-main text-xs sm:text-sm cursor-pointer select-none'>Cancel</button>
          
          <button type='button' onClick={handleRenameChat}  disabled={disabled} className={`text-main text-xs sm:text-sm ${disabled  ? '!text-gray-600 pointer-events-none' : 'cursor-pointer'}  select-none`}>{ renameChatMutation.isPending ? 'Renaming' : 'Rename Chat'}</button>
        
        </div>

      </div>

    </Modal>
  );
};

export default RenameChatModal;