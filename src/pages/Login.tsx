import { useState } from "react";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const handleLogin = () => {
        if (!username.trim()) {
            alert("Please enter a username");
            return;
        }
        localStorage.setItem("username", username);
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className={`bg-white p-6 ${isMobile ? "w-80" : "w-90 h-96 "} rounded-lg shadow-md`}>
                <div className="flex justify-center items-center gap-3 mt-5">
                    <img src="/images/note2.png" className="w-10" alt="Logo"/>
                    <h2 className={`text-lg font-bold text-center ${isMobile ? "text-base" : "text-xl"}`}>Login</h2>
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-[#4A4A4A] rounded-md mb-3 mt-3 outline-0 text-[0.8rem]"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-[#4A4A4A] rounded-md mb-4 outline-0 text-[0.8rem]"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-[#7fc8fd] text-white py-2 rounded-md hover:bg-[#78b5e0] mt-3 font-semibold"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;

