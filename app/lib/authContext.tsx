"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";

type AdminUser = {
  role: "admin";
  uid: string;
  email: string;
};

type StudentUser = {
  role: "student";
  id: string;
  name: string;
  studentId: string;
  department: string;
  memberType: string;
};

export type AuthUser = AdminUser | StudentUser | null;

interface AuthContextType {
  user: AuthUser;
  loading: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  studentLogin: (studentId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined"
      ? localStorage.getItem("studentSession")
      : null;

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Firebase Auth admin session
        if (typeof window !== "undefined") {
          localStorage.removeItem("studentSession");
        }
        setUser({ role: "admin", uid: firebaseUser.uid, email: firebaseUser.email! });
      } else if (stored) {
        // Student session from localStorage
        try {
          setUser(JSON.parse(stored));
        } catch {
          if (typeof window !== "undefined") localStorage.removeItem("studentSession");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function adminLogin(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will update user state
  }

  async function studentLogin(studentId: string, password: string) {
    const q = query(collection(db, "students"), where("studentId", "==", studentId));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      throw new Error("Student ID not found. Please contact the librarian.");
    }
    const docSnap = snapshot.docs[0];
    const data = docSnap.data();
    
    // Verify password
    if (data.password !== password) {
      throw new Error("Incorrect password. Please try again.");
    }

    const studentUser: StudentUser = {
      role: "student",
      id: docSnap.id,
      name: data.name,
      studentId: data.studentId,
      department: data.department || "",
      memberType: data.type || "Student",
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("studentSession", JSON.stringify(studentUser));
    }
    setUser(studentUser);
  }

  async function logout() {
    if (user?.role === "admin") {
      await signOut(auth);
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem("studentSession");
      }
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, adminLogin, studentLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
