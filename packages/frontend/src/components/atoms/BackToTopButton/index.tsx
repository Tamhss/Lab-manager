import React, { RefObject, useState, useEffect } from "react";

interface ScrollToTopButtonProps {
    scrollRef: RefObject<HTMLDivElement>;
    buttonStyle?: string;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ scrollRef, buttonStyle }) => {
    const [isVisible, setIsVisible] = useState(false);
    const scrollToTop = () => {
        scrollRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    useEffect(() => {
        const toggleVisibility = () => {
            if ((scrollRef.current?.scrollTop || 0) > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        const currentRef = scrollRef.current;
        currentRef?.addEventListener("scroll", toggleVisibility);

        return () => currentRef?.removeEventListener("scroll", toggleVisibility);
    }, [scrollRef]);

    if (!isVisible) return null;
    return (
        <button
            onClick={scrollToTop}
            className={`${buttonStyle}`}
        >
            <img src="/icon/ico_arrow.svg" />
        </button>
    );
};

export default ScrollToTopButton;
