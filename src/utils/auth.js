import { ref } from 'vue';
import {
    fetchUserData,
    error as userError,
    isPending as userIsPending,
} from '@/api/user';

const user = ref(null);
const isAuthenticated = ref(false);

const fetchUser = async (accessToken) => {
    try {
        const userObject = await fetchUserData(accessToken);
        user.value = userObject;
        isAuthenticated.value = true;
    } catch (err) {
        console.error(err);
        isAuthenticated.value = false;
    }
};

const saveTokenToSessionStorage = (accessToken, expiresIn) => {
    const expiryDate = new Date().getTime() + Number.parseInt(expiresIn) * 1000;
    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('expiry_date', expiryDate.toString());
};

const checkCallback = () => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');

    if (accessToken && expiresIn) {
        saveTokenToSessionStorage(accessToken, expiresIn);
        fetchUser(accessToken);
        window.location.href = '/';
    } else if (params.has('error')) {
        console.error(params.get('error'));
    }
};

const checkSessionStorage = () => {
    const accessToken = sessionStorage.getItem('access_token');
    const expiryDate = sessionStorage.getItem('expiry_date');

    if (accessToken && expiryDate) {
        if (new Date().getTime() < Number.parseInt(expiryDate)) {
            fetchUser(accessToken);
        } else {
            logout();
        }
    } else {
        logout();
    }
};

const logout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('expiry_date');
    user.value = null;
    isAuthenticated.value = false;
};

export const useAuth = () => {
    return {
        fetchUser,
        user,
        userIsPending,
        userError,
        isAuthenticated,
        saveTokenToSessionStorage,
        checkCallback,
        checkSessionStorage,
        logout,
    };
};
