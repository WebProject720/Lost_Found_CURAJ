import React, { useEffect, useState } from "react";
import {
    Input,
    Button,
    Button_Link,
    Line,
    Loader,
} from "../components/utility/Utility";
import { useForm } from "react-hook-form";
import { RegisterRequest } from "../APIs/auth/register.astro";
import { navigate } from "astro:transitions/client";

export default function LoginBlock(props) {
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            username: '',
            password: '',
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
        setAlertFun(false, '');
    }, [watch('username'), watch('password')])


    async function FormSubmit(data) {
        if (!(data.username && data.password)) {
            setAlertFun(false, 'All field required');
            return
        }

        const formData = { identifier: data.username, password: data.password }
        setLoading(true);
        await RegisterRequest(formData, "/users/login").then((res) => {
            setLoading(false);
            if (res?.status) {
                setAlertFun(true, 'Login Successfull');
                navigate('/dashboard');
            } else {
                setAlertFun(false, res.error.message || 'Try Again !!');
            }
        })
    }
    return (
        <form className="flex flex-col gap-5"
            id="RegistrationForm"
            onSubmit={handleSubmit(FormSubmit)}>
            <Input
                type="text"
                label="Username"
                placeholder="Username"
                name="username"
                minLength="4"
                className={`${alertParams.Msg ? !alertParams.status ? 'border-red-400 bg-red-100' : 'border-green-500 bg-green-200' : null}`}
                {...register('username')} />
            <Input
                className={`${alertParams.Msg ? !alertParams.status ? 'border-red-400 bg-red-100' : 'border-green-500 bg-green-200' : null}`}
                type="password"
                label="Password"
                name="password"
                minLength='4'
                placeholder="Password"
                {...register('password')}
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
    );
};