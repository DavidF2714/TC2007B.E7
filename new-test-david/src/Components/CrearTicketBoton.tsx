import React from 'react';
import { Button } from '@mui/material'; // Asegúrate de importar el componente Button de tu librería

export const CreateTicketButton: React.FC = () => {
  const handleClick = () => {
    window.location.href = '/#/tickets/create'; // Cambia la URL según tu configuración
  };

  return (
    <Button onClick={handleClick} color="success">
    </Button>
  );
};

export default CreateTicketButton;
