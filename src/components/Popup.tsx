
import axios from 'axios';
import React, { useState } from 'react'

interface PopupProps {
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Popup: React.FC<PopupProps> = ({ trigger, setTrigger }) => {
    const [modalState, setModalState] = useState<'upload' | 'caption'>('upload');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [caption, setCaption] = useState<string>('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setModalState('caption');
        }
    };

    const handleClose = () => {
        setModalState('upload');
        setSelectedImage(null);
        setCaption('');
        setTrigger(false);
    };

    const handleSubmit = async () => {
        //error message if user doesn't write a comment
        console.log('Selected Image:', selectedImage);
        console.log('Caption:', caption);
        setModalState('upload');
        setTrigger(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setSelectedImage(file);
            setModalState('caption');
        }
    };

    return ((trigger) ?
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-80 inset-0 flex items-center justify-center ${trigger ? 'z-50' : 'hidden'}`}>
            <div className='relative items-center p-8 w-2/5 h-1/2 bg-white rounded-lg'>
                <div className="p-4 border-b rounded-t text-center items-center dark:border-gray-600">
                    <button onClick={handleClose} type="button" className="absolute border-transparent hover:border-transparent focus:ring-0  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg  text-sm  top-4 right-4 items-center ml-auto text-center">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-6 space-y-6 flex flex-col justify-between items-center ">
                    {/* <p className='text-base leading-relaxed text-black'>Drag photos and videos here</p> */}

                    {modalState === 'upload' ? (
                        <>
                            <svg color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="77" role="img" viewBox="0 0 97.6 77.3" width="96">
                                <title>Icon to represent media such as images or videos</title>
                                <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
                                <path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
                                <path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                            </svg>
                            <p className='text-base leading-relaxed text-black'>Drag photos and videos here</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image-upload"
                            />
                            <label htmlFor="image-upload"
                                className="bg-blue-500 rounded-lg w-92 h-10 text-center text-white hover:bg-blue-600 focus:ring-0 focus:outline-none 
                        focus:ring-blue-300 text-sm px-5 py-2.5 text-center">
                                Select from computer
                            </label>
                        </>
                    ) : (
                        <>
                            <img
                                src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
                                alt="Selected"
                                className="w-32 h-32"
                            />
                            <input
                                type="text"
                                placeholder="Write a caption"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            <button
                                onClick={handleSubmit}
                                className='bg-blue-500 rounded-lg w-92 h-10 text-center text-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2.5 text-center'
                            >
                                Share
                            </button>
                        </>
                    )}
                </div>
                {/* <button className='bg-blue-500 rounded-lg w-92 h-10 text-center text-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2.5 text-center'>Select from computer</button> */}

            </div>

        </div> : "")
}

