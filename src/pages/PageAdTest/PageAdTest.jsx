import React, { useEffect } from 'react';

export const PageAdTest = () => {
   useEffect(() => {
      try {
         (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
         console.log('AdSense error:', err);
      }
   }, []);

   return (
      <div>
         <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-9697023842394750"
            data-ad-slot="9030755742"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
      </div>
   );
};
