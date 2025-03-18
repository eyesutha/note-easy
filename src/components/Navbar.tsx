import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";

function Navbar() {
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        setUsername(null);
        navigate("/login");
    };

    return (
        <div className="flex justify-between items-center bg-white p-4 border-b border-gray-500/20 mx-8">
            <div className="flex items-center">
                <img src="/images/note2.png" className={`w-10 ${isMobile ? "w-8" : "w-12"} mr-2`} alt="Logo" />
                <span className={`text-lg font-bold ${isMobile ? "text-sm" : "text-xl"}`}>
                    Note Easy
                </span>
            </div>

            <div className="flex items-center">
                {username ? (
                    <>
                        {!isMobile && <img src="/images/user.png" className="w-5 mr-2" alt="User" />}
                        <span className={`mr-4 ${isMobile ? "text-xs" : "text-sm"}`}>{username}</span>                        <img src="/images/logout.png"
                            className="w-6 mr-4 cursor-pointer" alt="Logout"
                            onClick={handleLogout}
                        />
                    </>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-[#7fc8fd] text-white px-3 py-1 rounded-md hover:bg-[#78b5e0] font-semibold"
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
