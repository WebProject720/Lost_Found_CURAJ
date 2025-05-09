import { useState } from "react";
import { Images } from "../../constants.astro";
import { Input } from "./Input";
import { Button } from "./Button";
import { Loader } from "./Loader";
import { UserAPI } from "../../APIs/users/usersAPI";
import { ShowAlert } from "../alertLogic";
import { AdminPostAPIs } from "../../APIs/admin/adminAPIs";

export const ChangePassword = ({ isAdmin = false, isList = false, identifier = false }) => {
    // State variables
    const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility
    const [loading, setLoading] = useState(false); // Loading state for API calls
    const [newPassword, setNewPassword] = useState(""); // New password input

    const savePassword = async (e) => {
        e.preventDefault(); // Prevent form submission reload

        // Validate password input
        if (!newPassword) {
            ShowAlert("Password cannot be empty", false);
            return;
        }

        if (newPassword.length < 6) {
            ShowAlert("Password must be at least 6 characters long", false);
            return;
        }

        setLoading(true); // Set loading state
        try {
            // Determine API call based on user/admin context
            if (!isAdmin && !identifier) {
                // User changing their own password
                await UserAPI({ NewPassword: newPassword }, "/users/changepassword");
            } else if (isAdmin && !identifier) {
                // Admin changing their own password
                await AdminPostAPIs("/changepassword", { NewPassword: newPassword });
            } else if (isAdmin && identifier) {
                // Admin changing another user's password

                await AdminPostAPIs("/users/changepassword", { NewPassword: newPassword, identifier });
            }

            // Success feedback
            ShowAlert("Password Changed Successfully", true);
            setPasswordVisible(false); // Hide password input
            setNewPassword(""); // Clear the input field
        } catch (error) {
            console.error("Error changing password:", error);
            // ShowAlert("Failed to change password. Please try again.", false);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="flex w-full flex-col bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
            {!isList && <p className="text-sm text-gray-500">Change Password</p>}
            <div>
                <div className="flex flex-row flex-wrap gap-2 justify-between items-center">
                    {/* Hidden password placeholder */}
                    <p className={`${passwordVisible ? "hidden" : "block"}`}>
                        <span className="tracking-widest">************</span>
                    </p>

                    {/* Password change form */}
                    <form
                        className={`${passwordVisible ? "flex" : "hidden"} gap-2 py-1`}
                        onSubmit={savePassword}
                    >
                        <Input
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            disabled={loading}
                            type="password"
                            value={newPassword}
                        />
                        <Button disabled={loading} type="submit">
                            {loading ? <Loader /> : "Save"}
                        </Button>
                    </form>

                    {/* Edit button */}
                    <div>
                        <button
                            onClick={() => setPasswordVisible((prev) => !prev)}
                            type="button"
                        >
                            <img
                                className="w-6 h-6"
                                src={Images.editIcon.src}
                                alt="Edit Icon"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};