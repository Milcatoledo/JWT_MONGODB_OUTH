import { useState } from 'react';

export function useAuthForm({ initialValues = {}, onSubmit } = {}) {
  const [formData, setFormData] = useState({
    nombre: initialValues.nombre || '',
    apellidos: initialValues.apellidos || '',
    email: initialValues.email || '',
    password: initialValues.password || '',
    confirmPassword: initialValues.confirmPassword || '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.nombre || !formData.nombre.trim()) errs.nombre = 'El nombre es requerido.';
    if (!formData.apellidos || !formData.apellidos.trim()) errs.apellidos = 'Los apellidos son requeridos.';
    if (!formData.email) errs.email = 'El correo es requerido.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Correo inválido.';
    if (!formData.password) errs.password = 'La contraseña es requerida.';
    else if (formData.password.length < 6) errs.password = 'Mínimo 6 caracteres.';
    if (formData.confirmPassword !== formData.password) errs.confirmPassword = 'Las contraseñas no coinciden.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSubmitted(true);
    if (!validate()) return false;
    setIsSubmitting(true);
    try {
      if (onSubmit) await onSubmit(formData);
      else {
        console.log('Registro (simulado):', formData);
      }
      setIsSubmitting(false);
      return true;
    } catch (err) {
      setIsSubmitting(false);
      throw err;
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errors,
    submitted,
    isSubmitting,
  };
}

export default useAuthForm;
