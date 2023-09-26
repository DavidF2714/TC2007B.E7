// in src/posts.tsx
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    TextInput,
    useRecordContext,
    useNotify,
    useRefresh,
    useRedirect
} from "react-admin";

export const AlbumsList = () => (
    <List filters={postFilters}>
        <Datagrid rowClick="edit">
            <ReferenceField source="userId" reference="users" link="show" label="Usuario" />
            <TextField source="userId" label="ID de Usuario" />
            <TextField source="id" label="ID"/>
            <TextField source="title" label="Titulo"/>
        </Datagrid>
    </List>
);

export const AlbumsEdit = () => {
  const notify =useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () =>{
    notify('Changes Saved',{undoable:true});
    redirect('/albums');
    refresh();
  };

  return(
    <Edit title={<AlbumsTitle/>} mutationOptions={{onSuccess}}>
      <SimpleForm warnWhenUnsavedChanges>
        <TextInput source="userId" disabled label="ID de Usuario" />
        <TextInput source="id" label="ID" />
        <TextInput source="title" label="Titulo"/>
      </SimpleForm>
    </Edit>
)};

export const AlbumCreate = () => {
  const notify =useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () =>{
    notify('Changes Saved',{undoable:true});
    redirect('/albums');
    refresh();
  };

  return(
  <Create title={<AlbumsTitle/>} mutationOptions={{onSuccess}}>
    <SimpleForm warnWhenUnsavedChanges>
      <ReferenceInput source="userId" reference="albums" label="ID de Usuario" />
      <TextInput source="title" label="Titulo"/>
      <TextInput source="body" multiline rows={5} label="Cuerpo"/>
    </SimpleForm>
  </Create>
)};

const AlbumsTitle=()=>{
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

const postFilters = [
    <TextInput source="q" label="Buscar" alwaysOn />,
    <ReferenceInput source="userId" label="Albums" reference="albums" />,
];

