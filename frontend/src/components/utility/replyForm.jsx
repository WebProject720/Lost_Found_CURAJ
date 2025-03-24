import { useState } from "react";

export default function Replyform() {
    const [replyOpen, setReplyOpen] = useState(false);

    return (
        <div className="w-full">
            {/* Reply Button */}
            <button
                className="text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:underline"
                onClick={() => setReplyOpen(true)}
            >
                <img src="https://cdn-icons-png.flaticon.com/512/481/481675.png" alt="Reply" className="w-6 h-5" />
                Reply
            </button>

            {/* Reply Form */}
            {replyOpen && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg bg-gray-100 p-5 shadow-lg rounded-lg">
                    {/* Close Button */}
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">Submit Your Reply</h3>
                        <button className="text-gray-600 hover:text-red-500 text-xl font-bold" onClick={() => setReplyOpen(false)}>×</button>
                    </div>

                    <textarea 
                        placeholder="Write your response..." 
                        className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows="3"
                    ></textarea>

                    <div className="mt-3 flex justify-end">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Submit Reply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
