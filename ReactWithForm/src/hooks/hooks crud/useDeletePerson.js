import { useState } from 'react';
import { deletePerson as deletePersonApi } from '../../Api/personsApi';

export const useDeletePerson = (db = 'mongodb') => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const removePerson = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await deletePersonApi(id, db);
    } catch (err) {
      setError('Error al eliminar la persona.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { removePerson, isLoading, error };
};
