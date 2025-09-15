import { useContext } from 'react';
import ChatsContext from './ChatsContext';

const useChats = () => {
    const context = useContext(ChatsContext);
    if (!context) throw new Error('useChats must be used within a ChatsProvider');
    return context;
};

export default useChats;