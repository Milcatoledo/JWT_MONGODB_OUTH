import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';


export const FormField = ({
    label,
    name,
    type = 'text',
    value = '',
    onChange,
    placeholder = '',
    error,
    required = false,
    maxLength,
    ...rest
}) => {
    const [visible, setVisible] = useState(false);
    const handleToggle = () => setVisible(v => !v);
    const inputType = type === 'password' ? (visible ? 'text' : 'password') : type;
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <div style={{ position: 'relative' }}>
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={error ? 'error' : ''}
                    required={required}
                    maxLength={maxLength}
                    {...rest}
                    style={{ paddingRight: type === 'password' ? 40 : undefined }}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={handleToggle}
                        className="password-toggle"
                        aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                        {visible ? (
                            <EyeOff size={18} strokeWidth={2} />
                        ) : (
                            <Eye size={18} strokeWidth={2} />
                        )}
                    </button>
                )}
            </div>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default FormField;
