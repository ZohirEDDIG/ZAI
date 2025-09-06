import Modal from 'react-modal';
import { Toaster } from 'react-hot-toast';
import { GlobalProvider, AuthProvider, ChatsProvider, ChatProvider } from './contexts/index';
import Routes from './routes/Routes';

Modal.setAppElement('#root');


const App = () => {
  return (
    <AuthProvider>
          <ChatsProvider>
            <ChatProvider>
            <GlobalProvider>
              <Toaster />
              <Routes />
            </GlobalProvider>
            </ChatProvider>
          </ChatsProvider>
        </AuthProvider>
  );
};

export default App;
