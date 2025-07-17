import { MessageCircleCode, Plus } from 'lucide-react';
import React, { useState } from 'react';

const AddNote = ({ today, user }) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    const handleNoteSubmit = (e) => {
        if (!newNote) return;
        e.preventDefault();

        const note = {
            text: newNote,
            email: user?.email,
            date: today,
            author: user?.displayName
        };

        setNotes([note, ...notes]);
        setNewNote('');

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