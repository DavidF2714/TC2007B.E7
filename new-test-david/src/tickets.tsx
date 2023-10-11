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
  useAuthenticated,
  required
} from 'react-admin';
import { Suppliers } from './Components/Suppliers';
import { Subsupplier } from './Components/Suppliers';
import Select from 'react-select/dist/declarations/src/Select';
import React, { useState } from "react";

export const TicketList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source='aula' label="Aula" />
      <TextField source="coordinador" label="Coordinador" />
      <TextField source='folio' label="Folio" />
      <TextField source="categoria" label="Categoría" />
      <TextField source="subcategoria" label="Subcategoría" />
      <TextField source="estado" label="Estado" />
      <TextField source='prioridad' label="Prioridad"/>
      <TextField source="timestamp" label="Fecha y Hora" />
    </Datagrid>
  </List>
);

export const TicketEdit = () => (

  <Edit>
    <SimpleForm>
      <TextInput source="aula" label="Aula" disabled validate={required()} />
      <TextInput source="coordinador" disabled validate={required()} />
      <TextInput source="categoria" disabled />
      <TextInput source='folio' disabled label="Número de Oficio" />
      <TextInput source="subcategoria" disabled />
      <TextInput source='timestamp' label="Fecha y Hora" disabled validate={required()} />
      <SelectInput validate={required()} source='estado' label="Estado" choices={[
        { id: 'En curso', name: 'En Curso' },
        { id: 'Completado', name: 'Completado' }
      ]} />
      <SelectInput validate={required()} source='prioridad' label="Prioridad" choices={[
        { id: 'bajo', name: 'Bajo' },
        { id: 'medio', name: 'Media' },
        { id: 'alto', name: 'Alto' }
      ]} />
      <TextInput source="descripción" disabled multiline rows={5} fullWidth />
      <TextInput source="comentario" multiline rows={5} fullWidth />
    </SimpleForm>
  </Edit>
);





export const TicketCreate = () => {
  const auth = useAuthenticated();
  const [selectedSupplier, setSelectedSupplier] = useState<number | undefined>();

  const handleSupplierChange = (value: number | undefined) => {
    setSelectedSupplier(value);
  };

  const currentTimestamp = new Date();

  const identity = JSON.parse(localStorage.getItem("identity") || "{}");
  const fullName = identity ? identity.fullName : '';



  const formattedTimestamp = currentTimestamp.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Create>
      <SimpleForm >
        <DateInput source='timestamp' label="Fecha" defaultValue={formattedTimestamp} disabled validate={required()} />
        <TextInput source="aula" label="Aula" validate={required()} />
        <TextInput source="coordinador" label="Nombre del Coordinador" defaultValue={fullName} type='text' disabled validate={required()} />
        <TextInput source='folio' label="Número de Oficio" />
        <Suppliers onChange={handleSupplierChange} />
        <Subsupplier value={selectedSupplier} />
        <TextInput source='estado' label="Estado" defaultValue="Nuevo" disabled validate={required()} />
        <SelectInput validate={required()} source='prioridad' label="Prioridad" choices={[
          { id: 'bajo', name: 'Bajo' },
          { id: 'medio', name: 'Media' },
          { id: 'alto', name: 'Alto' }
        ]} />
        <TextInput source="descripción" multiline rows={5} label="Descripción" fullWidth validate={required()} />
      </SimpleForm>
    </Create>
  );
};