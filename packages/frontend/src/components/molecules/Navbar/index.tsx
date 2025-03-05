'use client';

import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/button';
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
} from '@nextui-org/navbar';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setUser(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/');
    };

    return (
        <NextUINavbar className="bg-gradient-to-r from-orange-400 to-rose-400 px-6 w-screen">
            <NavbarContent>
                <NavbarBrand as="li" className="justify-start gap-3">
                    <span className="text-white font-bold text-lg">LAB-DNU</span>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden lg:flex basis-full justify-center">
                <ul className="flex space-x-8">
                    <NavbarItem className="flex">
                        <NextLink href="/" className="text-white font-semibold hover:opacity-80">HOME</NextLink>
                    </NavbarItem>
                    {user && (
                        <>
                            <NavbarItem>
                                <NextLink href="/DashBoard" className="text-white font-semibold hover:opacity-80">DASHBOARD</NextLink>
                            </NavbarItem>
                            <NavbarItem>
                                <NextLink href="#" className="text-white font-semibold hover:opacity-80">ĐĂNG KÝ THIẾT BỊ</NextLink>
                            </NavbarItem>
                        </>
                    )}
                </ul>
            </NavbarContent>

            <NavbarContent justify="end" className="hidden lg:flex space-x-3 text-right">
                {user ? (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="bg-transparent text-white font-semibold bg-slate-600">
                                {user}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem key="profile" className="text-black">Profile</DropdownItem>
                            <DropdownItem key="settings" className="text-black">Settings</DropdownItem>
                            <DropdownItem key="logout" onClick={handleLogout} className="text-black">Logout</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <Button onPress={() => router.push('/login')}>Login</Button>
                )}
            </NavbarContent>
        </NextUINavbar>
    );
};
