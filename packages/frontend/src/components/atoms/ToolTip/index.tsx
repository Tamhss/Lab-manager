import React, { useState, useEffect, useRef } from 'react';

interface TooltipProps {
    content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number, left: number } | null>(null);
    const [visible, setVisible] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        if (!visible) {
            setVisible(true);
            setTimeout(() => {
                setOpacity(1);
            }, 100);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (mousePosition.x === 0 && mousePosition.y === 0) return;

        const tooltipHeight = tooltipRef.current?.offsetHeight || 0;

        let newLeft = mousePosition.x + 10;
        let newTop = mousePosition.y + 10;


        if (newTop + tooltipHeight > window.innerHeight) {
            newTop = mousePosition.y - tooltipHeight - 10;
        }



        setTooltipPosition({ top: newTop, left: newLeft });
    }, [mousePosition]);

    if (!tooltipPosition || !visible) {
        return null;
    }

    return (
        <div
            ref={tooltipRef}
            className="bg-[#EEEEEE] p-2 z-10 fixed transition-opacity duration-500 ease-in-out text-[15.4px] tooltip"
            style={{
                top: `${tooltipPosition.top}px`,
                left: `${tooltipPosition.left}px`,
                opacity: opacity,
            }}
        >
            {content}
        </div>
    );
};
