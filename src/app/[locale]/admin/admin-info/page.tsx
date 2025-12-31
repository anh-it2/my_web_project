"use client";
import RouteLoading from "@/components/shared/RouteLoading";
import UserInfoComponent from "@/components/UserInfo/UserInfoComponent";
import { useEffect, useState } from "react";

export default function UserInfo() {

  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
   setUserName(localStorage.getItem("userName") || ''); 
  },[])

  if(userName === '') return <RouteLoading />

  return <UserInfoComponent userName={userName} role="admin"/>
}
