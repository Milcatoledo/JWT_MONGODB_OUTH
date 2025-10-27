import React from 'react';
import { FormField } from '../FormField';

export const PersonForm = ({ formData, handleChange, errors = {} }) => {
  const validateInput = (e) => {
    const { name, value } = e.target;
    if (name === 'dni') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      handleChange({ target: { name, value: digits } });
      return;
    }

    handleChange(e);
  };

  const today = new Date();
  const tzOffset = today.getTimezoneOffset() * 60000; 
  const localISODate = new Date(Date.now() - tzOffset).toISOString().split('T')[0];

  return (
    <>
      <FormField
        label="DNI"
        name="dni"
        value={formData.dni || ''}
        onChange={validateInput}
        onKeyDown={(e) => {
          const allowed = /[0-9]/.test(e.key) || ['Backspace','ArrowLeft','ArrowRight','Tab','Delete'].includes(e.key);
          if (!allowed) e.preventDefault();
        }}
        onPaste={(e) => {
          e.preventDefault();
          const text = (e.clipboardData || window.clipboardData).getData('text');
          const digits = text.replace(/\D/g, '').slice(0, 10);
          const input = e.target;
          const event = { target: { name: input.name, value: (input.value + digits).slice(0,10) } };
          validateInput(event);
        }}
        inputMode="numeric"
        placeholder="DNI (10 dígitos numericos)"
        error={errors.dni && errors.dni.message}
        maxLength={10}
        required
      />

      <FormField
        label="Nombres"
        name="nombres"
        value={formData.nombres || ''}
        onChange={validateInput}
        placeholder="Nombres"
        error={errors.nombres && errors.nombres.message}
        required
      />

      <FormField
        label="Apellidos"
        name="apellidos"
        value={formData.apellidos || ''}
        onChange={validateInput}
        placeholder="Apellidos"
        error={errors.apellidos && errors.apellidos.message}
        required
      />

      <FormField
        label="Fecha de nacimiento"
        name="fechaNacimiento"
        type="date"
        value={formData.fechaNacimiento || ''}
        onChange={handleChange}
        max={localISODate}
        error={errors.fechaNacimiento && errors.fechaNacimiento.message}
        required
      />
    </>
  );
};
