import React from 'react';

const Logo = (props) => {
  return (
    <>
      <img
        alt="Logo"
        src="/static/logo.svg"
        {...props}
      />
      <h1 style={{ display: 'inline', color: 'white' }}>VERAOP</h1>
    </>
  );
};

export default Logo;
