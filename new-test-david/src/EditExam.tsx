import { Edit, useNotify, SimpleForm, TextInput } from 'react-admin'

export const TicketEdit: React.FC = (props) => {
    const notify = useNotify();

    const handleTitleEdit = (event:any) => {
        notify("Titulo Actualizado")
    }

    const handleBodyEdit = (event:any) => {
        notify("Cuerpo Actualizado")
    }

    return (
        <Edit redirect='./#/dashboard'  {...props}>
            <SimpleForm>
                <TextInput source='titulo' label='Titulo' onChange={handleTitleEdit}/>
                <TextInput source='cuerpo' label='Cuerpo' onChange={handleBodyEdit}/>
            </SimpleForm>
        </Edit>
    );
};
