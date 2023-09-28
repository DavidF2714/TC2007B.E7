import { Admin, CustomRoutes, Resource, ShowGuesser, ThemeProvider, defaultDarkTheme, defaultTheme } from "react-admin";
import { dataProvider } from './dataProvider';
import { Dashboard } from "./Dashboard";
import { AuthProvider} from "react-admin";
import authProvider from "./AuthProvider";
import { i18nProvider } from "./i18nProvider";
import React from "react";
import MyLoginPage from "./MyLoginPage";
import { MyLayout } from "./MyLayout";
import { TicketList, TicketCreate, TicketEdit } from "./tickets";
import Registrarse from "./registrarse";
import { Route } from "react-router-dom";

export const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider} layout={MyLayout} darkTheme={{palette: {mode:'light'}}} dashboard={Dashboard} i18nProvider={i18nProvider} loginPage={<MyLoginPage/>}>
        <Resource name="tickets" list={TicketList} edit={TicketEdit} create={TicketCreate} options={{label:'Tickets'}}/>
        <CustomRoutes>
            <Route path="/registrarse" element={<Registrarse/>}/>
        </CustomRoutes>
    </Admin>
); 