import {
    Datagrid,
    List,
    TextField,
    usePermissions,
    useNotify,
  } from 'react-admin';
  
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
      <List>
        <Datagrid rowClick="show">
        <TextField source="usuario" label="Usuario" />
        <TextField source="fullName" label="Nombre Completo" />
        <TextField source="permissions" label="Permisos" />
        </Datagrid>
      </List>
    );  
};