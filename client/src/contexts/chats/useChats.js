import { useContext } from 'react';
import ChatsContext from './ChatsContext';

const useChats = () => useContext(ChatsContext);

export default useChats;