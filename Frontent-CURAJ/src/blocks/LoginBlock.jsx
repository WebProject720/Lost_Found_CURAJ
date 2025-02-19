import { useEffect, useState } from "react";
import {
    Input,
    Button,
    Loader,
} from "../components/utility/Utility";
import { useForm } from "react-hook-form";
import { authAPI } from "../APIs/auth/authAPI.astro";
import { navigate } from "astro:transitions/client";
import { setUserLogin, setUserInfo } from "../store";


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
        if(data.username.includes(' ')){
            setAlertFun(false, 'Space not allowed in username');
            return
        }
        const formData = { identifier: data.username?.trim(), password: data.password?.trim() }
        setLoading(true);
        await authAPI(formData, "/users/login").then((res) => {
            setLoading(false);
            if (res?.status) {
                setAlertFun(true, 'Login Successfull');
                const { data } = (res.data) || {};
                setUserInfo(data.user);
                setUserLogin(true);
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
            <div className={`flex w-full justify-center `}>
                <Button type="submit" disabled={isLoading}>
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