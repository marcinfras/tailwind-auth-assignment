import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser({ email: data.email });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      setUser({ email: data.email });
      return data;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrfToken="))
        ?.split("=")[1];

      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      });
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed");
    }
  };

  return { user, isLoading, login, logout };
};
