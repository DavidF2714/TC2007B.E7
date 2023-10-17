import {
    Datagrid,
    List,
    TextField,
    usePermissions,
    useNotify,
  } from 'react-admin';
  import { Box } from '@mui/material';
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
        <Datagrid rowClick="show">
        <TextField source="usuario" label="Usuario" />
        <TextField source="fullName" label="Nombre Completo" />
        <TextField source="permissions" label="Permisos" />
        </Datagrid>
      </List>
      </Box>
    );  
};