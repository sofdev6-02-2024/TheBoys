import { useEffect, useState } from 'react';
import { TrainerRequest } from "../../types";

export const useCoachRequestGet = () => {
    const [data, setData] = useState<TrainerRequest[]>([]);
    
    useEffect(() => {
        async function fetchData() {
        const response = await fetch('http://localhost:4444/trainer-requests/');
        const result = await response.json();
        setData(result);
        }
        
        fetchData();
    }, []);
    
    return { data };
};
