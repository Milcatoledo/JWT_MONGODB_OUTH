import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from './FormField';
import '../styles/AuthForm.css';
import useAuthForm from '../hooks/useAuthForm';

export const AuthForm = ({ initialValues = {}, onSubmit, onSwitchToLogin }) => {
    const navigate = useNavigate();
    const { formData, handleChange, handleSubmit, errors, submitted, isSubmitting } = useAuthForm({ initialValues, onSubmit });

    const handleSwitch = (e) => {
        e && e.preventDefault();
        if (onSwitchToLogin) return onSwitchToLogin();
        // navigate to /login
        navigate('/login');
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <h2 className="auth-form__title">Crear cuenta</h2>
        <FormField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={submitted && errors.nombre}
            required
        />

        <FormField
            label="Apellidos"
            name="apellidos"
            value={formData.apellidos || ''}
            onChange={handleChange}
            error={submitted && errors.apellidos}
            required
        />

        <FormField
            label="Correo"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            error={submitted && errors.email}
            required
        />

        <FormField
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={submitted && errors.password}
            required
        />

        <FormField
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={submitted && errors.confirmPassword}
            required
        />

        <div className="auth-form__actions">
            <button type="submit" disabled={isSubmitting} className="button-green">{isSubmitting ? 'Registrando...' : 'Registrar'}</button>
            <button type="button" className="auth-form__link" onClick={handleSwitch}>Iniciar sesión</button>
        </div>
        </form>
    );
};

export default AuthForm;
