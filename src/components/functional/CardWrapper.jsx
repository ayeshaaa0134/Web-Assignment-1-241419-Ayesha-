import React from 'react';

const CardWrapper = ({ children, title }) => {
  return (
    <div className="card-wrapper" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '10px 0' }}>
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      {children}
    </div>
  );
};

export default CardWrapper;