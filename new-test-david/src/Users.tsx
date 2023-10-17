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
  } from 'react-admin';
  import { Box } from '@mui/material';
  import { required } from 'ra-core';
  import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit'
  import Header from './Components/Header.jsx';


  export const UserList = () => {
    const {permissions} = usePermissions();
    const isEjecutivo = permissions.includes('Ejecutivo');
    const notify = useNotify();


    if(!isEjecutivo){
      notify('No tiene los permisos para visualizar los Usuarios',{type:'error'});
      window.location.href='/#/tickets'
      return null;
    }

    return(
      <Box m="1.5rem 2.5rem">
      <Header title="USUARIOS" subtitle="Ver usuarios registrados."/>
      
      <List>
        <Datagrid rowClick="edit">
        <TextField source="usuario" label="Usuario" />
        <TextField source="fullName" label="Nombre Completo" />
        <TextField source="permissions" label="Permisos" />
        </Datagrid>
      </List>
      <MDBBtn color='success' size='lg' type="submit" href='/#/registrarse'>Registrar</MDBBtn>
      </Box>
    );  
};

export const UsuarioEdit: React.FC = (props) => {
  const { permissions } = usePermissions();

  // Verificar si el usuario tiene permisos de Coordinador
  const isEjecutivo = permissions.includes('Ejecutivo');
  const isCoordinador = permissions.includes('Coordinador');

  return (
    <Edit {...props}>
      <SimpleForm warnWhenUnsavedChanges toolbar={<SaveButton label="Guardar"/>}>
        <TextField source="usuario" label="Usuario" />
        <TextField source="fullName" label="Nombre Completo" />
        <TextField source="permissions" label="Permisos" />
      </SimpleForm>
    </Edit>
  );
};