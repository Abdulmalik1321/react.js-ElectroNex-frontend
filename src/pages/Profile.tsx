import { useContext } from "react";

import { shopContext } from "../Router";
import { NavBar } from "@/components/NavBar";

export function Profile() {
  const { state } = useContext(shopContext);

  return (
    <div>
      <NavBar />
      <div className="mt-12">
        <p>id: {state.userInfo.id}</p>
        <p>firstName: {state.userInfo.firstName}</p>
        <p>lastName :{state.userInfo.lastName}</p>
        <p>email: {state.userInfo.email}</p>
        <p>phone: {state.userInfo.phone}</p>
        <p>role: {state.userInfo.role == 0 ? "Customer" : "Admin"}</p>
      </div>
    </div>
  );
}
