import { Admin, Resource, ShowGuesser, ThemeProvider, defaultDarkTheme, defaultTheme } from "react-admin";
import { dataProvider } from './dataProvider';
import { PostList, PostEdit, PostCreate } from "./posts";
import { UserList } from "./users";
import { Dashboard } from "./Dashboard";
import { AuthProvider } from "react-admin";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { authProvider } from "./AuthProvider";
import { i18nProvider } from "./i18nProvider";
import { AlbumsEdit, AlbumsList, AlbumCreate } from "./albums";
import React from "react";
import MyLoginPage from "./MyLoginPage";
import { MyLayout } from "./MyLayout";

export const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider} layout={MyLayout} darkTheme={{palette: {mode:'dark'}}} dashboard={Dashboard} i18nProvider={i18nProvider} loginPage={<MyLoginPage theme={defaultTheme}/>}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} options={{ label: 'Publicaciones' }} />
        <Resource name="users" list={UserList} show={ShowGuesser} recordRepresentation="name" icon={UserIcon} options={{ label: 'Usuarios' }} />
        <Resource name="albums" list={AlbumsList} show={ShowGuesser} edit={AlbumsEdit} create={AlbumCreate} options={{ label: 'Albums' }} />
    </Admin>
); 