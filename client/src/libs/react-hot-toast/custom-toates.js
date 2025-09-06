import toast from 'react-hot-toast';

export const darkToast = (message, icon) => {
  return (
    toast(message, {
      icon: icon ? icon : null,
      style: {
        backgroundColor: '#282a2c',
        color: 'white',
        fontSize: '12px',
        borderRadius: '10px',
      }
    })
  );
};