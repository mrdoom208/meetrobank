// src/hooks/usePasscodes.ts
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

// Passcode interface matches your MongoDB schema
export interface Passcode {
  _id: string;
  email?: string;
  phone?: string;
  code: string;
}

const API_URL = "/api/passcode"; // backend URL

export default function usePasscodes() {
  const [passcodes, setPasscodes] = useState<Passcode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ---------------- READ: Get all passcodes ----------------
  const fetchPasscodes = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios.get<Passcode[]>(API_URL);
      setPasscodes(res.data);
      setError(null);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- CREATE: Add new passcode ----------------
  const createPasscode = async (
    passcodeData: Omit<Passcode, "_id">,
  ): Promise<Passcode | undefined> => {
    setLoading(true);
    try {
      const res = await axios.post<Passcode>(API_URL, passcodeData);
      setPasscodes((prev) => [...prev, res.data]);
      setError(null);
      return res.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UPDATE: Update a passcode ----------------
  const updatePasscode = async (
    id: string,
    updatedData: Partial<Passcode>,
  ): Promise<Passcode | undefined> => {
    setLoading(true);
    try {
      const res = await axios.put<Passcode>(`${API_URL}/${id}`, updatedData);
      setPasscodes((prev) => prev.map((p) => (p._id === id ? res.data : p)));
      setError(null);
      return res.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE: Remove a passcode ----------------
  const deletePasscode = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPasscodes((prev) => prev.filter((p) => p._id !== id));
      setError(null);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch passcodes on first render

  return {
    passcodes,
    loading,
    error,
    fetchPasscodes,
    createPasscode,
    updatePasscode,
    deletePasscode,
  };
}
