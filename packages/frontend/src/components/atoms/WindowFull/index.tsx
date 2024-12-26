import React, { useState } from 'react';

function WindowTool() {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
        } else {
            if (document.fullscreenElement && document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div className="window_tool">
            <button
                onClick={toggleFullScreen}
                className="flex items-center space-x-2 px-6 h-10 hover:bg-[#2F95AB] border-l-1 border-[#248296]  text-[10px]"
            >
                <img
                    src={isFullScreen ? "icon/ico_full_off.svg" : "icon/ico_full_on.svg"}
                    alt={isFullScreen ? "縮小" : "全画面"}
                    className="w-4 h-4"
                />
                <span>{isFullScreen ? "縮小" : "全画面"}</span>
            </button>
        </div>
    );
}

export default WindowTool;
