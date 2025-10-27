export const PersonsTable = ({ persons, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return <p>Cargando personas...</p>;
  }

  if (!persons || persons.length === 0) {
    return <p>No hay personas para mostrar.</p>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('es-ES');
  };

  return (
    <table>
      <thead>
        <tr>
          <th>DNI</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Fecha de Nacimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person._id}>
            <td>{person.dni}</td>
            <td>{person.nombres}</td>
            <td>{person.apellidos}</td>
              <td>{formatDate(person.fechaNacimiento)}</td>
            <td>
              <button onClick={() => onEdit(person)} className="button-green">Editar</button>
              <button onClick={() => onDelete(person)} className='button-danger' >Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
