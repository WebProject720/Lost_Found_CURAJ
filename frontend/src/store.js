import { navigate } from "astro:transitions/client";

const APP_NAME = "AppStore";

const defaultUser = {
    isUserLogged: false,
    loggedUser: null,
    reports: [],
    stats: false,
    isAdmin: false,
    cookieCheckedAt: null
};

// Function to safely get stored data from localStorage (client-side only)
const getStoreData = () => {
    if (typeof window !== "undefined") {
        const data = window.localStorage.getItem(APP_NAME);
        return data ? JSON.parse(data) : defaultUser;
    }
    return defaultUser; // Return default data during SSR
};

// Initialize store if not set
if (typeof window !== "undefined" && !window.localStorage.getItem(APP_NAME)) {
    window.localStorage.setItem(APP_NAME, JSON.stringify(defaultUser));
}

// Update localStorage
const updateStore = (data) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(APP_NAME, JSON.stringify(data));
    }
};

// Set user login state
const setUserLogin = (bool) => {
    const store = getStoreData();
    if (bool) {
        store.isUserLogged = true;
    } else {
        Object.assign(store, defaultUser);
    }
    updateStore(store);
};

// Set user info
const setUserInfo = (data, isAdmin = false) => {
    const store = getStoreData();
    store.loggedUser = data;
    store.isUserLogged = true;
    store.isAdmin = isAdmin;
    updateStore(store);
};

const logout = () => {
    updateStore(defaultUser);
    window.localStorage.clear(APP_NAME);
    navigate('/');
}

export const earse = () => {
    updateStore(defaultUser);
    window.localStorage.clear(APP_NAME);
}

const setComplains = (data) => {
    const store = getStoreData();
    store.reports = data;
    updateStore(store);
}
const getComplains = () => {
    const store = getStoreData();
    return store.reports;
}
const getComplain = (id) => {
    const complain = getStoreData().reports;
    let i = 0;
    while (i < complain.length) {
        let element = complain[i];
        if (element._id.toString() == id.toString())
            break;
        i++;
    }
    return complain[i] || false;
}
const getUser = () => {
    const store = getStoreData();
    return store.loggedUser;
}

export const setStats = (data) => {
    if (!data) return;
    const store = getStoreData();
    store.stats = data;
    updateStore(store);
}
export const getStats = () => {
    return getStoreData().stats;
}

const isUserLogin = () => {
    return getStoreData().isUserLogged;
}

// Export getter function
export { getComplains, isUserLogin, getUser, getComplain, getStoreData, setComplains, updateStore, setUserLogin, setUserInfo, logout };


//
//init session store 
//which remove after once I close tab 
const SESSION_NAME = "SESSION_STORE";

const SessionStoreSchema = {
    lastCookieCheckedAt: null,
    isCookiesChecked: false,
}

const init_session = () => {
    if (typeof window != "undefined" && !window.sessionStorage.getItem(SESSION_NAME))
        window.sessionStorage.setItem(SESSION_NAME, JSON.stringify(SessionStoreSchema))
}
init_session();

export const get_session = () => {
    if (typeof window != "undefined") {
        const data = window.sessionStorage.getItem(SESSION_NAME);
        return data ? JSON.parse(data) : SessionStoreSchema;
    }
    return SessionStoreSchema
}
//update with data
export const update_session = (data) => {
    if (typeof window != "undefined")
        window.sessionStorage.setItem(SESSION_NAME, JSON.stringify(data))
}