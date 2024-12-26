import React, { useState, useRef, useEffect } from 'react';


const Add: React.FC = ({ }) => {

    return (
        <div className="cursor-pointer">
            <dl>
                <div className="shift_kibou ">
                    <dd
                        className={` 
                            transition-transform 
                            duration-100
                            ease-in-out 
                            w-[50px]
                            font-bold h-11 text-[13px]
                            flex items-center 
                            justify-center
                            bg-[#FFFFFF]
                        `}
                        style={{
                            backgroundImage: `url(imageshift/ico_plus.svg)`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            position: 'relative',
                        }}
                    >
                    </dd>
                </div>
            </dl>
        </div>
    );
};

export default Add;
