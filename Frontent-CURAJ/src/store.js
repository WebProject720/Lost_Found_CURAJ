const APP_NAME = "AppStore";

const defaultUser = {
    isUserLogged: false,
    loggedUser: null,
    reports: []
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
const setUserInfo = (data) => {
    const store = getStoreData();
    store.loggedUser = data;
    store.isUserLogged = true;
    updateStore(store);
};

const logout = () => {
    updateStore(defaultUser);
    window.localStorage.clear(APP_NAME);
}

// Export getter function
export { getStoreData, updateStore, setUserLogin, setUserInfo, logout };
