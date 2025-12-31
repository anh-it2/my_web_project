"use client";
import UserInfoComponent from "@/components/UserInfo/UserInfoComponent";
import { useEffect, useState } from "react";

export default function UserInfo() {

  const [userName, setUserName] = useState<string>('')
  const [role, setRole] = useState<string>('')

  useEffect(() => {
    const userName = localStorage.getItem("userName")
    if (userName) {
      setUserName(userName)
    }
    const role = localStorage.getItem("role")
    if (role) {
      setRole(role)
    }
  },[])
  
  return <UserInfoComponent userName={userName} role={role}/>;
}
