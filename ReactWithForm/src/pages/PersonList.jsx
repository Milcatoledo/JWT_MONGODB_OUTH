import React, { useState } from 'react';
import { } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useFetchPersons } from '../hooks/hooks crud/useFetchPersons';
import { PersonsTable } from '../components/CrudComponents/PersonsTable';
import { CreatePersonModal } from '../components/CrudComponents/CreatePersonModal';
import { UpdatePersonModal } from '../components/CrudComponents/UpdatePersonModal';
import { DeletePersonModal } from '../components/CrudComponents/DeletePersonModal';

export const PersonList = () => {
    const { persons, isLoading, error, fetchPersons } = useFetchPersons();
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const { logout, user } = useAuth();

    const handleEdit = (person) => {
        setSelectedPerson(person);
        setUpdateModalOpen(true);
    };

    const handleDelete = (person) => {
        setSelectedPerson(person);
        setDeleteModalOpen(true);
    };

    const handleCloseModals = () => {
        setCreateModalOpen(false);
        setUpdateModalOpen(false);
        setDeleteModalOpen(false);
        setSelectedPerson(null);
        fetchPersons();
    };

    return (
        <div>
            <h1>CRUD de Personas</h1>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <button onClick={() => setCreateModalOpen(true)} className="button-green">Crear registro</button>

                {/* Se eliminó la selección de base de datos: ahora solo MongoDB */}

                {user && (user.nombre || user.apellidos) ? (
                    <div style={{ marginRight: 12 }}>
                        <strong>{`${user.nombre || ''} ${user.apellidos || ''}`.trim()}</strong>
                    </div>
                ) : user && user.email ? (
                    <div style={{ marginRight: 12 }}>
                        <strong>{user.email}</strong>
                    </div>
                ) : null}
                <button type="button" className="button-green" onClick={() => { logout(); }}>
                    Cerrar sesión
                </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <PersonsTable
                persons={persons}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isLoading={isLoading}
            />

            {isCreateModalOpen && (
                <CreatePersonModal show={isCreateModalOpen} onClose={handleCloseModals} />
            )}

            {isUpdateModalOpen && selectedPerson && (
                <UpdatePersonModal show={isUpdateModalOpen} onClose={handleCloseModals} person={selectedPerson} />
            )}

            {isDeleteModalOpen && selectedPerson && (
                <DeletePersonModal show={isDeleteModalOpen} onClose={handleCloseModals} person={selectedPerson} />
            )}
        </div>
    );
};

export default PersonList;
