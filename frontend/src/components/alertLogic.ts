export const hideAlert = () => {
    document &&
        document?.getElementById("alert-box") &&
        document?.getElementById("alert-box")?.classList?.add("hidden");
};


export const ShowAlert = (msg: string, status: Boolean) => {
    if (!msg && !status) return;

    const alertBox = document.getElementById("alert-box");
    const errorBox = document.getElementById("error-alert");
    const successBox = document.getElementById("success-alert");


    const error = document.getElementById("error-msg");
    const success = document.getElementById("success-msg");

    if (!alertBox && (!error || !success)) return;

    if (!status) {
        //if error occured
        error ? error.innerText = msg : null;
        successBox?.classList.add('!hidden');
        errorBox?.classList.remove('!hidden');
        errorBox?.classList.add('!flex');
    } else {
        //if success case
        success ? (success.innerText = msg) : null;
        errorBox?.classList.add('!hidden');
        successBox?.classList.remove('!hidden');
        successBox?.classList.add('!flex');
    }


    if (alertBox?.classList.contains("hidden"))
        alertBox.classList.remove("hidden");
    else
        alertBox?.classList.add("hidden");
};

export const confirmBox = async (msg: string): Promise<boolean> => {
    const confirmBox = document.getElementById('confirm-box');
    const accept = document.getElementById('confirm-yes-btn');
    const cancel = document.getElementById('confirm-no-btn');

    if (!confirmBox || !accept || !cancel) {
        console.error("Confirm box or buttons not found in the DOM.");
        return false;
    }

    // Set the message
    const para = document.getElementById("confirm-msg");
    if (para) para.innerText = msg;

    // Show the confirm box
    confirmBox.classList.remove('hidden'); // Remove the hidden class
    confirmBox.classList.add('flex'); // Add the flex class to make it visible

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
            accept.removeEventListener('click', handleAccept);
            cancel.removeEventListener('click', handleCancel);
            confirmBox.classList.add('hidden'); // Hide the confirm box
            confirmBox.classList.remove('flex'); // Remove the flex class
        };

        accept.addEventListener('click', handleAccept);
        cancel.addEventListener('click', handleCancel);
    });
};
