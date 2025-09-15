import toast from 'react-hot-toast';

const darkToast = (message, icon) => {
  return toast(message, {
    icon: icon ? icon : null,
    style: {
      backgroundColor: '#282a2c',
      color: '#ffffff',
      fontSize: '12px',
      borderRadius: '10px',
    },
  });
};

export default darkToast;