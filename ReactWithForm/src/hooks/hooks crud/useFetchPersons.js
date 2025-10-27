import { useState, useCallback, useEffect } from 'react';
import { getPersons } from '../../Api/personsApi';

export const useFetchPersons = () => {
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPersons = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
        const data = await getPersons();
        // MongoDB ya devuelve documentos con _id y fechaNacimiento adecuados
        setPersons(data || []);
        } catch (err) {
            console.error('Falló la carga de personas:', err);
            setError('No se pudieron cargar las personas.');
        } finally {
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchPersons();
    }, [fetchPersons]);

    return { persons, isLoading, error, fetchPersons };
};
