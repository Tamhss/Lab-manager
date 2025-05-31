// packages/frontend/pages/404.tsx

import Link from "next/link";

export default function Custom500() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-9xl font-extrabold text-red-600">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mt-6 text-gray-700">
        Oops! Trang bạn tìm không tồn tại.
      </p>
      <p className="mt-2 text-gray-500">
        Có thể bạn đã nhập sai URL hoặc trang này đã bị xóa.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
