const API_URL = "http://localhost:4000";

export const registerUser = async (userData: { name: string; email: string; password: string; role: string }) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (res.ok) {
    console.log("Token sau khi đăng ký:", data.token); // Log token mới
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token); // Lưu token vào localStorage
      localStorage.setItem("role", userData.role); // Lưu role vào localStorage
    }
  }

  return data;
};

export const loginUser = async (userData: { email: string; password: string }) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  console.log("Token sau khi đăng nhập:", data.token); // Log token

  if (res.ok) {
    localStorage.setItem("token", data.token); // Lưu token vào localStorage
    localStorage.setItem("role", data.role); // Lưu role vào localStorage
  }

  return data;
};
export const getUsers = async (page: number = 1, limit: number = 10) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (!token) {
    throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
  }

  const res = await fetch(`${API_URL}/user/users?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Gửi token trong header
    },
  });

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách người dùng");
  }

  const data = await res.json();
  return {
    users: data.users || [], // Đảm bảo `users` luôn là một mảng
    totalPages: data.totalPages || 1,
  };
};
export const getTeachers = async (page: number = 1, limit: number = 10) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (!token) {
    throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
  }

  const res = await fetch(`${API_URL}/user/teachers?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Gửi token trong header
    },
  });

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách giảng viên");
  }

  const data = await res.json();
  return {
    teachers: data.teachers || [], // Đảm bảo `users` luôn là một mảng
    totalPages: data.totalPages || 1,
  };
};
export const getResearchers = async (page: number = 1, limit: number = 10) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (!token) {
    throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
  }

  const res = await fetch(`${API_URL}/user/researchers?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Gửi token trong header
    },
  });

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách nhà nghiên cứu");
  }

  const data = await res.json();
  return {
    researcher: data.researcher || [], // Đảm bảo `users` luôn là một mảng
    totalPages: data.totalPages || 1,
  };
};
export const getStudents = async (page: number = 1, limit: number = 10) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (!token) {
    throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
  }

  const res = await fetch(`${API_URL}/user/students?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Gửi token trong header
    },
  });

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách học sinh");
  }

  const data = await res.json();
  return {
    sinhVien: data.sinhVien || [], // Đảm bảo `users` luôn là một mảng
    totalPages: data.totalPages || 1,
  };
};
export const submitUserInfo = async (role: string, formData: any) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  console.log("Token 1",token);
  console.log("Dữ liệu gửi đi:", formData);
  if (!token) {
    throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
  }

  const res = await fetch(`${API_URL}/auth/add-${role.toLowerCase()}-info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Gửi token trong header
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error || "Không thể lưu thông tin. Vui lòng thử lại.");
  }

  return res.json(); // Trả về phản hồi từ server
};

