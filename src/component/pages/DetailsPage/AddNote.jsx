import axios from 'axios';
import { MessageCircleCode, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const AddNote = ({ today, user, foodItemId, hasUserAddedNote }) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`https://food-expiry-server-lime.vercel.app/get-notes/${foodItemId}`);

                if (response && response.data) {
                    setNotes(response.data);
                } else {
                    console.warn('Empty or invalid response:', response);
                    setNotes([]);
                }
            } catch (error) {
                console.error('Error fetching notes:', error);
                setNotes([]);
            }
        };

        if (foodItemId) {
            fetchNotes();
        }
    }, [foodItemId]);

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        
        if (!newNote.trim()) {
            setError('Please enter a note');
            return;
        }

        if (!user) {
            setError('Please login to add a note');
            return;
        }

        if (!hasUserAddedNote) {
            setError('You can not add note');
            return;
        }

        setIsSubmitting(true);
        setError('');

        const note = {
            text: newNote.trim(),
            email: user?.email,
            date: today,
            author: user?.displayName,
            foodItemId: foodItemId,
            createdAt: new Date().toISOString()
        };

        try {
            const response = await axios.post('https://food-expiry-server-lime.vercel.app/create-note', note, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

          
            if (response.status === 200 ) { 
                setNotes([note, ...notes]);
                setNewNote('');
                setError('');
            } else {
                setError('Failed to save note. Please try again.');
            }
        } catch (error) {
            console.error('Error adding note:', error);
            setError('Error adding note');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTextareaChange = (e) => {
        setNewNote(e.target.value);
        if (error) setError(''); 
    };

    return (
        <div>
            <div className="bg-slate-300 p-3 md:p-10  my-2 md:my-10">
                <div className="bg-gray-200 rounded-md p-3 md:p-10">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-7">
                        {/* Note section */}
                        <div className="flex flex-col gap-3 w-full md:w-2/4">
                            <div className="flex flex-row gap-2 items-center p-2 md:p-5">
                                <MessageCircleCode className="h-6 w-6 text-blue-500" />
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Notes</h2>
                            </div>
                            <div className="w-full bg-white p-2 md:p-5 rounded-xl">
                                <h2 className="text-sm md:text-xl font-semibold text-gray-800 md:p-3">Add a note</h2>
                                <form onSubmit={handleNoteSubmit}>
                                    <div className="bg-gray-100 md:p-5 rounded-2xl">
                                        <textarea
                                            name="note"
                                            value={newNote}
                                            onChange={handleTextareaChange}
                                            className="w-full h-32 border border-gray-300 rounded-md md:p-3 text-gray-600 resize-none"
                                            placeholder="Write your note here..."
                                            disabled={!user || !hasUserAddedNote}
                                        />
                                        
                                        {error && (
                                            <div className="text-red-500 text-sm mt-2 px-3">
                                                {error}
                                            </div>
                                        )}

                                        <div className="flex flex-col md:flex-row justify-between items-center md:mt-3">
                                            <p className="text-gray-600 p-3">Posted Date: {today}</p>
                                            <button
                                                type="submit"
                                                disabled={!user || !hasUserAddedNote || isSubmitting || !newNote.trim()}
                                                className={`btn flex flex-row items-center gap-2 border rounded-3xl px-4 py-2 transition-colors ${
                                                    !user || !hasUserAddedNote || isSubmitting || !newNote.trim()
                                                        ? 'text-gray-400 bg-gray-200 border-gray-300 cursor-not-allowed'
                                                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                <Plus className="h-5 w-5" />
                                                <span>
                                                    {isSubmitting ? 'Adding...' : 'Add a Note'}
                                                </span>
                                            </button>
                                        </div>

                                        {(!user || !hasUserAddedNote) && (
                                            <div className="text-yellow-600 text-sm mt-2 px-3">
                                                ⚠️ {!user ? 'Please login to add notes.' : 'You can not add note.'}
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Note list Section */}
                        <div className="flex flex-col gap-3 w-full md:w-2/4">
                            <h2 className="text-[16px] md:text-2xl text-center font-semibold text-gray-800">Listed Notes</h2>
                            <div className="bg-white p-2 md:p-5 rounded-xl max-h-96 overflow-y-auto">
                                {notes.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No notes yet. Be the first to add one!</p>
                                ) : (
                                    <div className="space-y-4">
                                        {notes.map((note, index) => (
                                            <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                                                 <p className='text-sm md:text-[18px] font-semibold text-gary-900'>{note.author}</p>
                                                <p className="text-gray-800 mb-2 p-2">{note.text}</p>
                                                <div className="flex items-center">
                                                   
                                                    <span className='text-sm text-red-700'>Posted date: {note.date}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNote;