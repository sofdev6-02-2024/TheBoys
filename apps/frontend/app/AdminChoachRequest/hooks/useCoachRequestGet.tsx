import { useEffect, useState } from 'react';

export const useCoachRequestGet = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
        const response = await fetch('http://localhost:4444/trainer-requests/');
        const result = await response.json();
        setData(result);
        }
        
        fetchData();
    }, []);
    
    console.log(data);
    return { data };
};
