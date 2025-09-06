import Modal from 'react-modal';
import { useEffect } from 'react';
import { darkToast } from '../../libs/react-hot-toast/custom-toates';
import { useAuth, useChat, useChats } from '../../contexts/index';

Modal.setAppElement('#root');

const DeleteChatModal = ({ isDeleteChatModalOpen, setIsDeleteChatModalOpen, chatToShowOptions, setChatToShowOptions  }) => {
  const { token } = useAuth();
  const { currentChat, createNewChat, deleteChatMutation  } = useChat();
  const { getChatsQuery  } = useChats();

  const handleDeleteChat = async () => {
    deleteChatMutation.mutate({ chatId: chatToShowOptions, token });
  };


  useEffect(() => {
    if(deleteChatMutation.isSuccess) {
      if(currentChat._id === chatToShowOptions) {
        createNewChat();
      }
      setIsDeleteChatModalOpen(false);
      setChatToShowOptions(null);
      getChatsQuery.refetch();
      darkToast(deleteChatMutation.data.data.message || 'Chat deleted successfully', '✅');
    }

    if(deleteChatMutation.isError) {
      darkToast(deleteChatMutation.error.response.data.error || 'Failed to delete chat', '❌');
    }

  }, [deleteChatMutation.isSuccess, deleteChatMutation.isError]);

  const handleCancelDeleteChat = () => {
    setIsDeleteChatModalOpen(false);
    setChatToShowOptions(null);
  }

  return (
    <Modal className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'  overlayClassName='bg-[rgba(0,0,0,0.6)] fixed top-0 left-0 right-0 bottom-0 z-[1000]' 
      isOpen={isDeleteChatModalOpen}   onRequestClose={() => setIsDeleteChatModalOpen(false)}  contentLabel='Delete Chat Modal'>
      
      <div className='bg-dark-gray w-[300px] sm:w-[400px] p-4 rounded-md flex flex-col gap-y-6 sm:gap-y-8'>
       
        <h1 className='text-white text-base sm:text-xl'>Delete chat?</h1>
        
        <p className='text-gray-200 text-xs sm:text-sm '>This will delete all prompts and responses</p>
        
        <div className='flex justify-end gap-x-4'>
          
          <button type='button' onClick={handleCancelDeleteChat} className='text-main text-xs sm:text-sm cursor-pointer select-none'>Cancel</button>
          
          <button type='button' onClick={handleDeleteChat} className='text-main text-xs sm:text-sm cursor-pointer select-none'>{deleteChatMutation.isPending ? 'Deleting...' : 'Delete'}</button>
        
        </div>

      </div>

    </Modal>
  );
};

export default DeleteChatModal;