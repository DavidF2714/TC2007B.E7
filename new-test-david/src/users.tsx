import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField, UrlField , 
    useNotify,
    useRefresh,
    useRedirect} from "react-admin";
import MyUrlField from "./MyUrlField";

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.email}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="id" label="ID de Usuario"/>
                    <TextField source="name" label="Nombre"/>
                    <EmailField source="email" label="E-Mail" />
                    <TextField source="phone" label="Telefono"/>
                    <MyUrlField source="website" />
                    <TextField source="company.name"label="Compañia" />
                </Datagrid>
            )}
        </List>
    );
};