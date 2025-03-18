import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Pagination from "./Pagination";
import NoteForm from "./NoteForm";
import AddForm from "./AddForm";

interface EditHistory {
    text: string;
    tag: string;
    category: string;
    author: string;
    date: string;
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

function NoteItem() {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [isEditingForm, setIsEditingForm] = useState<boolean>(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [noteText, setNoteText] = useState<string>("");
    const [noteTag, setNoteTag] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [noteCategory, setNoteCategory] = useState<string>("General");
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
    const notesPerPage = 8;
    const [username, setUsername] = useState<string>("");

    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setUsername(savedUsername);
        }
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
        setCurrentPage(1)
    }, [selectedCategory, sortOrder]);

    const handleSave = () => {
        if (!noteText.trim()) return;

        const newEditHistory: EditHistory = {
            text: noteText,
            tag: noteTag,
            category: noteCategory,
            author: username,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleString(),
        };

        let updatedNotes = [...notes];
        if (editingIndex !== null) {
            updatedNotes[editingIndex].editHistory.push(newEditHistory);
            updatedNotes[editingIndex] = {
                ...updatedNotes[editingIndex],
                text: noteText,
                tag: noteTag,
                category: noteCategory,
                time: new Date().toLocaleString(),
            };
        } else {
            updatedNotes = [
                {
                    text: noteText,
                    tag: noteTag,
                    author: username,
                    time: new Date().toLocaleString(),
                    category: noteCategory,
                    editHistory: [newEditHistory],
                },
                ...notes,
            ];
        }

        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));

        setNoteText("");
        setNoteTag("");
        setNoteCategory("General");
        setShowForm(false);
        setEditingIndex(null);
        setIsEditingForm(false);
    };


    const handleDelete = useCallback((index: number) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }, [notes]);

    const handleEdit = useCallback((index: number) => {
        const noteToEdit = notes[index];
        setNoteText(noteToEdit.text);
        setNoteTag(noteToEdit.tag);
        setNoteCategory(noteToEdit.category);
        setEditingIndex(index);
        setIsEditingForm(true);
        setShowForm(true);
    }, [notes]);


    const handleCategoryFilter = (note: Note) => {
        return selectedCategory === "All" || note.category === selectedCategory;
    };

    const filteredNotes = notes.filter(handleCategoryFilter);

    const sortedNotes = [...filteredNotes].sort((a, b) => {
        const timeA = new Date(a.time).getTime();
        const timeB = new Date(b.time).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote);
    const totalPages = Math.ceil(notes.length / notesPerPage);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex flex-col h-screen ">
            <div className="mt-8 flex justify-end items-center mx-8">

                {/* Filter by Category */}
                <div className="mr-4 ">
                    <select
                        id="categoryFilter"
                        value={selectedCategory}
                        onChange={(e) => {
                            console.log("Category Changed: ", e.target.value);
                            setSelectedCategory(e.target.value)
                        }
                        }
                        className="p-2 border rounded-md outline-0 w-16 cursor-pointer text-sm"
                    >
                        <option value="All">All</option>
                        <option value="General">General</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Important">Important</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Reminder">Reminder</option>
                    </select>
                </div>

                {/* Sort Order */}
                <select
                    value={sortOrder}
                    onChange={(e) => {
                        console.log("Sort Order Changed: ", e.target.value);
                        setSortOrder(e.target.value as 'desc' | 'asc')
                    }}
                    onBlur={(e) => {
                        console.log("Sort Order Blurred: ", e.target.value);
                        setSortOrder(e.target.value as 'desc' | 'asc');
                    }}
                    className="p-2 border rounded-md outline-0 cursor-pointer text-sm"
                >
                    <option value="desc">Newest</option>
                    <option value="asc">Oldest</option>
                </select>
            </div>

            {/* Notes List */}
            {currentNotes.length === 0 ? (
                <p className="text-gray-500 mt-20 text-lg flex justify-center">No notes yet.</p>
            ) : (
                <div className={`grid ${isMobile ? "grid-cols-1 mx-10" : "grid-cols-2 md:grid-cols-2 xl:grid-cols-4 mx-14"} gap-4 mt-6`}>
                    {currentNotes.map((note, index) => {
                        return (
                            <NoteForm
                                key={index}
                                index={index}
                                note={note}
                                onDelete={() => handleDelete(indexOfFirstNote + index)}
                                onEdit={() => handleEdit(indexOfFirstNote + index)}
                            />
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {sortedNotes.length > notesPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                />
            )}

            {/* Add Note Button */}
            <div className="flex justify-end mt-auto">
                <button
                    className="bg-[#4A4A4A] h-[5rem] w-[5rem] rounded-full flex items-center justify-center mt-auto mb-6 hover:bg-[#868686 transition-all mx-10"
                    onClick={() => {
                        setNoteText("");
                        setNoteTag("");
                        setNoteCategory("General");
                        setEditingIndex(null);
                        setIsEditingForm(false);
                        setShowForm(true);
                    }}
                >
                    <span className="text-white text-[3rem]">+</span>
                </button>
            </div>

            {/* Add Note Form Popup */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500/20">
                    <AddForm
                        isEditingForm={isEditingForm}
                        noteText={noteText}
                        noteTag={noteTag}
                        noteCategory={noteCategory}
                        setNoteText={setNoteText}
                        setNoteTag={setNoteTag}
                        setNoteCategory={setNoteCategory}
                        onSave={handleSave}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}

        </div>
    );
}

export default NoteItem;
