import React from 'react';

export const Img = ({ folder, img, type, alt = '' }) => {
   return (
      <div>
      <img src={`/imgs/${folder}/${img}.${type}`} alt={alt} style={{ width: '100%' }} />
      </div>
   );
};