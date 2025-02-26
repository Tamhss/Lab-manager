import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import ServerDevice from '../../ServerDevice';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub1',
        label: 'Quản lý thiết bị',
        icon: <MailOutlined />,
        children: [
            {
                key: 'g1',
                label: 'Danh mục loại thiết bị',
                type: 'group',
                children: [
                    { key: '1', label: 'Server' },
                    { key: '2', label: 'Màn hình' },
                ],
            },
            {
                key: 'g2',
                label: 'Item 2',
                type: 'group',
                children: [
                    { key: '3', label: 'Option 3' },
                    { key: '4', label: 'Option 4' },
                ],
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Navigation Two',
        icon: <AppstoreOutlined />,
        children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },

        ],
    },
    {
        type: 'divider',
    },
    {
        key: 'sub4',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            { key: '11', label: 'Option 11' },
            { key: '12', label: 'Option 12' },
        ],
    },
    {
        key: 'grp',
        label: 'Group',
        type: 'group',
        children: [
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
        ],
    },
];

const DashBoard: React.FC = () => {
    const [selectServer, setSelectServer] = useState<React.ReactNode>(null)

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        if (e.key === '1') {
            setSelectServer(<ServerDevice />);
        } else {
            setSelectServer(null);
        }
    };
    return (
        <div style={{ display: 'flex' }}>
            <Menu
                onClick={onClick}
                style={{ width: 256, height: '100vh' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />

            <div style={{ flex: 1, padding: '20px', width: '1000px' }}>
                {selectServer || <h2>Chọn một mục từ menu</h2>}
            </div>
        </div>

    );
};

export default DashBoard;