import {
    Datagrid,
    List,
    TextField,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    DateInput,
    SelectInput,
    usePermissions,
    useNotify,
  } from 'react-admin';
  
  import Select from 'react-select/dist/declarations/src/Select';
  import React, { useState, useEffect } from "react";
  import { required } from 'ra-core';
  
  export const UserList = () => {
    const {permissions} = usePermissions();
    const isCoordinador = permissions.includes('Ejecutivo');
    const notify = useNotify();

    if(isCoordinador){
      return(
      <List>
        <Datagrid rowClick="show">
        <TextField source="usuario" label="Usuario" />
        <TextField source="fullName" label="Nombre Completo" />
        <TextField source="permissions" label="Permisos" />
        </Datagrid>
      </List>
      )
    }
    else{
      notify('No tiene los permisos para visualizar la lista de usuarios',{type:'error'});
      window.location.href='/#/tickets'
      return null;
    };
    
  };