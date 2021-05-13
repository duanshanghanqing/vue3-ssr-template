export const sessionStorageGet = (key: string) => {
    let value: any = sessionStorage.getItem(key);
    try {
        value = JSON.parse(value)
    } catch (error) {
        console.warn('sessionStorageGet', error)
    }
    return value;
}

export const sessionStorageSet = (key: string, value: any) => {
    let _value = value;
    if (typeof value === 'object') {
        _value = JSON.stringify(value);
    }
    sessionStorage.setItem(key, _value);
}

export const sessionStorageRemove = (key: string) => {
    sessionStorage.removeItem(key);
}

export const sessionStorageClear = () => {
    sessionStorage.clear();
}
