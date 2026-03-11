// src/hooks/useUsers.ts
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

// User interface
export interface User {
  _id: string;
  username: string;
  password: string;
}

const API_URL = "/api/users"; // backend URL

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ---------------- READ: Get all users ----------------
  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios.get<User[]>(API_URL);
      setUsers(res.data);
      setError(null);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- CREATE: Add new user ----------------
  const createUser = async (
    userData: Omit<User, "_id">,
  ): Promise<User | undefined> => {
    setLoading(true);
    try {
      const res = await axios.post<User>(API_URL, userData);
      setUsers((prev) => [...prev, res.data]);
      setError(null);
      return res.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UPDATE: Update a user ----------------
  const updateUser = async (
    id: string,
    updatedData: Partial<User>,
  ): Promise<User | undefined> => {
    setLoading(true);
    try {
      const res = await axios.put<User>(`${API_URL}/${id}`, updatedData);
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? res.data : user)),
      );
      setError(null);
      return res.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE: Remove a user ----------------
  const deleteUser = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      setError(null);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on first render
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}
