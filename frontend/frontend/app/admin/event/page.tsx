"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers } from "../../utils/api";
import Pagination from "../../components/Pagniation";
import AdminLayout from "../AdminLayout";
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
      alert("Bạn không có quyền truy cập trang này!");
      router.push("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getUsers(currentPage);
        console.log("Dữ liệu người dùng:32131", data); // Log dữ liệu trả về từ API
        setUsers(data.users || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Lỗi khi fetch người dùng:", err);
        setError("Không thể tải danh sách người dùng");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage, router]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Quản lý sự kiện</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Mã sự kiện</th>
            <th className="border border-gray-300 px-4 py-2">Tên sự kiện</th>
            <th className="border border-gray-300 px-4 py-2">Thời gian</th>
            <th className="border border-gray-300 px-4 py-2">Địa điểm</th>
            <th className="border border-gray-300 px-4 py-2">Nội dung</th>
            <th className="border border-gray-300 px-4 py-2">Tên Diễn Giả</th>
            <th className="border border-gray-300 px-4 py-2">Kinh Phí</th>
            <th className="border border-gray-300 px-4 py-2">Mã loại sự kiện</th>
            <th className="border border-gray-300 px-4 py-2">Tên loại sự kiện</th>
            <th className="border border-gray-300 px-4 py-2">Mã loại tổ chức</th>
            <th className="border border-gray-300 px-4 py-2">Tên loại tổ chức</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.time}</td>
              <td className="border border-gray-300 px-4 py-2">{user.location}</td>
              <td className="border border-gray-300 px-4 py-2">{user.content}</td>
              <td className="border border-gray-300 px-4 py-2">{user.speaker}</td>
              <td className="border border-gray-300 px-4 py-2">{user.cost}</td>
              <td className="border border-gray-300 px-4 py-2">{user.eventTypeId}</td>
              <td className="border border-gray-300 px-4 py-2">{user.eventTypeName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.organizerTypeId}</td>
              <td className="border border-gray-300 px-4 py-2">{user.organizerTypeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </AdminLayout>
  );
}