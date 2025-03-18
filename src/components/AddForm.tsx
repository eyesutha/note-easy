interface AddFormProps {
    isEditingForm: boolean;
    noteText: string;
    noteTag: string;
    noteCategory: string;
    setNoteText: (text: string) => void;
    setNoteTag: (tag: string) => void;
    setNoteCategory: (category: string) => void;
    onSave: () => void;
    onCancel: () => void;
}


function AddForm({ isEditingForm, noteText, noteTag, noteCategory, setNoteText, setNoteTag, setNoteCategory, onSave, onCancel }: AddFormProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">
                {isEditingForm ? "Edit Note" : "Add a Note"}
            </h2>
            <div className="flex gap-4">
                <img src="/images/pencil.png" className="w-8 h-8 mt-2" />
                <textarea
                    className="w-full p-2 border rounded-md"
                    placeholder="Write your note..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
            </div>

            <div className="flex gap-4">
                <img src="/images/hastag.png" className="w-8 h-8 mt-3" />
                <input
                    className="w-full p-2 border rounded-md mt-2"
                    placeholder="Add a tag..."
                    value={noteTag}
                    onChange={(e) => setNoteTag(e.target.value)}
                />
            </div>
            <select
                value={noteCategory}
                onChange={(e) => setNoteCategory(e.target.value)}
                className="w-full p-2 border rounded-md mt-4"
            >
                <option value="General">General</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent</option>
                <option value="Reminder">Reminder</option>
            </select>
            <div className="flex justify-between mt-6">
                <button
                    className="bg-[#FFB1B4] px-4 py-2 rounded-md font-semibold hover:bg-[#f1786d] hover:text-white"
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="bg-[#C9E4DF] px-4 py-2 rounded-md font-semibold hover:bg-[#84b6ae] hover:text-white"
                    onClick={onSave}
                >
                    {isEditingForm ? "Save Changes" : "Save"}
                </button>
            </div>
        </div>
    )
}

export default AddForm
