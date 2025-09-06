import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars,  Edit, Pen, Search, ThreeDotsVertical, Trash, X } from '../icons/index';
import { useAuth, useChats, useChat, useGlobal } from '../contexts/index';
import { useClickOutside } from '../hooks/index';
import { DeleteChatModal, RenameChatModal } from './modals/index';

const Sidebar = () => {
  const { user } = useAuth();
  const { currentChat, handleCurrentChatChange, handleCreateNewChat } = useChat();
  const { getChatsQuery } = useChats();

  const { isSidebarOpen, setIsSidebarOpen } = useGlobal();

  const sidebarRef = useRef(null);

  useClickOutside('sidebar', sidebarRef, setIsSidebarOpen);

  const [chatToShowOptions, setChatToShowOptions] = useState(null);
  const [isChatOptionsVisible, setIsChatOptionsVisible] = useState(false);

  const handleShowChatOptions = (chatId) => {
    if(chatToShowOptions === chatId) setIsChatOptionsVisible((prev) => !prev);
    else {
      setChatToShowOptions(chatId);
      setIsChatOptionsVisible(true);
    }
  }

  const [isDeleteChatModalOpen, setIsDeleteChatModalOpen] = useState(false);
  const [isRenameChatModalOpen, setIsRenameChatModalOpen] = useState(false);

  return (

    <aside ref={sidebarRef} className={`bg-dark-gray ${isSidebarOpen ? 'w-[250px] sm:w-[320px]' : 'w-[80px]'} h-screen  py-8 flex flex-col gap-y-8 shadow-sm ${isSidebarOpen ?  'max-sm-w-[250px]' : 'max-sm:w-0'}  fixed z-10 lg:static overflow-x-hidden overflow-y-scroll transition-[width] duration-200 ease-in-out`}>

      <div className='flex justify-between items-center'>
        
        <button type='button' onClick={() => setIsSidebarOpen((prev) => !prev)} className='w-fit text-white p-2 mx-6  rounded-full cursor-pointer select-none max-sm:hidden hover:bg-light-gray'><Bars /></button>
        
        <button type='button' onClick={() => setIsSidebarOpen(false)} className='w-fit text-white p-2 mx-6  rounded-full cursor-pointer select-none sm:hidden  hover:bg-light-gray'><X /></button>

        <Link to='/search' className='w-fit text-white p-2 mx-6  rounded-full cursor-pointer select-none max-sm:hidden hover:bg-light-gray'><Search /></Link>

      </div>


      <button type='button' onClick={handleCreateNewChat} disabled={currentChat.length === 0} className={`w-fit text-gray-400  px-2 mx-4  flex items-center rounded-full ${currentChat.length > 0 ? 'cursor-pointer' : 'opacity-60 pointer-events-none'} select-none ${isSidebarOpen && 'hover:bg-light-gray'}`}>
        
        <span className={`text-xl p-2 ${!isSidebarOpen && 'content-center rounded-full  hover:bg-light-gray'}`}><Edit/></span>
        
        <span className={isSidebarOpen ? 'w-[82.06px] pr-2' : 'hidden w-0'}>New Chat</span>

      </button>


      <h1 className={`${isSidebarOpen ? 'block' : 'hidden'} text-gray-400 mx-8`}>Recent</h1>

      {
        user 

        ? (

          <div className={`${isSidebarOpen ? 'block' : 'hidden'} mx-4 flex flex-col gap-y-2`}>

            {

              getChatsQuery.isPending 
              
              ? <p className='w-[178px] sm:w-[280px] text-gray-400 text-sm px-4'>Loading chats...</p>

              : getChatsQuery.isSuccess 

              ? (

                  getChatsQuery.data.data.chats.map((chat) => (

                    <div key={chat._id} className='flex justify-between items-center gap-x-2 relative'>
                      
                      <div className='px-4 py-1 flex-1 rounded-full hover:bg-light-gray'>

                        <p className='text-gray-400 text-sm line-clamp-1 cursor-pointer select-none' onClick={() => handleCurrentChatChange(chat.chat, chat._id)}>{chat.title}</p>

                      </div>

                      <button type='button' onClick={() => handleShowChatOptions(chat._id)} className='text-gray-400 p-1 rounded-full cursor-pointer select-none hover:bg-light-gray'><ThreeDotsVertical /></button>

                      { chatToShowOptions === chat._id && isChatOptionsVisible && <ChatOptions setIsChatOptionsVisible={setIsChatOptionsVisible} setIsDeleteChatModalOpen={setIsDeleteChatModalOpen} setIsRenameChatModalOpen={setIsRenameChatModalOpen} /> }

                    </div>

                  ) )

                )  : getChatsQuery.isError 

              ? <p className='w-[178px] sm:w-[280px] text-gray-400 text-sm px-4'>{getChatsQuery.error.response.data.error || 'Failed to load chats'}</p>

              : null 

            }

          </div>

        ) 

        : (

          <div className={ `bg-light-gray ${isSidebarOpen ? 'flex w-[200px] sm:w-[248px]' : 'w-0 hidden'} mx-4 p-4 rounded-lg items-start flex-col gap-y-6  overflow-hidden`}>

            <div className='flex flex-col gap-y-2'>

              <p className='text-white text-sm'>login to start saving your chats</p>

              <p className='text-gray-400 text-sm'>Once you're logged in, you can access your recent chats here</p>

            </div>

            <Link to='/login' className='text-main select-none'>Login</Link>

          </div> 

        )

      }

      <DeleteChatModal isDeleteChatModalOpen={isDeleteChatModalOpen} setIsDeleteChatModalOpen={setIsDeleteChatModalOpen} 
                       chatToShowOptions={chatToShowOptions} setChatToShowOptions={setChatToShowOptions} />

      <RenameChatModal isRenameChatModalOpen={isRenameChatModalOpen} setIsRenameChatModalOpen={setIsRenameChatModalOpen} 
                       chatToShowOptions={chatToShowOptions} setChatToShowOptions={setChatToShowOptions} />
    
    </aside>
  
  );
};

export default Sidebar;


const ChatOptions = ({ setIsChatOptionsVisible, setIsDeleteChatModalOpen, setIsRenameChatModalOpen }) => {
  const chatOptionsRef = useRef(null);

  useClickOutside('chatOptions', chatOptionsRef, setIsChatOptionsVisible);

  const handleDeleteChat = () => {
    setIsChatOptionsVisible(false)
    setIsDeleteChatModalOpen(true);
  };

  const handleRenameChat = () => {
    setIsChatOptionsVisible(false)
    setIsRenameChatModalOpen(true);
  };


  return (
    <div ref={chatOptionsRef} className='w-[100px] bg-body py-2 rounded-md flex flex-col gap-y-1 absolute top-5 right-0 z-10'>

      <button type='button'  onClick={handleRenameChat} className='text-gray-200 text-[12px] text-center py-1 flex justify-center items-center gap-x-2  cursor-pointer select-none hover:bg-dark-gray'>
        <Pen /> Rename
      </button>

      <button type='button' onClick={handleDeleteChat} className='text-gray-200 text-[12px] text-center py-1 flex justify-center items-center gap-x-2  cursor-pointer select-none hover:bg-dark-gray'>
          <Trash/> Delete
      </button>

    </div> 
  );
};