'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd"; // Optional: nếu bạn dùng Ant Design

const RoleRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === "ADMIN") {
        router.replace("/DashBoard");
        return;
      }
    }
    setIsAllowed(true);
    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return <>{isAllowed && children}</>;
};

export default RoleRedirect;
