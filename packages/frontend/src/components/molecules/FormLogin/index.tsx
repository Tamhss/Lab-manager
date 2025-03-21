"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Checkbox, Spin } from "antd";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Khi component mount, kiểm tra xem có thông tin đăng nhập đã lưu không
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberEmail");
        const savedPassword = localStorage.getItem("rememberPassword");
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await fetch("http://localhost:3009/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.message);
            return;
        }

        const token = data.data?.token;
        console.log("Received token:", token);

        if (!token) {
            console.error("Token is missing in API response");
            return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.data?.user));

        // Nếu người dùng chọn "Nhớ thông tin", lưu email và password vào localStorage
        if (rememberMe) {
            localStorage.setItem("rememberEmail", email);
            localStorage.setItem("rememberPassword", password);
        } else {
            localStorage.removeItem("rememberEmail");
            localStorage.removeItem("rememberPassword");
        }

        router.push("/DashBoard");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Đăng nhập</h2>
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email của bạn"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                            Nhớ thông tin đăng nhập
                        </Checkbox>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                    >
                        {loading ? <Spin size="small" /> : "Đăng nhập"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Chưa có tài khoản?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Đăng ký ngay
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
