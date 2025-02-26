'use client';

import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
} from '@nextui-org/navbar';
import clsx from 'clsx';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/login');
    };

    return (
        <NextUINavbar
            className="bg-gradient-to-r from-orange-400 to-rose-400 px-6 w-screen"
        >
            <NavbarContent >
                <NavbarBrand as="li" className=" justify-start gap-3">
                    <span className="text-white font-bold text-lg">LAB-DNU</span>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden lg:flex basis-full justify-center">
                <ul className="flex space-x-8">
                    <NavbarItem>
                        <NextLink href="." className="text-white font-semibold hover:opacity-80">HOME</NextLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NextLink href="/DashBoard" className="text-white font-semibold hover:opacity-80">DASHBOARD</NextLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NextLink href="#" className="text-white font-semibold hover:opacity-80">ĐĂNG KÝ THIẾT BỊ</NextLink>
                    </NavbarItem>
                </ul>
            </NavbarContent>

            <NavbarContent justify="end" className="hidden lg:flex space-x-3">
                <Button onPress={handleLogin}>Login</Button>
            </NavbarContent>
        </NextUINavbar>
    );
};
