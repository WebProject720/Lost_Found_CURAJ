'use client'
import { useEffect, useState } from "react";
import { Images } from "../constants.astro";
import { getComplain } from "../store";
import { Button } from "./utility/Button";
import { ReportsAPIs } from "../APIs/reports/reportsAPI";
import { Loader } from "./utility/Loader";
import { ShowAlert } from "./alertLogic";
import { Button_Link } from "./utility/Btn_link";


export const DetailedComplain = ({ ...props }) => {
    const [complain, setCompain] = useState(null);
    const [reply, setReply] = useState(false);
    const [sendingReply, setReplying] = useState(false);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState('');
    const [statusText, setStatus] = useState('Send');
    const [notFound, SetNotFound] = useState(false);

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get("id");
        setId(id);
        const res = getComplain(id);
        (async () => {
            if (!res) {
                const complaint = await ReportsAPIs('/get', { id });
                if (complaint.data && complaint.success) {
                    setCompain(complaint.data)
                } else {
                    SetNotFound(true);
                }
            } else {
                setCompain(res);
            }
            setLoading(false);
        })();
    }, []);


    const sendReply = async () => {
        if (!replyText) {
            ShowAlert("Reply must not empty",false);
            return;
        }
        setReplying(true);
        setStatus('Loading');
        const response = await ReportsAPIs('/reply', { reply: replyText, cid: id })
        if (response.success) {
            setStatus("Reply Send")
            ShowAlert("Reply Send !!", true);
        } else {
            setStatus(response.message || 'Try Again');
            ShowAlert(response.message || 'Try Again', false);
            setReplying(false);
        }
        setTimeout(() => {
            setReply(false);
            setStatus('Send');
        }, 4000);
    }


    if (loading) {
        return (
            <div className={`w-full  h-60 justify-center items-center flex`}>
                <Loader></Loader>
            </div>
        )
    }

    if (notFound) {
        ShowAlert("Complaint not found", false);
        return (
            <div className={`w-full  h-80 justify-center items-center flex`}>
                <h1 className="text-gray-400 font-extrabold text-5xl">
                    <center>
                        Complaint Not found
                    </center>
                </h1>
            </div>
        )
    }
    return (
        (complain && !loading) &&
        <div className={`p-1 relative h-screen `}>
            <div
                className={`bg-white  z-10 w-full overflow-auto flex justify-center mt-10 ${reply ? 'opacity-45 ' : null}`}
            >
                <div className="bg-white p-5 rounded-lg max-w-5xl w-full shadow-lg">
                    <h1
                        className="text-2xl flex items-center justify-center text-center p-2 w-full font-bold mb-4"
                    >
                        <center> Complaint Details </center>
                    </h1>

                    <div className="flex items-center justify-center gap-4 border-y py-2 my-4">
                        <div className="size-auto">
                            <img
                                src={Images.userIcon}
                                alt="User"
                                className={`w-12 rounded-full border-[1px] border-blue-500 `}
                            />
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {complain.userDetails.username}
                                </h2>
                                <p className="text-sm">
                                    {complain.userDetails.email}
                                </p>

                            </div>
                            <p className="text-xs text-gray-500">
                                {new Date(complain.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{complain.title}</h3>
                    <p className="text-gray-700 indent-5">{complain.description}</p>
                    {
                        complain.images.length > 0 ?
                            <div className="py-4 flex justify-center flex-wrap">
                                {complain.images.map((value, key) => (
                                    <img
                                        key={key}
                                        src={value}
                                        alt="complain Image"
                                        className="w-72 h-auto rounded-lg shadow-md"
                                    />
                                ))}
                            </div>
                            : null
                    }
            <hr  className="my-5"/>
                    <div className="mt-6 flex justify-between items-center text-xl">
                        {/* <a
                            onClick={() => window.history.back()}
                            className="text-black  px-4 py-2 rounded-lg hover:underline hover:cursor-pointer"
                        >
                            ← Back to complains
                        </a> */}
                        <Button onClick={() => window.history.back()}>
                        ← Back to complains
                        </Button>
                        {complain.isOpen ? <Button
                            id="replyBtn"
                            className="text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:underline !bg-green-500"
                            onClick={() => setReply(true)}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/481/481675.png"
                                alt="Reply"
                                className="w-6 h-5"
                            />
                            Reply
                        </Button> : ''}
                    </div>
                </div>
            </div>

            <div
                id="replyForm"
                className={`fixed z-20 inset-0  w-full ${reply ? 'flex' : 'hidden'} justify-center items-center  bg-opacity-50 transition-all duration-500 `}
            >
                <div className="bg-gray-100 p-5 shadow-lg rounded-lg w-full max-w-4xl">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">Submit Your Reply</h3>
                        <button
                            id="closeBtn"
                            className="text-gray-500 hover:text-gray-800 text-4xl"
                        ></button
                        >
                    </div>
                    <textarea
                        placeholder="Write your response..."
                        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows="6"
                        onChange={(e) => setReplyText(e.target.value)}
                    >
                    </textarea>
                    <div className="flex gap-2 w-full items-end justify-end">

                        <div className="mt-3 flex justify-end">
                            <Button onClick={() => setReply((pre) => !pre)} id="">Cancel</Button>
                        </div>
                        <div className="mt-3 flex justify-end">
                            <Button disabled={sendingReply} onClick={sendReply} id="SubmitBtn">
                                {
                                    sendingReply ?
                                        <Loader></Loader>
                                        :
                                        <span>
                                            {statusText}
                                        </span>
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}