import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

interface OtheritemProps {
    onShowTableKinmu: () => void;
    onShowTableStaff: () => void;
}

const Otheritem: React.FC<OtheritemProps> = ({ onShowTableKinmu, onShowTableStaff }) => {
    const handleClickKinmu = (e: React.MouseEvent) => {
        e.stopPropagation();
        onShowTableKinmu();
    }
    const handleClickStaff = (e: React.MouseEvent) => {
        e.stopPropagation();
        onShowTableStaff();
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <button onClick={handleClickKinmu} className='border-none w-[130px] text-[#65849B] text-left text-[10px] font-bold hover:text-[#2DA2BB]'>
                    <span className="flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5">
                            <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <p className="ml-1 pt-[2px]">勤務パターン</p>
                    </span>
                </button>
            ),
        },
        {
            key: '2',

            label: (
                <button onClick={handleClickStaff} className='border-none w-[130px] text-[#65849B] text-left text-[10px] font-bold hover:text-[#2DA2BB] '>
                    <span className="flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="ml-1 pt-[3px]">スタッフグループ</p>
                    </span>
                </button>
            ),
        },
    ];

    return (
        <Space>
            <Dropdown menu={{ items }} placement="bottomRight" arrow trigger={['click']} className='h-[39px] text-[10px]'>
                <button className=' flex bg-[#2DA2BB] text-white rounded-none hover:text-white pt-3 px-3 hover:bg-[#3094AB] transition duration-200 ]'>
                    <span>
                        人事確認
                        <span className='text-[8px] pr-2'>を表示</span>
                    </span>
                    <img src="icon/ico_arrow.svg" className='w-3 h-3' style={{ transform: 'rotate(270deg)' }} />
                </button>
            </Dropdown>
        </Space>
    );
};

export default Otheritem;
