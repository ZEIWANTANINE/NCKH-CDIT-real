"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTeachers, getUsers } from "../../utils/api";
import Pagination from "../../components/Pagniation";
import AdminLayout from "../AdminLayout";
export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
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

    const fetchTeachers = async () => {
      try {
        const data = await getTeachers(currentPage);
        console.log("Dữ liệu người dùng:32131", data); // Log dữ liệu trả về từ API
        setTeachers(data.teachers || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Lỗi khi fetch người dùng:", err);
        setError("Không thể tải danh sách người dùng");
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, [currentPage, router]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Quản lý giáo viên</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">STT</th>
            <th className="border border-gray-300 px-4 py-2">Họ và tên</th>
            <th className="border border-gray-300 px-4 py-2">Chức vụ</th>
            <th className="border border-gray-300 px-4 py-2">Đơn vị</th>
            <th className="border border-gray-300 px-4 py-2">Giới Tính</th>
            <th className="border border-gray-300 px-4 py-2">Khoa</th>
            <th className="border border-gray-300 px-4 py-2">Trình Độ Học Vấn</th>
            <th className="border border-gray-300 px-4 py-2">Quyền Hạn</th>
            
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher: any) => (
            <tr key={teacher.id}>
              <td className="border border-gray-300 px-4 py-2">{teacher.id}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.sTenGiangVien}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.sChucVu}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.sDonVi}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.sGioiTinh}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.sKhoa}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.sMaTrinhDoHocVan}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.sQuyenHan}</td>
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