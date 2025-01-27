"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai"; // npm install @google/generative-ai
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faCog, faCopy, faCommentDots, faBars } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

    // ________________________________________________________________
    const [userPrompt, setUserPrompt] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [commandHistory, setCommandHistory] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // ________________________________________________________________

    // ======================================================================================

    const handleSearch = async () => {
        if (userPrompt.trim() === '') return;

        setLoading(true);
        setApiResponse('');
        setCommandHistory([...commandHistory, userPrompt]);

        try {
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
            const genAI = new GoogleGenerativeAI(apiKey);

            const model = genAI.getGenerativeModel({
                model: "gemini-2.0-flash-exp",
            });

            const generationConfig = {
                temperature: 1,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain",
            };

            const chatSession = model.startChat({ generationConfig, history: [] });

            const result = await chatSession.sendMessage(userPrompt);
            const responseText = await result.response.text();

            setApiResponse(responseText);
        } catch (error) {
            console.error('Error fetching API:', error);
            setApiResponse('Sorry, there was an error with the API.');
        } finally {
            setLoading(false);
        }
    };

    // ======================================================================================

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(apiResponse).then(() => {
            toast.success('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    // ======================================================================================

    const handlePromptClick = (command) => {
        setUserPrompt(command);
        handleSearch();
    };

    // ======================================================================================

    return (
        <div className="flex h-screen bg-gray-900">

            <button
                className="absolute top-20 right-2 text-white md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <FontAwesomeIcon icon={faBars} size="xl" />
            </button>

            <div className={`w-64 bg-purple-800 text-white p-4 fixed md:relative z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <ul>
                    <li className="mb-4 hover:bg-purple-600 p-2 rounded flex items-center">
                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                        <Link href="/dashboard" className="text-lg">Home</Link>
                    </li>
                    <li className="mb-4 hover:bg-purple-600 p-2 rounded flex items-center">
                        <FontAwesomeIcon icon={faCog} className="mr-2" />
                        <Link href="/dashboard" className="text-lg">Settings</Link>
                    </li>
                    <div className="mt-4 border-t border-gray-500 pt-2">
                        <h3 className="text-lg font-bold mb-2">Recent Chats</h3>
                        <ul className="ml-2">
                            {commandHistory.map((command, index) => (
                                <li key={index}
                                    className="mb-2 text-sm bg-gray-700 p-2 rounded flex items-center cursor-pointer hover:bg-gray-600"
                                    onClick={() => handlePromptClick(command)}
                                >
                                    <FontAwesomeIcon icon={faCommentDots} className="mr-2 text-purple-400" />
                                    {command}
                                </li>
                            ))}
                        </ul>
                    </div>
                </ul>
            </div>

            

            <div className="flex-1 p-6 overflow-auto">
                <div className="bg-gray-800 mt-6 md:mt-0 p-6 rounded-lg shadow-lg text-white">
                    <h2 className="text-2xl font-bold mb-4">Chat with me</h2>

                    <input
                        type="text"
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        className="w-full p-3 border rounded-lg shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-700 text-white"
                        placeholder="Type your prompt here..."
                    />

                    <button
                        onClick={handleSearch}
                        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                        {loading ? 'Loading...' : 'Search'}
                    </button>

                    <div className="relative mt-4">
                        <textarea
                            className="w-full h-64 p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-700 text-white"
                            value={loading ? 'Generating response, please wait...' : apiResponse}
                            readOnly
                            placeholder="Response ..."
                        ></textarea>
                        <button
                            onClick={handleCopyToClipboard}
                            className="absolute top-4 right-4 bg-purple-600 p-2 rounded-lg text-white hover:bg-purple-500"
                        >
                            <FontAwesomeIcon icon={faCopy} />
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
