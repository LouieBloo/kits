import { useUser } from "@/contexts/userContext";
import * as React from "react";

export default function MainLayout({ children }) {

    const { user, logout } = useUser();

    return (
        <div>
            {user.isAuthenticated && (
                <div className="flex justify-end">
                    <h1>Welcome {user.username}!</h1>
                    <button onClick={logout} className="button-normal">Logout</button>
                </div>
            )}

            {children}
        </div>
    )
}
