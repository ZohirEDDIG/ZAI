import { useState, useEffect } from 'react';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';

const Avatar = ({ username, handleClick }) => {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const generateAvatar = async () => {
      const svg = createAvatar(initials, {
        seed: username,
        backgroundColor: ['a8c7fa'],
        size: 32,
      }).toDataUri();

      setAvatar(svg);
    };

    generateAvatar();
  }, [username]);

  return (
    avatar && <img src={avatar} alt='User avatar' onClick={handleClick} className='rounded-full cursor-pointer select-none' />
  );
};

export default Avatar;
