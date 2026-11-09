import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Get all notes
export const getNotes = async () => {
    const response = await API.get('/notes');
    return response.data;
};
// Update a note
export const updateNote = async (id, noteData) => {
    const response = await API.put(`/notes/${id}`, noteData);
    return response.data;
};
// Create a note
export const createNote = async (noteData) => {
    const response = await API.post('/notes', noteData);
    return response.data;
};
// Delete a note
export const deleteNote = async (id) => {
    const response = await API.delete(`/notes/${id}`);
    return response.data;
};
// Get one note by ID
export const getOnlyOneNote = async (id) => {
    const response = await API.get(`/notes/${id}`);
    return response.data;
};