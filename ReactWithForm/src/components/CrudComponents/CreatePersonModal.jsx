import React, { useState } from 'react';
import { useCreatePerson } from '../../hooks/hooks crud/useCreatePerson';
import { PersonForm } from './Form';
export const CreatePersonModal = ({ show, onClose }) => {
  const { createPerson, isLoading, error: apiError } = useCreatePerson();
  const [formData, setFormData] = useState({});

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPerson(formData);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Crear Nueva Persona (MongoDB)</h2>
        <form onSubmit={handleSubmit}>
          <PersonForm formData={formData} handleChange={handleChange} />
          
          <br />
          <button type="submit" disabled={isLoading} className="button-green">
            {isLoading ? 'Creando...' : 'Crear Persona'}
          </button>
          <button type="button" onClick={onClose} className='button-danger' >Cancelar</button>
        </form>
        {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
      </div>
    </div>
  );
};
