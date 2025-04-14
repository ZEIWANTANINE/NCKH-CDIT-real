"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudents, getUsers } from "../../utils/api";
import Pagination from "../../components/Pagniation";
import AdminLayout from "../AdminLayout";
export default function UsersPage() {
  const [sinhVien, setsinhVien] = useState([]);
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

    const fetchStudents = async () => {
      try {
        const data = await getStudents(currentPage);
        console.log("Dữ liệu người dùng:32131", data); // Log dữ liệu trả về từ API
        setsinhVien(data.sinhVien || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Lỗi khi fetch người dùng:", err);
        setError("Không thể tải danh sách người dùng");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [currentPage, router]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Quản lý học sinh</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Mã sinh viên</th>
            <th className="border border-gray-300 px-4 py-2">Họ và Tên</th>
            <th className="border border-gray-300 px-4 py-2">Giới tính</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Ngành học</th>
            <th className="border border-gray-300 px-4 py-2">Niên Khoá</th>
            <th className="border border-gray-300 px-4 py-2">Mã trình độ học vấn</th>
            <th className="border border-gray-300 px-4 py-2">Quyền hạn</th>
          </tr>
        </thead>
        <tbody>
          {sinhVien.map((sinhVien: any) => (
            <tr key={sinhVien.sMaSinhVien}>
              <td className="border border-gray-300 px-4 py-2">{sinhVien.sMaSinhVien}</td>
              <td className="border border-gray-300 px-4 py-2">{sinhVien.sTenSinhVien}</td>
              <td className="border border-gray-300 px-4 py-2">{sinhVien.sGioiTinh}</td>
              <td className="border border-gray-300 px-4 py-2">{sinhVien.sEmail}</td>
              <td className="border border-gray-300 px-4 py-2">{sinhVien.sNganhHoc}</td>
              <td className="border border-gray-300 px-4 py-2">{sinhVien.sNienKhoa}</td>
              <td className="border border-gray-300 px-4 py-2">{sinhVien.sMaTrinhDoHocVan}</td>
              <td className="border border-gray-300 px-4 py-2">{sinhVien.sQuyenHan}</td>
            
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