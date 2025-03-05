import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Device from '../../Device';
import DeviceCategory from '../../DeviceCategory';
import UserM from '../../UserM';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'sub2',
        label: 'Quản lý thiết bị',
        icon: <AppstoreOutlined />,
        children: [
            { key: '1', label: 'Loại thiết bị' },
            { key: '2', label: 'Thiết bị' },

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
            { key: '14', label: 'Quản lý người dùng' },
        ],
    },
];

const DashBoard: React.FC = () => {
    const [content, setContent] = useState<React.ReactNode>();


    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        switch (e.key) {
            case '1':
                setContent(<DeviceCategory />);
                break;
            case '2':
                setContent(<Device />);
                break;
            case '14':
                setContent(<UserM />);
                break;
            default:
                setContent(<h2>Chọn một mục từ menu</h2>);
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
                {content}
            </div>
        </div>

    );
};

export default DashBoard;