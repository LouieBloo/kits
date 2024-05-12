import { useUser } from "@/contexts/userContext";
import * as React from "react";

export default function MainLayout({ children }) {

    const { user, logout } = useUser();

    return (
        <div className="pt-2">
            {user.token && (
                <div className="flex justify-end items-center">
                    <h3 className="font-semibold text-lg mr-3">Welcome {user.username}!</h3>
                    <button onClick={logout} className="button-normal">Logout</button>
                </div>
            )}

            {children}
        </div>
    )
}
