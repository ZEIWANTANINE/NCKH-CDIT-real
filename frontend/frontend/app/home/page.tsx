"use client";

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
// Removed incorrect import of error

export default function HomePage() {
  const [error, setError] = useState<string | null>(null); // Added state for error

  return (
    <Layout>
      <div className="flex min-h-screen bg-[#bf9b7d]">
        {/* Main content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 ">
            {[
              { label: "Số đề tài đã tham gia", value: "$53,00989", link: "/revenue" },
              { label: "Số bài báo", value: "1", link: "/projects" },
              { label: "Luận Văn hướng dẫn", value: "300 Hrs", link: "/time" },
              { label: "Sự kiện tham gia", value: "120", link: "/resources" },
            ].map((stat) => (
              <Link
                key={stat.label}
                href={stat.link} // Đường dẫn liên kết
                className="bg-white p-6 rounded shadow text-center block hover:bg-gray-100 transition py-16"
              >
                <div className="text-lg font-semibold text-gray-500">{stat.label}</div> {/* Tăng kích thước chữ */}
                <div className="text-2xl font-bold">{stat.value}</div> {/* Tăng kích thước chữ */}
              </Link>
            ))}
          </div>
          
          {/* Project Summary Table */}
          <div className="bg-white p-4 rounded shadow py-8">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Project summary</h2>
              <div className="space-x-2">
                <select className="p-1 border rounded">
                  <option>Project</option>
                </select>
                <select className="p-1 border rounded">
                  <option>Project manager</option>
                </select>
                <select className="p-1 border rounded">
                  <option>Status</option>
                </select>
              </div>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th>Tên đề tài</th>
                  <th>Người chủ trì đề tài</th>
                  <th>Ngày hết hạn </th>
                  <th>Trạng thái</th>
                  <th>Tiến độ</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Nelse web development", "Om prakash sao", "May 25, 2023", "Completed", 100],
                  ["Datascale AI app", "Neilsan mando", "Jun 20, 2023", "Delayed", 35],
                  ["Media channel branding", "Truvelly priya", "Jul 13, 2023", "At risk", 60],
                  ["Coriax iOS app", "Matte hannery", "Dec 20, 2023", "Completed", 100],
                  ["Website builder", "Sukumar rao", "Mar 15, 2024", "On going", 80],
                ].map(([name, manager, due, status, progress]) => (
                  <tr key={name} className="border-b">
                    <td>{name}</td>
                    <td>{manager}</td>
                    <td>{due}</td>
                    <td>{status}</td>
                    <td>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            Number(progress) > 80
                              ? "bg-green-500"
                              : Number(progress) > 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </Layout>
  );
}
