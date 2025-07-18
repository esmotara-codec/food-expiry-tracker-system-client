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
                const response = await axios.get(`https://food-expiry-server-lime.vercel.app/get-notes/${foodItemId}`)

                if (response && response.data) {
                    setNotes(response.data);
                } else {
                    console.warn('Empty or invalid response:', response);
                    setNotes([]);
                }

                } catch (error) {
                    console.error('Error fetching notes:', error);

                }
                finally{
                    setIsSubmitting(false);
                }

            }

        if (foodItemId) {
                fetchNotes();

            }

        }, [foodItemId]);

    const handleNoteSubmit = async (e) => {
        if (!newNote) return;
        e.preventDefault();

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
            text: newNote,
            email: user?.email,
            date: today,
            author: user?.displayName,
            foodItemId: foodItemId,
            createdAt: new Date().toISOString()

        };

        try {
            const response = await axios.post('https://food-expiry-server-lime.vercel.app/add-note', note,
                {
                    headers:
                    {
                        'Content-Type': 'application/json'

                    }
                });
            setNotes([note, ...notes]);
            setNewNote('');


        } catch (error) {
            console.error('Error adding note:', error);
            setError('Error adding note');

        }

    };


    return (
        <div>

            <div className="bg-slate-300-500 p-10 mx-auto my-10 ">
                <div className="bg-gray-200 rounded-md  p-10 ">
                    <div className="flex flex-row gap-7 ">
                        {/* Note section */}
                        <div className="flex flex-col gap-3 w-2/4">
                            <div className="flex flex-row gap-2 items-center p-5">
                                <MessageCircleCode className="h-6 w-6 text-blue-500" />
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 ">Notes</h2>
                            </div>
                            <div className="w-full bg-white p-5 rounded-xl ">
                                <h2 className="text-sm md:text-xl font-semibold text-gray-800 p-3">Add a note</h2>
                                <div className="bg-gray-100 p-5 rounded-2xl">
                                    <textarea
                                        name="note"
                                        className="w-full h-32 border border-gray-300 rounded-md p-3 text-gray-600"
                                        placeholder="Write your note here..."
                                    />

                                    <div className="flex flex-row justify-between items-center">
                                        <p className="text-gray-600 p-3 ">Posted Date: {today}</p>
                                        <button
                                            type='submit'
                                            onClick={handleNoteSubmit}
                                            className="btn flex flex-row items-center gap-2 text-gray-500 border bg-white border-gray-300 rounded-3xl ">
                                            <Plus className="h-5 w-5" /> <span>Add a Note</span>
                                        </button>

                                    </div>


                                </div>

                            </div>

                        </div>
                        {/* Note list Section  */}
                        <div className="flex flex-col gap-3 w-2/4">
                            <h2 className="text-xl md:text-2xl text-center font-semibold text-gray-800 ">Listed Notes</h2>

                        </div>



                    </div>
                </div>


            </div>



        </div>
    );
};

export default AddNote;