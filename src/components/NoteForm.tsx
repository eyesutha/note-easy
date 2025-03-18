import { useState } from "react";
import NoteMenu from "./NoteMenu";
import EditHistory from "./EditHistory";

interface Note {
    text: string;
    tag: string;
    category: string;
    author: string;
    time: string;
    editHistory: EditHistory[];
}

interface NoteFormProps {
    note: Note;
    index: number;
    onDelete: () => void;
    onEdit: () => void;
}
const categoryColors: { [key: string]: string } = {
    "General": "#9fcff1",
    "Work": "#c5a6f0",
    "Personal": "#91d3c7",
    "Important": "#f8bb8f",
    "Urgent": "#f79b9e",
    "Reminder": "#f1d831",
};

const bgColors: string[] = [
    "#d4edff", "#fbd8ec", "#ebddfe", "#faeea9",
    "#d2f3ed", "#F8DAC4", "#f8c2c3"
];


function NoteForm({ note, index, onDelete, onEdit }: NoteFormProps) {
    const [showHistory, setShowHistory] = useState(false);
    const bgColor = bgColors[index % bgColors.length];

    const handleShowHistory = () => {
        setShowHistory(true);
    };

    const handleCloseHistory = () => {
        setShowHistory(false);
    };
    const categoryColor = categoryColors[note.category] || "transparent";


    return (
        <div className="flex flex-col w-full text-[#4A4A4A]">


            <div
                className="bg-[#FFD0ED] h-[20rem] w-[22rem] rounded-2xl relative shadow-md"
                style={{ backgroundColor: bgColor }}
            >
                <NoteMenu
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onShowHistory={handleShowHistory}
                />
                <div className="m-5 flex flex-col justify-between">
                    {note.category && (
                        <div
                            className="text-sm text-white font-semibold w-fit px-2 py-1 rounded-md mb-2 shadow-md"
                            style={{ backgroundColor: categoryColor }}
                        >
                            {note.category}
                        </div>
                    )}

                    <span className="ml-2">{note.text}</span>
                    <div className="flex justify-end absolute bottom-4 right-4 gap-2 w-full text-[0.8rem]">
                        <span>✏️ {note.author},</span>
                        <span>{note.time}</span>
                    </div>
                </div>
            </div>


            <div className="flex mt-2">
                {note.tag && (
                    <div className="bg-[#4A4A4A] w-fit h-[1.8rem] mx-2 rounded-md flex items-center gap-3 mb-6">
                        <span className="text-white m-2">#{note.tag}</span>
                    </div>
                )}

            </div>

            {showHistory && (
                <EditHistory
                    note={note}
                    onClose={handleCloseHistory}
                />
            )}

        </div>
    );
}

export default NoteForm;
