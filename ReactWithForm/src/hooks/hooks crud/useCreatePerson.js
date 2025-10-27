import { useState } from 'react';
import { createPerson as createPersonApi } from '../../Api/personsApi';

// recibir db seleccionada desde el componente
export const useCreatePerson = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPerson = async (personData) => {
    setIsLoading(true);
    setError(null);
    try {
      if (personData.dni !== undefined) {
        const dniStr = String(personData.dni).replace(/\D/g, '');
        if (!/^\d{10}$/.test(dniStr)) {
          const clientError = new Error('El DNI debe contener exactamente 10 dígitos numéricos.');
          clientError.isClientValidation = true;
          throw clientError;
        }
        personData.dni = dniStr;
      }
      // Validación de fecha (MongoDB): asegurarse que no sea futura
      if (personData.fechaNacimiento) {
        const parts = String(personData.fechaNacimiento).split('-').map(Number);
        if (parts.length === 3) {
          const [y, m, d] = parts;
          const inputDate = new Date(y, m - 1, d);
          const today = new Date();
          const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          if (inputDate > todayDate) {
            const clientError = new Error('La fecha de nacimiento no puede ser una fecha futura.');
            clientError.isClientValidation = true;
            throw clientError;
          }
        }
      }
      await createPersonApi(personData);
    } catch (err) {
      if (err.isClientValidation) {
        setError(err.message);
        throw err;
      }
      let errorMessage = 'Ocurrió un error inesperado.';

      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const validationErrors = err.response.data.errors;
          errorMessage = Object.values(validationErrors)
            .map(error => error.message)
            .join(' ');
        } 
        else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }

      setError(errorMessage);
      throw err;

    } finally {
      setIsLoading(false);
    }
  };

  return { createPerson, isLoading, error };
};
