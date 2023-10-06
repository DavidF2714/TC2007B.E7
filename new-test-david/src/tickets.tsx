import { Datagrid, List, TextField, Edit, SimpleForm, TextInput, Create} from 'react-admin';
import { Suppliers} from './Components/Suppliers';
import {Subsupplier} from './Components/Suppliers';
import React, { useState } from "react";


export const TicketList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="coordinador" />
            <TextField source="categoria" />
            <TextField source="subcategoria" />
            <TextField source="status" />
        </Datagrid>
    </List>
);

export const TicketEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="coordinador" disabled/>
            <TextInput source="categoria" />
            <TextInput source="subcategoria" />
            <TextInput source="status" />
            <TextInput source="descripcion" />
            <TextInput source="comentario" multiline rows={5}/>
        </SimpleForm>
    </Edit>
);

export const TicketCreate = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<number | undefined>();

  const handleSupplierChange = (value: number | undefined) => {
    setSelectedSupplier(value);
  };
    return (
      <Create>
        <SimpleForm>
          <TextInput source="id" disabled />
          <TextInput source="coordinador" />
          <Suppliers onChange={handleSupplierChange} />
          <Subsupplier value={selectedSupplier} />
          <TextInput source="status" />
          <TextInput source="descripcion" />
          <TextInput source="comentario" multiline rows={5} />
        </SimpleForm>
      </Create>
    );
  };