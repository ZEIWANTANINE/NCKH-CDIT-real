"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getResearchers, getUsers } from "../../utils/api";
import Pagination from "../../components/Pagniation";
import AdminLayout from "../AdminLayout";
export default function ResearchersPage() {
  const [researcher, setResearchers] = useState([]);
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

    const fetchResearchers = async () => {
      try {
        const data = await getResearchers(currentPage);
        console.log("Dữ liệu người dùng:32131", data); // Log dữ liệu trả về từ API
        setResearchers(data.researcher || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Lỗi khi fetch người dùng:", err);
        setError("Không thể tải danh sách người dùng");
      } finally {
        setLoading(false);
      }
    };
    fetchResearchers();
  }, [currentPage, router]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Quản lý nhà nghiên cứu</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">STT</th>
            <th className="border border-gray-300 px-4 py-2">Họ và tên</th>
            <th className="border border-gray-300 px-4 py-2">Chức vụ</th>
            <th className="border border-gray-300 px-4 py-2">Đơn vị</th>
            <th className="border border-gray-300 px-4 py-2">Giới Tính</th>
            <th className="border border-gray-300 px-4 py-2">Quyền Hạn</th>
            <th className="border border-gray-300 px-4 py-2">Trình Độ Học Vấn</th>
            
          </tr>
        </thead>
        <tbody>
          {researcher.map((researcher: any) => (
            <tr key={researcher.id}>
              <td className="border border-gray-300 px-4 py-2">{researcher.id}</td>
              <td className="border border-gray-300 px-4 py-2">{researcher.TenNhaNghienCuu}</td>
              <td className="border border-gray-300 px-4 py-2">{researcher.sChucVu}</td>
              <td className="border border-gray-300 px-4 py-2">{researcher.sDonViCongTac}</td>
              <td className="border border-gray-300 px-4 py-2">{researcher.sGioiTinh}</td>
              <td className="border border-gray-300 px-4 py-2">{researcher.sQuyenHan}</td>
              <td className="border border-gray-300 px-4 py-2">{researcher.sMaTrinhDoHocVan}</td>
              
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