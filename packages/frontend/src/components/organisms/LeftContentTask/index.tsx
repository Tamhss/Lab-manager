import React, { useState } from "react";

const LeftContentTask = () => {
    const [leftContent, setLeftContent] = useState(true);

    const showLeftContent = () => {
        setLeftContent(!leftContent);
    };

    const [openSection, setOpenSection] = useState<number | null>(null);

    const toggleSection = (section: number) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="relative flex items-start">
            {!leftContent ? (
                <div
                    onClick={showLeftContent}
                    className={`h-[76px] border border-gray-300 rounded-r-[10px] cursor-pointer transition-all ease-in-out duration-500 w-[23px]`}
                    style={{
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                        background: "url(/imagestask/icon/ico_tab_arrow.svg) no-repeat 7px 30px",
                    }}
                ></div>
            ) : (
                <div
                    className={`shadow-lg transform transition-transform duration-300 ${leftContent ? 'translate-x-0' : '-translate-x-full'} leftcontent`}
                >
                    <div className="py-2 pl-2 font-bold bg-[#2DA2BB] rounded-tr-[10px]">
                        <p className="text-[16px]">タスク</p>
                        <span className="iconmenutitle ml-2" onClick={showLeftContent}></span>
                    </div>
                    <div className="menu">
                        <div className="menu1">
                            <a
                                className="block p-2 max-w-[130px] text-[12px] text-[#000] relative"
                                onClick={() => toggleSection(1)}
                            >
                                <span className="flex items-center">
                                    <p>基本タスク</p>
                                    {openSection === 1 ? (
                                        <img
                                            className="ml-[37px]"
                                            src="/imagestask/icon/ico_minus.svg"
                                        />
                                    ) : (
                                        <img
                                            className="ml-[37px]"
                                            src="/imagestask/icon/ico_plus.svg"
                                        />
                                    )}
                                </span>
                            </a>
                            <div
                                className={`grid overflow-auto transition-all duration-300 ease-in-out ${openSection === 1
                                    ? "max-h-[100px] opacity-100"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <ul>
                                    <li className="border-y-1 text-[#000] text-[12px] px-2 py-1">
                                        <a className="text-[#0000EE]">休憩</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="menu2">
                            <a
                                className="p-2 max-w-[130px] text-[12px] text-black relative flex justify-between"
                                onClick={() => toggleSection(2)}
                            >
                                <span className="flex items-center">
                                    <p className="mr-[6px]">ﾁｪｯｶｰ部門</p>
                                    {openSection === 2 ? (
                                        <img
                                            className="ml-[37px]"
                                            src="/imagestask/icon/ico_minus.svg"
                                            alt="minus icon"
                                        />
                                    ) : (
                                        <img
                                            className="ml-[37px]"
                                            src="/imagestask/icon/ico_plus.svg"
                                            alt="plus icon"
                                        />
                                    )}
                                </span>
                            </a>
                            <div
                                className={`grid overflow-auto transition-all duration-300 ease-in-out ${openSection === 2
                                    ? "max-h-[200px] opacity-200"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <ul className="border text-[#0000EE]">
                                    <li className="border-b-1 text-[12px] px-2 py-1 bg-[#BFEAFF]">
                                        <a>31</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>32</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>33</a>
                                    </li>
                                    <li className="border-b-1  text-[12px] px-2 py-1">
                                        <a>34</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>35</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>36</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>37</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>休憩</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>休憩</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>休憩</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="menu3">
                            <a
                                className="p-2 max-w-[130px] text-[12px] text-black relative flex justify-between"
                                onClick={() => toggleSection(3)}
                            >
                                <span className="flex items-center">
                                    <p>フロア部門</p>
                                    {openSection === 3 ? (
                                        <img
                                            className="ml-[37px]"
                                            src="/imagestask/icon/ico_minus.svg"
                                            alt="minus icon"
                                        />
                                    ) : (
                                        <img
                                            className="ml-[37px]"
                                            src="/imagestask/icon/ico_plus.svg"
                                            alt="plus icon"
                                        />
                                    )}
                                </span>
                            </a>
                            <div
                                className={`grid overflow-auto transition-all duration-300 ease-in-out ${openSection === 3
                                    ? "max-h-[200px] opacity-200"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <ul className="border text-[#0000EE]">
                                    <li className="border-b-1 text-[12px] px-2 py-1 bg-[#BFEAFF]">
                                        <a>31</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>32</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>33</a>
                                    </li>
                                    <li className="border-b-1  text-[12px] px-2 py-1">
                                        <a>34</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>35</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>36</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>37</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>休憩</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>休憩</a>
                                    </li>
                                    <li className="border-b-1 text-[12px] px-2 py-1">
                                        <a>休憩</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeftContentTask;
