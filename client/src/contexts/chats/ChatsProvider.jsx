import { useQuery } from '@tanstack/react-query';
import ChatsContext from './ChatsContext';
import { getChats } from '../../api/chats';
import { useAuth }  from '../index';


const ChatsProvider = ({ children }) => {
  const { token, user } = useAuth();

  const getChatsQuery = useQuery({ queryKey: ['chats'], queryFn: () => getChats(token), enabled: !!user?._id });

  const value = { 
    getChatsQuery, 
  };

  return (
    <ChatsContext.Provider value={value}>
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsProvider;