export const hideAlert = () => {
    document &&
        document?.getElementById("alert-box") &&
        document?.getElementById("alert-box")?.classList?.add("hidden");
};


export const ShowAlert = (msg: string, status: Boolean) => {
    if (!msg && !status) return;

    console.log(msg, status);


    const alertBox = document.getElementById("alert-box");
    const errorBox = document.getElementById("error-alert");
    const successBox = document.getElementById("success-alert");


    const error = document.getElementById("error-msg");
    const success = document.getElementById("success-msg");

    if (!alertBox && (!error || !success)) return;

    if (!status) {
        error ? error.innerText = msg : null;
        errorBox?.classList.add('!flex');
    } else {
        success ? (success.innerText = msg) : null;
        successBox?.classList.add('!flex');
    }


    if (alertBox?.classList.contains("hidden"))
        alertBox.classList.remove("hidden");
    else
        alertBox?.classList.add("hidden");
};

export const confirmBox =async (msg: string) => {
    const confirmBox = document.getElementById('confirm-box');
    const accept = document.getElementById('confirm-yes-btn');
    const cancel = document.getElementById('confirm-no-btn');

    if (!confirmBox && !accept && !cancel)
        return;

    const para = document.getElementById("confirm-msg");
    if (para) para.innerText = msg;

    confirmBox?.classList.add('!flex');

    return new Promise<boolean>((resolve) => {
        const handleAccept = () => {
            resolve(true);
            cleanup();
        };

        const handleCancel = () => {
            resolve(false);
            cleanup();
        };

        const cleanup = () => {
            accept?.removeEventListener('click', handleAccept);
            cancel?.removeEventListener('click', handleCancel);
            confirmBox?.classList.remove('!flex');
        };

        accept?.addEventListener('click', handleAccept);
        cancel?.addEventListener('click', handleCancel);
    });

}