import { useState } from "react";
import { UserPostAPI } from "../APIs/users/usersAPI";
import { ShowAlert } from "../components/alertLogic";
import { Button } from "../components/utility/Button";
import { Input } from "../components/utility/Input";
import { Loader } from "../components/utility/Loader";
import { navigate } from "astro/virtual-modules/transitions-router.js";

const ResetPasswordComponent = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOtp = async () => {
        if (!email) {
            ShowAlert("Email is required", false);
            return;
        }

        setLoading(true);
        try {
            const response = await UserPostAPI(
                "/forgetpassword",
                { identifier: email, checkUser: true },
            );
            console.log(response);

            if (response.success) {
                ShowAlert("OTP sent successfully. Please check your email.", true);
                setOtpSent(true);
            } else {
                ShowAlert(response.message || "Failed to send OTP.", false);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            ShowAlert("An error occurred while sending OTP.", false);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!otp || !newPassword) {
            ShowAlert("OTP and new password are required", false);
            return;
        }

        if (newPassword.length < 6) {
            ShowAlert("Password must be at least 6 characters long", false);
            return;
        }

        setLoading(true);
        try {
            const response = await UserPostAPI(
                "/forgetpassword",
                { identifier: email, OTP: otp, password: newPassword, checkUser: false },
            );
            console.log(response);

            if (response.success) {
                ShowAlert("Password reset successfully.", true);
                setOtp("");
                setNewPassword("");
                setOtpSent(false);
                navigate("/auth");
            } else {
                ShowAlert(response.message || "Failed to reset password.", false);
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            ShowAlert("An error occurred while resetting the password.", false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 justify-center w-full  ">
            <Input
                label="Email "
                placeholder="E-Mail or Enrollment Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpSent || loading}
                BoxClassName="w-full"
            />
            {otpSent && (
                <>
                    <Input
                        label="OTP"
                        placeholder="Enter the OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        disabled={loading}
                        BoxClassName="w-full"
                    />
                    <Input
                        label="New Password"
                        placeholder="Enter new password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={loading}
                        BoxClassName="w-full"
                    />
                </>
            )}
            <Button
                onClick={otpSent ? handleResetPassword : handleSendOtp}
                disabled={loading}
                className="mt-4 w-full"
            >
                {loading ? <Loader /> : otpSent ? "Reset Password" : "Send OTP"}
            </Button>
        </div>
    );
};

export default ResetPasswordComponent;