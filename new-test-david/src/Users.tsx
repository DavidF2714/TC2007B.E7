import {
  Datagrid,
  List,
  TextField,
  usePermissions,
  useNotify,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  SaveButton,
  Create,
} from 'react-admin';
import { Box } from '@mui/material';
import { required } from 'ra-core';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit'
import Header from './Components/Header.jsx';
import { useState } from 'react';


export const UserList = () => {
  const { permissions } = usePermissions();
  const isEjecutivo = permissions.includes('Ejecutivo');
  const notify = useNotify();


  if (!isEjecutivo) {
    notify('No tiene los permisos para visualizar los Usuarios', { type: 'error' });
    window.location.href = '/#/tickets'
    return null;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="USUARIOS" subtitle="Ver usuarios registrados." />
      <List>
        <Datagrid rowClick="edit">
          <TextField source="usuario" label="Usuario" />
          <TextField source="fullName" label="Nombre Completo" />
          <TextField source="permissions" label="Permisos" />
          <TextField source='id' label="ID" />
        </Datagrid>
      </List>
      <MDBBtn color='success' size='lg' type="submit" href='/#/registrarse'>Registrar</MDBBtn>
    </Box>
  );
};

export const UsuarioEdit: React.FC = (props) => {
  const { permissions } = usePermissions();
  const isEjecutivo = permissions.includes('Ejecutivo');
  const notify = useNotify();

  if (!isEjecutivo) {
    notify('No tiene los permisos para visualizar los Usuarios', { type: 'error' });
    window.location.href = '/#/tickets'
    return null;
  }
  
  return (
    <Edit {...props}>
      <SimpleForm warnWhenUnsavedChanges>
        <TextInput validate={required()} source="usuario" label="Usuario" />
        <TextInput validate={required()} source="fullName" label="Nombre Completo" />
        <SelectInput validate={required()} source='permissions' label="Permisos" choices={[
          { id: 'Coordinador', name: 'Coordinador de Aula' },
          { id: 'Nacional', name: 'Coordinador Nacional' },
          { id: 'Ejecutivo', name: 'Ejecutivo' }
        ]} />
        <TextInput source='id' label="ID" disabled/>
      </SimpleForm>
    </Edit>
  );
};