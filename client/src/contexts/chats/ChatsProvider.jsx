import { useQuery } from '@tanstack/react-query';
import { getChats } from '../../api/chats';
import { useAuth }  from '../index';
import ChatsContext from './ChatsContext';


const ChatsProvider = ({ children }) => {
  const { token, user } = useAuth();
  const getChatsQuery = useQuery({ queryKey: ['chats'], queryFn: () => getChats(token), enabled: !!user });


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