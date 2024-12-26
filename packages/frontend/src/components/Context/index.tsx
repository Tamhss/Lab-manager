'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface HeaderContextType {
    headerVisible: boolean;
    setHeaderVisible: (visible: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const useHeaderContext = () => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error('useHeaderContext must be used within a HeaderProvider');
    }
    return context;
};

interface HeaderProviderProps {
    children: ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
    const [headerVisible, setHeaderVisible] = useState(true);

    return (
        <HeaderContext.Provider value={{ headerVisible, setHeaderVisible }}>
            {children}
        </HeaderContext.Provider>
    );
};
