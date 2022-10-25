export function setItemf(key, value) {
    localStorage.setItem(key, value);
}

export function getItemf(key) {
    return localStorage.getItem(key);
}

export function removeItemf(key) {
    localStorage.removeItem(key);
}

export function clearAll() {
    localStorage.clear();
}
