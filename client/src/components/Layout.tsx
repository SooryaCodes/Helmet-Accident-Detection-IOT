import React from 'react';
import Header from  "../components/Header"
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className=''>
     <Header bg={true}/>
      <main className=''>{children}</main>
     
    </div>
  );
};

export default Layout;
