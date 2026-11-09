
import React, { useState, useEffect } from 'react';

import {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} from './services/noteService';

function App() {

    // Store notes retrieved from MongoDB
    const [notes, setNotes] = useState([]);

    // Store form data
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Track the note currently being edited
    const [editId, setEditId] = useState(null);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch all notes when component loads
    useEffect(() => {
        fetchNotes();
    }, []);

    // GET: Fetch all notes
    const fetchNotes = async () => {
        try {
            setLoading(true);
            setError('');

            const data = await getNotes();

            setNotes(data.notes);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to fetch notes'
            );
        } finally {
            setLoading(false);
        }
    };

    // POST: Create a new note
    // PUT: Update an existing note
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Please enter a note title');
            return;
        }

        const noteData = {
            title,
            content
        };

        try {
            if (editId) {

                await updateNote(editId, {
                    ...noteData,
                    color: '#ffffff',
                    pinned: false,
                    archived: false
                });

                alert('Note updated successfully');

            } else {

                await createNote(noteData);

                alert('Note created successfully');
            }

            // Clear form
            setTitle('');
            setContent('');
            setEditId(null);

            // Refresh notes
            fetchNotes();

        } catch (err) {
            alert(
                err.response?.data?.message ||
                'Something went wrong'
            );
        }
    };

    // Load note details into form for editing
    const handleEdit = (note) => {
        setEditId(note._id);
        setTitle(note.title);
        setContent(note.content);
    };

    // DELETE: Delete a note
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this note?'
        );

        if (!confirmDelete) return;

        try {
            await deleteNote(id);

            alert('Note deleted successfully');

            fetchNotes();

        } catch (err) {
            alert(
                err.response?.data?.message ||
                'Failed to delete note'
            );
        }
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditId(null);
        setTitle('');
        setContent('');
    };

    return (
        <div style={styles.container}>

            <h1 style={styles.heading}>My NotePad</h1>

            <p style={styles.subtitle}>
                Your personal space for thoughts and ideas.
            </p>

            {/* Note creation and editing form */}
            <form onSubmit={handleSubmit} style={styles.form}>

                <h2>
                    {editId ? 'Edit Note' : 'Create a New Note'}
                </h2>

                <input
                    type="text"
                    placeholder="Enter note title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                />

                <textarea
                    placeholder="Write your note here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={styles.textarea}
                />

                <button type="submit" style={styles.submitButton}>
                    {editId ? 'Update Note' : 'Add Note'}
                </button>

                {editId && (
                    <button
                        type="button"
                        onClick={cancelEdit}
                        style={styles.cancelButton}
                    >
                        Cancel
                    </button>
                )}

            </form>

            {/* Notes section */}
            <div style={styles.notesSection}>

                <div style={styles.notesHeader}>
                    <h2>Your Notes</h2>

                    <button
                        onClick={fetchNotes}
                        style={styles.refreshButton}
                    >
                        Refresh
                    </button>
                </div>

                {loading && <p>Loading notes...</p>}

                {error && <p style={styles.error}>{error}</p>}

                {!loading && !error && notes.length === 0 && (
                    <p>No notes found. Create your first note!</p>
                )}

                {/* Display all notes */}
                <div style={styles.notesGrid}>

                    {notes.map((note) => (

                        <div key={note._id} style={styles.noteCard}>

                            <h3>{note.title}</h3>

                            <p>{note.content}</p>

                            <div style={styles.actions}>

                                <button
                                    onClick={() => handleEdit(note)}
                                    style={styles.editButton}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(note._id)}
                                    style={styles.deleteButton}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

// Basic styling
const styles = {

    container: {
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },

    heading: {
        textAlign: 'center',
        color: '#333'
    },

    subtitle: {
        textAlign: 'center',
        color: '#777'
    },

    form: {
        maxWidth: '600px',
        margin: '30px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px'
    },

    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '12px',
        boxSizing: 'border-box'
    },

    textarea: {
        width: '100%',
        height: '120px',
        padding: '12px',
        marginBottom: '12px',
        boxSizing: 'border-box',
        resize: 'vertical'
    },

    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },

    cancelButton: {
        padding: '10px 20px',
        marginLeft: '10px',
        cursor: 'pointer'
    },

    notesSection: {
        marginTop: '40px'
    },

    notesHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    refreshButton: {
        padding: '8px 15px',
        cursor: 'pointer'
    },

    notesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
    },

    noteCard: {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: '#fff',
        overflowWrap: 'anywhere'
    },

    actions: {
        display: 'flex',
        gap: '10px',
        marginTop: '15px'
    },

    editButton: {
        padding: '8px 15px',
        backgroundColor: '#16a34a',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
    },

    deleteButton: {
        padding: '8px 15px',
        backgroundColor: '#dc2626',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
    },

    error: {
        color: 'red'
    }
};

export default App;
