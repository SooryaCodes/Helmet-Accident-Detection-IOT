import React from 'react';

interface InitialAvatarProps {
  name?: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
}

const InitialAvatar: React.FC<InitialAvatarProps> = ({
  name,
  size = 40,        // Default size of 50px
  textColor = 'white', // Default text color
}) => {
  const firstLetter = name?.charAt(0).toUpperCase(); // Get the first letter of the name

  return (
    <div
    className='bg-indigo-700'
      style={{
        width: size,
        height: size,
        color: textColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontSize: size / 2,
        fontWeight: 'medium',
        textTransform: 'uppercase',
      }}
    >
      {firstLetter}
    </div>
  );
};

export default InitialAvatar;
