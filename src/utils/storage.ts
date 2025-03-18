

export interface Note {
    text: string;
    tag: string;
    category: string;
    author: string;
    time: string;
} 

export const getSavedNotes = () => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
};

export const saveNotesToLocalStorage = (notes: Note[]) => {
    localStorage.setItem("notes", JSON.stringify(notes));
};
