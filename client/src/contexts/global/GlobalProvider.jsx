import { useState } from 'react';
import GlobalContext from './GlobalContext';
import { useWindowWidth } from '../../hooks';
import { useAuth, useChat } from '../index';

const GlobalProvider = ({ children }) => {
  const windowWidth = useWindowWidth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(windowWidth >= 1024 ? true : false);

  
  const { logout } = useAuth();
  const { handleCreateNewChat } = useChat();

  const handleLogoutAndClear = () => {
    logout();
    handleCreateNewChat();
  }

  const value = {
    isSidebarOpen,
    setIsSidebarOpen,
    handleLogoutAndClear
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;