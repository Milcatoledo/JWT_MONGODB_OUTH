import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

export const RegisterUser = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        try {
            const res = await register(data);
            if (res && res.token) {
                navigate('/');
            }
        } catch (err) {
            console.error('Error registro:', err);
            alert(err.response?.data?.message || err.message || 'Error al registrar');
        }
    };

    return (
        <div className="register-page register-container">
            <div className="register-box">
                <AuthForm onSubmit={handleRegister} />

                <div className="register-google-wrap">
                    <a
                        href={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google`}
                        className="button-google google-btn"
                    >
                        Registrarse con Google
                    </a>
                </div>
            </div>
        </div>
    )
};

export default RegisterUser;
