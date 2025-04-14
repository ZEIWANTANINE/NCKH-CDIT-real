"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getUsers } from "../utils/api";
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUsers();
        const firstUser = userInfo.users?.[0]; // Assuming you want the first user
        if (firstUser) {
          setUser({ email: firstUser.email, role: firstUser.role }); // Map to expected structure
        } else {
          setUser(null); // Handle case where no user is found
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Header */}
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="max-w-10xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">CDIT</h1>

        {/* Search */}
        <div className="flex items-center flex-1 mx-6 max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* User + Notification */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="relative hover:text-orange-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {/* Badge notification (optional) */}
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
          </button>

          {/* User Info */}
          <div className="relative group">
            <div className="flex items-center cursor-pointer space-x-2">
              <img
                src="/avatar.png" // Thay bằng ảnh user thực tế
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">Nguyễn Văn A</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Thông tin cá nhân</a>
              <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Cài đặt</a>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Đăng xuất</button>
            </div>
          </div>
        </div>
      </div>
    </header>


      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-6">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/home"
                  className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                >
                  Chương trình liên kết
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                >
                  Bài báo
                </Link>
              </li>
              <li>
                <Link
                  href="/documents"
                  className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                >
                  Tài liệu nghiên cứu
                </Link>
              </li>
              <li>
                <Link
                  href="/conferences"
                  className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                >
                  Hội nghị hội thảo
                </Link>
              </li>
              <li>
                <Link
                  href="/councils"
                  className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                >
                  Hội đồng khoa học
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                >
                  Hướng dẫn khoa học
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow mx-auto px-4 py-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Hệ Thống Nghiên Cứu Khoa Học. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}