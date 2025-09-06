import { useEffect } from 'react';
import { Sidebar, Header, ChatBox } from '../components/index';
import { useAuth, useChat } from '../contexts/index';


const Home = () => {
  const { loginMutation } = useAuth();
  const { handleCreateNewChat } = useChat();


  useEffect(() => {
    if(loginMutation.success) {
      handleCreateNewChat();
    }
  }, [loginMutation.success]);

  return (
    <main className='flex'>

      <Sidebar />

      <div className='max-[400px]:max-w-[400px] max-sm:ml-8 max-lg:ml-[112px] m-8 flex-1 flex flex-col gap-y-8'>

        <Header />

        <ChatBox />

      </div>

    </main>
  );
};

export default Home;