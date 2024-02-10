export const deleteCookie = (cookieName: string) => {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export const getCookie = (cookieName: string) => {
    const name = cookieName + "=";
    const allCookies = document.cookie.split('; ');
    for (let i = 0; i < allCookies.length; i++) {
        const c = allCookies[i];
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Checks if a cookie exists and is not empty
 * @param cookieName The name of the cookie
 * @returns true, if cookie exists and is not empty, false otherwise
 */
export const checkCookie = (cookieName: string) => {
    const cookie = getCookie(cookieName);
    if (cookie === "") return false;
    else return true;
}

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}