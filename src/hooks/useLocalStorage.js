import { useEffect, useState } from "react";

const useLocalStorage = (storageKey, defaultValue = '') => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(storageKey);

        return (storedValue !== null) ? JSON.parse(storedValue)
            : defaultValue
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    return [value, setValue];
}

export default useLocalStorage;