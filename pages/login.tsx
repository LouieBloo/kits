import * as React from "react";
import Panel from "@/components/ui/panel/panel";
import { useState } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/router";

export default function LoginPage() {

    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const { login } = useUser();
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(login(userName)){
            router.push('/conversions');
        }
    }

    return (
        <div className="container">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Login
            </h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" className="text-input-normal" placeholder="Your name" onChange={(e) => setUserName(e.target.value)} required={true} />

                <label>Password</label>
                <input type="text" id="password" name="password" className="text-input-normal" placeholder="Anything will work!" onChange={(e) => setPassword(e.target.value)} required={true} />

                <div className="flex justify-end">
                    <button type="submit" className="button-normal mt-4">Login</button>
                </div>
            </form>
        </div>
    )
}
