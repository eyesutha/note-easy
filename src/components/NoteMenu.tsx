import { useEffect, useRef, useState } from "react";

interface NoteMenuProps {
    onDelete: () => void;
    onEdit: () => void;
    onShowHistory: () => void;
}

const NoteMenu = ({ onDelete, onEdit, onShowHistory }: NoteMenuProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowMenu((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-end mt-4">
            <button className="mx-2 hover:bg-[#b0b0b0] w-8 rounded-md font-bold"
                onClick={toggleMenu}
            >
                ...
            </button>
            {showMenu && (
                <div ref={menuRef} className="absolute right-2 bg-white shadow-md rounded-md w-25">
                    <div className="flex items-center px-3 border-b border-[#4A4A4A]/12  rounded-t-md hover:bg-[#C9E4DF]">
                        <img src="/images/edit.png" className="w-5 h-5" />
                        <button
                            onClick={() => { onEdit(); setShowMenu(false); }}
                            className="block w-full px-2 py-3 text-sm text-[#4A4A4A]"
                        >
                            Edit
                        </button>
                    </div>

                    <div className="flex items-center px-3 border-b border-[#4A4A4A]/12 hover:bg-[#fff7b1]">
                        <img src="/images/history.png" className="w-5 h-5" />
                        <button
                            onClick={() => { onShowHistory(); setShowMenu(false); }}
                            className="block w-full px-2 py-3 text-sm text-[#4A4A4A]"
                        >
                            Edit History
                        </button>
                    </div>

                    <div className="flex items-center px-3 hover:bg-[#FFB1B4] rounded-b-md ">
                        <img src="/images/delete.png" className="w-6 h-6" />
                        <button
                            onClick={() => { onDelete(); setShowMenu(false); }}
                            className="block w-full px-2 py-3 text-sm text-[#f45b60] "
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteMenu;
