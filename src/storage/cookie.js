import Cookies from 'js-cookie';

export const setCookieCache = (key, data, ttl) => {
    const expiry = new Date(new Date().getTime() + ttl * 1000);
    const item = { data, expiry: expiry.toISOString() }; // Use ISO string to store date in a cookie
    Cookies.set(key, JSON.stringify(item), { expires: expiry });
};

export const getCookieCache = (key) => {
    const itemStr = Cookies.get(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (new Date().getTime() > new Date(item.expiry).getTime()) {
        Cookies.remove(key);
        return null;
    }
    return item.data;
};
