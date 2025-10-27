import React, { useState, useEffect } from 'react';
import { useUpdatePerson } from '../../hooks/hooks crud/useUpdatePerson';
import { PersonForm } from './Form';

export const UpdatePersonModal = ({ show, onClose, person }) => {
  const { updatePerson, isLoading, error: apiError } = useUpdatePerson();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (person) {
      const sourceFecha = person.fechaNacimiento || person.fecha_nacimiento || '';
      const formattedDate = sourceFecha ? sourceFecha.split('T')[0] : '';
      setFormData({ ...person, fechaNacimiento: formattedDate });
    }
  }, [person]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idToUse = person._id ?? person.id;
      await updatePerson(idToUse, formData);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Persona</h2>
        <form onSubmit={handleSubmit}>
          <PersonForm formData={formData} handleChange={handleChange} />          
          <br />
          <button type="submit" disabled={isLoading} className="button-green">
            {isLoading ? 'Actualizando...' : 'Actualizar'}
          </button>
          <button type="button" onClick={onClose} className='button-danger' >Cancelar</button>
        </form>
        {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
      </div>
    </div>
  );
};
