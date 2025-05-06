import { useState } from "react";
import { ShowAlert } from "../components/alertLogic"; // Assuming you have an alert logic component
import { ReportsAPIs } from "../APIs/reports/reportsAPI";

export const FeedbackForm = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const form = event.target;

        // Get form data
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        // Validate form data
        if (!name || !email || !message) {
            ShowAlert("All fields are required", false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            ShowAlert("Please enter a valid email address", false);
            return;
        }

        setLoading(true); // Set loading state

        try {
            // Send data to the API
            const response = await ReportsAPIs("/feedback/add", {
                name,
                email,
                description:message,
            });

            if (response.success) {
                ShowAlert("Feedback submitted successfully", true);
                form.reset(); // Reset the form
            } else {
                ShowAlert(response.message || "Failed to submit feedback", false);
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            ShowAlert("An error occurred while submitting feedback", false);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <div className="bg-slate-100 py-12 px-6 sm:px-12 md:px-24">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">
                    We Value Your Feedback
                </h2>

                <form
                    className="max-w-4xl mx-auto bg-slate-100 p-8 rounded-2xl shadow-2xl border-b-slate-200 space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="enrollment@curaj.ac.in"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Your Feedback
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Share your thoughts or suggestions here..."
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? "Submitting..." : "Submit Your Feedback"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};