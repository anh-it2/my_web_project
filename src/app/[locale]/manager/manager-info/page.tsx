"use client";
import UserInfoComponent from "@/components/UserInfo/UserInfoComponent";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const role = localStorage.getItem("role");
    if (name && role) {
      setUserName(name);
      setRole(role);
    }
  }, []);
  return <UserInfoComponent userName={userName} role={role} />;
}
