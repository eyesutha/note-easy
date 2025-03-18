import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Navbar"
import NoteItem from "../components/NoteItem"
import { Link, useNavigate } from "react-router";


function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });


    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) {
            setUsername(storedUser);
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        localStorage.setItem("username", username);
        setUsername(username);
        setIsLoggedIn(true);
        navigate("/");
    };

    return (
        <div className="mt-9 text-[#4A4A4A] h-screen ">
            <Navbar />
            {!isLoggedIn ? (
                <div className={`container mx-auto px-4  mt-20 ${isMobile ? "px-6" : "px-16"}`}>
                    <h2 className={`text-lg mb-4 ${isMobile ? "text-base" : "text-xl"}`}>
                        Please Login to Start Writing Notes
                    </h2>
                    <Link to={"/login"} >
                        <button
                            onClick={() => handleLogin()}
                            className={`bg-[#4A4A4A] text-white py-2 ${isMobile ? "px-3 text-sm" : "px-6 text-base"} rounded-md`}
                        >
                            Get Start
                        </button>
                    </Link>
                </div>
            ) : (
                <NoteItem />
            )
            }
        </div>
    )
}

export default Home
