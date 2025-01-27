import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Input,
    Button,
    Button_Link,
    Line,
    LoaderCircle,
    Loader,
    AlertBox
} from "../components/utility/Utility";
import { useForm } from "react-hook-form";
import { RegisterRequest } from "../APIs/auth/register.astro";
import { navigate } from "astro:transitions/client";


export default function RegisterBlock(props) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            username: '',
            password: '',
            email: ''
        },
    });
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
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
        setError(false);
    }, [watch('username'), watch('password'), watch('enrollment')])


    async function FormSubmit(data) {
        if (!(data.username && data.enrollment && data.password)) {
            setError(true);
            setAlertFun(false, 'All field required');
            return
        }
        const formData = { username: data.username, enrollment: data.enrollment, password: data.password }
        setLoading(true);
        const res = await RegisterRequest(formData).then((res) => {
            console.log(res);
            setLoading(false);
            if (res?.status) {
                setError(true);
                setAlertFun(true, 'Registration Successfull');
                navigate('/auth/verify');
            } else {
                setError(true);
                setAlertFun(false, res.error.message||'Try Again !!');
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
                        className={`${error ? 'border-red-400 bg-red-100' : null}`}
                        {...register('username')}
                        />
                    <Input
                        type="text"
                        label="Enrollment"
                        placeholder="Enrollment"
                        name="enrollment"
                        text="@curaj.ac.in"
                        className={`${error ? 'border-red-400 bg-red-100' : null}`}
                        minLength="4"
                        {...register('enrollment')}
                        />
                    <Input
                        className={`${error ? 'border-red-400 bg-red-100' : null}`}
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="Password"
                        minLength="4"
                        {...register('password')}
                    />
                    <div className="w-full">
                        {
                            !error ? null :
                                alertParams.status ?
                                    <p className="text-green-500 text-center">
                                        {alertParams.Msg}
                                    </p>
                                    :
                                    <p className="text-red-500 text-center">
                                        {alertParams.Msg}
                                    </p>
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
                        <Button_Link className="bg-gray-400 text-black border-0 border-black hover:bg-gray-300">
                            Forget Password
                        </Button_Link>
                    </div>
                </div>
            </div>
        </div>
    );
};