'use client'
import React, { useState, useEffect } from "react";
import { Header } from "../HeaderShift";
import { Content } from '@/components/organisms/ContentShift';

export const ShiftPage: React.FC = () => {
    const [showTableKinmu, setShowTableKinmu] = useState(false);
    const [showTableStaff, setShowTableStaff] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [showShukeiWrap, setShowShukeiWrap] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleClick = (index: number) => setActiveIndex(index);
    const handleShowShukeiWrap = () => setShowShukeiWrap(prev => !prev);
    const handleShowTableKinmu = () => setShowTableKinmu(prev => !prev);
    const handleShowTableStaff = () => setShowTableStaff(prev => !prev);

    if (!isClient) return null;

    return (
        <div className='bg-[#E1E5E6] h-[100vh] font-custom '>
            <Header
                activeIndex={activeIndex}
                handleClick={handleClick}
                handleShowShukeiWrap={handleShowShukeiWrap}
                handleShowTableKinmu={handleShowTableKinmu}
                handleShowTableStaff={handleShowTableStaff}
            />
            <Content
                showTableKinmu={showTableKinmu}
                showTableStaff={showTableStaff}
                showShukeiWrap={showShukeiWrap}
            />
        </div>
    );
};
