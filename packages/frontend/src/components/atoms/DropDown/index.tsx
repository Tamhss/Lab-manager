import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (

            <button className='border-none w-[150px] text-[#65849B] text-[10px] text-left py-1 pl-2 font-bold hover:text-[#2DA2BB]'>
                全体最適化を実行
            </button>
        ),
    },
    {
        key: '2',
        label: (
            <button className='border-none w-[150px] text-[#65849B] text-[10px] text-left py-1 pl-2 font-bold hover:text-[#2DA2BB]'>
                シフトのみ最適化を実行
            </button>
        ),
    },
    {
        key: '3',
        label: (
            <button className='border-none w-[150px] text-[#65849B] text-[10px] text-left py-1 pl-2 font-bold hover:text-[#2DA2BB]'>
                希望を表示する
            </button>
        ),
    },
    {
        key: '4',
        label: (
            <button className='border-none w-[150px] text-[#65849B] text-[10px] text-left py-1 pl-2 font-bold hover:text-[#2DA2BB]'>
                勤怠実績の表示
            </button>
        ),
    },
    {
        key: '5',
        label: (
            <button className='border-none w-[150px] text-[#65849B] text-[10px] text-left py-1 pl-2 font-bold hover:text-[#2DA2BB]'>
                最適化チェックを実行
            </button>
        ),
    },
    {
        key: '6',
        label: (
            <button className='border-t-2 w-[150px] text-[#65849B] text-[10px] text-left py-1 pl-2 font-bold pt-2 hover:text-[#2DA2BB]'>
                ヘルプの表示
            </button>
        ),
    },
    {
        key: '7',
        label: (
            <button className='border-none w-[150px] text-[#65849B] text-[10px] text-left py-1 pl-2 font-bold hover:text-[#2DA2BB]'>
                シフト表（日別）
            </button>
        ),
    },
    {
        key: '8',
        label: (
            <button className='border-t-2 w-[150px] text-[#65849B] text-[10px] text-left py-1 pl-2 font-bold pt-2 hover:text-[#2DA2BB]' >
                お知らせを表示
            </button>
        ),
    },
];

const Drop: React.FC = () => (
    <Space wrap className='border-l-1 border-[#248296]'>
        <Dropdown menu={{ items }} placement="bottomRight" arrow trigger={['click']} className='h-10 text-[10px] '>
            <button className='flex bg-[#2DA2BB] text-white rounded-none hover:text-white px-8 pt-3 hover:bg-[#3094AB] transition duration-200'>
                <img src="icon/ico_menu.svg" className='w-4 h-4' />
                <span className='pl-2'>その他</span>
            </button>
        </Dropdown>
    </Space>
);

export default Drop;
