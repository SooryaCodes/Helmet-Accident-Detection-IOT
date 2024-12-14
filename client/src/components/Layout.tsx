import React from 'react';
import Header from  "../components/Header"
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className=''>
     <Header/>
      <main className=''>{children}</main>
      <footer>
        <p>&copy; 2024 Your App Name</p>
      </footer>
    </div>
  );
};

export default Layout;
