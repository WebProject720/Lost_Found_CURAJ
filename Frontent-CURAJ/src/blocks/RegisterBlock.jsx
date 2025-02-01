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


export default function RegisterBlock(props) {
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            username: '',
            password: '',
            email: '',
            repassword: ''
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
    }, [watch('username'), watch('password'), watch('enrollment'), watch('repassword')])


    async function FormSubmit(data) {
        if (!(data.username && data.enrollment && data.password && data.repassword)) {
            setAlertFun(false, 'All field required');
            return
        }
        if (data.password != data.repassword) {
            setAlertFun(false, 'Password not same');
            return
        }
        const formData = { username: data.username, enrollment: data.enrollment, password: data.password }
        setLoading(true);
        await authAPI(formData, "/users/register").then((res) => {
            setLoading(false);
            if (res?.status) {
                setAlertFun(true, 'Registration Successfull');
                sessionStorage.setItem('UserID', data.enrollment);
                navigate('/auth/verify');
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
                        <center> Registration </center>
                    </h1>
                </div>
                <Line />
                <form
                    className="flex flex-col gap-5"
                    id="RegistrationForm"
                    onSubmit={handleSubmit(FormSubmit)}
                >
                    <Input
                        type="text"
                        label="Username"
                        placeholder="Username"
                        name="username"
                        minLength="4"
                        className={`${alertParams.Msg ? !alertParams.status ? 'border-red-400 bg-red-100' : 'border-green-500 bg-green-200' : null}`}
                        {...register('username')}
                    />
                    <Input
                        type="text"
                        label="Enrollment"
                        placeholder="Enrollment"
                        name="enrollment"
                        text="@curaj.ac.in"
                        minLength="4"
                        {...register('enrollment')}
                        className={`${alertParams.Msg ? !alertParams.status ? 'border-red-400 bg-red-100' : 'border-green-500 bg-green-200' : null}`}
                    />
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        minLength='4'
                        placeholder="Password"
                        {...register('password')}
                        className={`${alertParams.Msg ? !alertParams.status ? 'border-red-400 bg-red-100' : 'border-green-500 bg-green-200' : null}`}
                    />
                    <Input
                        className={`${alertParams.Msg ? !alertParams.status ? 'border-red-400 bg-red-100' : 'border-green-500 bg-green-200' : null}`}
                        type="password"
                        label="Confirm Password"
                        name="repassword"
                        minLength='4'
                        placeholder="Confirm Password"
                        {...register('repassword')}
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