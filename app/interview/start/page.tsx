'use client'
import React from 'react'

export default function InterviewPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    src="/oip.jpeg"
                    alt="AI Interview Banner"
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        AI-Based Interview
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Prepare for your next big opportunity with our
                        AI-powered interview system.
                    </p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-700 font-medium">
                                Job Title:
                            </span>
                            <span className="text-gray-800 font-semibold">
                                Software Engineer
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-700 font-medium">
                                Duration:
                            </span>
                            <span className="text-gray-800 font-semibold">
                                30 Minutes
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-700 font-medium">
                                Number of Questions:
                            </span>
                            <span className="text-gray-800 font-semibold">
                                10
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Interview Instructions:
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>
                                Ensure you have access to a stable internet
                                connection.
                            </li>
                            <li>
                                Grant permission for microphone and video
                                recording.
                            </li>
                            <li>
                                The interview duration is strictly timed and
                                cannot be paused.
                            </li>
                            <li>
                                Closing the browser will end the interview, and
                                it cannot be resumed.
                            </li>
                        </ul>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={() => alert('Starting the interview...')}
                        >
                            Start Interview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
