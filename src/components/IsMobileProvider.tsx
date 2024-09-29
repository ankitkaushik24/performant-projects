"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";

const IsMobileContext = React.createContext<boolean>(false);

const IsMobileProvider = ({ children }: PropsWithChildren) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <IsMobileContext.Provider value={isMobile}>
      {children}
    </IsMobileContext.Provider>
  );
};

export const useIsMobile = () => {
  return React.useContext(IsMobileContext);
};

export default IsMobileProvider;
