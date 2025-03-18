
interface EditHistory {
    text: string;
    tag: string;
    category: string;
    author: string;
    time: string;
}

interface Note {
    text: string;
    tag: string;
    author: string;
    time: string;
    category: string;
    editHistory: EditHistory[];
}

interface EditHistoryProps {
    note: Note;
    onClose: () => void;
}

const EditHistory = ({ note, onClose }: EditHistoryProps) => {
    const editHistory = note.editHistory || []; 

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50 z-99">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit History</h2>
                {editHistory.length === 0 ? (
                    <p>no edit yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {editHistory.map((history, index) => (
                            <li key={index} className="border-b pb-4">
                                <div><strong>Edited by:</strong> {history.author}</div>
                                <div><strong>Text:</strong> {history.text}</div>
                                <div><strong>Category:</strong> {history.category}</div>
                                <div><strong>Tag:</strong> {history.tag}</div>
                                <div><strong>Time:</strong> {history.time}</div>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    className="mt-4 bg-[#FFB1B4] py-2 px-4 rounded hover:bg-[#f1786d] hover:text-white font-semibold"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default EditHistory;
