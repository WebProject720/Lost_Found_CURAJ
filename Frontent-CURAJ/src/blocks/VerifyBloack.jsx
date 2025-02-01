import React, { useEffect, useState } from "react";
import {
    Input,
    Button,
    Button_Link,
    Line,
    Loader,
} from "../components/utility/Utility";
import { useForm } from "react-hook-form";
import { navigate } from "astro:transitions/client";
import { authAPI } from "../APIs/auth/authAPI.astro";


export default function VerifyBloack(props) {
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            otp: ''
        },
    });
    const [isLoading, setLoading] = useState(false);
    const [alertParams, setAlertParam] = useState({
        status: false,
        Msg: "",
    });



    const setAlertFun = (type = false, Msg = "Something wrong !!") => {
        setAlertParam({
            status: type,
            Msg: Msg,
        });
    };


    useEffect(() => {
        setAlertFun(false,'');
    }, [watch('otp')])


    async function FormSubmit(data) {
        if (!(data.otp)) {
            setAlertFun(false, 'Enter OTP');
            return
        }
        const userID = sessionStorage.getItem('UserID');
        const formData = { OTP: data.otp, email: userID }
        setLoading(true);
        await authAPI(formData, "/users/verify").then((res) => {
            setLoading(false);
            if (res?.status) {
                setAlertFun(true, 'User Verified');
                navigate('/dashboard');
            } else {
                setAlertFun(false, res.error.message || 'Try Again !!');
            }
        })
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-nowrap gap-5 flex-col">
                <div className="py-3">
                    <h1 className="text-black font-bold text-2xl">
                        <center> Verification </center>
                    </h1>
                </div>
                <Line />
                <form
                    className="flex flex-col gap-5"
                    id="RegistrationForm"
                    onSubmit={handleSubmit(FormSubmit)}
                >
                    <Input
                        min="1000"
                        max="9999"
                        label="OTP"
                        type="number"
                        placeholder="4 Digit OTP"
                        className={`${alertParams.Msg ? !alertParams.status ? 'border-red-400 bg-red-100' : 'border-green-500 bg-green-200' : null}`}
                        {...register('otp')}
                        required
                    />
                    <div className="w-full">
                        {
                            alertParams.Msg ? alertParams.status ?
                                <p className="text-green-500 text-center">
                                    {alertParams.Msg}
                                </p>
                                :
                                <p className="text-red-500 text-center">
                                    {alertParams.Msg}
                                </p>
                                :
                                null
                        }
                    </div>
                    <div className={`flex w-full justify-center ${isLoading ? 'disabled' : ''}`}>
                        <Button type="submit">
                            {
                                isLoading ?
                                    <Loader></Loader>
                                    :
                                    "Submit"
                            }
                        </Button>
                    </div>
                </form>
                <Line />
                <div className="w-full flex items-center justify-center">
                    <div className="flex flex-row gap-5 flex-wrap justify-evenly w-full">
                        <Button_Link to="/auth" className="bg-green-500 hover:bg-green-300">
                            Login
                        </Button_Link>
                        <Button_Link to="/auth/reset-password" className="bg-gray-400 text-black border-0 border-black hover:bg-gray-300">
                            Forget Password
                        </Button_Link>
                    </div>
                </div>
            </div>
        </div>
    );
};