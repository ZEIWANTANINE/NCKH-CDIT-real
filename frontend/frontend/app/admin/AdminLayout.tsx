import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </header>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-6">
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/admin/user"
                    className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                  >
                    Quản lý người dùng
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/teacher"
                    className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                  >
                    Quản lý giáo viên
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/researcher"
                    className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                  >
                    Quản lý nhà nghiên cứu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/student"
                    className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                  >
                    Quản lý sinh viên
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/event"
                    className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                  >
                    Quản lý chương trình liên kết
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/document"
                    className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                  >
                    Quản lý tài liệu khoa học
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/topic"
                    className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                  >
                    Quản lý đề tài
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/councilmember"
                    className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                  >
                    Quản lý thành viên hội đồng
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/council"
                    className="block text-m font-semibold text-center hover:bg-gray-700 py-3 rounded-lg"
                  >
                    Quản lý hội đồng khoa học
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4">
        <p>© 2025 Admin Dashboard</p>
      </footer>
    </div>
  );
}