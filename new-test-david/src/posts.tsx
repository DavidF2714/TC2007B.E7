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

export const PostList = () => (
    <List filters={postFilters}>
        <Datagrid>
            <ReferenceField source="userId" reference="users" link="show" label="ID de Usuario"/>
            <TextField source="id" label="ID"/>
            <TextField source="title" label="Title"/>
            <TextField source="body" label="Cuerpo"/>
        </Datagrid>
    </List>
);

export const PostEdit = () => {
  const notify =useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () =>{
    notify('Changes Saved',{undoable:true});
    redirect('/posts');
    refresh();
  };

  return(
    <Edit mutationOptions={{onSuccess}}>
      <SimpleForm warnWhenUnsavedChanges>
        <ReferenceInput source="userId" reference="users" link="show" label="ID de Usuario" />
        <TextInput source="id" disabled label="ID"/>
        <TextInput source="title" />
        <TextInput source="body" multiline rows={5}/>
      </SimpleForm>
  </Edit>
)};

export const PostCreate = () => {
  const notify =useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () =>{
    notify('Changes Saved',{undoable:true});
    redirect('/albums');
    refresh();
  };

  return(
  <Create title={<PostTitle/>} mutationOptions={{onSuccess}}>
    <SimpleForm warnWhenUnsavedChanges>
      <ReferenceInput source="userId" reference="users" label="ID de Usuario"/>
      <TextInput source="title" label="Titulo" />
      <TextInput source="body" multiline rows={5} label="Cuerpo" />
    </SimpleForm>
  </Create>
)};

const PostTitle=()=>{
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

const postFilters = [
    <TextInput source="q" label="Buscar" alwaysOn />,
    <ReferenceInput source="userId" label="Usuarios" reference="users" />,
];