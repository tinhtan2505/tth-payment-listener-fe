// utils/auth.ts
export const login = async (username: string, password: string) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token); // Lưu token vào localStorage
    return data;
  } else {
    throw new Error("Đăng nhập thất bại");
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return !!token; // Trả về true nếu token tồn tại
  }
  return false;
};
