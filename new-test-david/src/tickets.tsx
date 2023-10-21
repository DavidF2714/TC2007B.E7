import {
  Edit,
  SimpleForm,
  TextInput,
  Create,
  DateInput,
  SelectInput,
  usePermissions,
  useNotify,
  SaveButton,
  useDataProvider,
} from "react-admin";
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Container,
  Grid,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "./Components/Header.jsx";
import { required } from "ra-core";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { tokens } from "./theme.js";


export const TicketList = () => {
  const dataProvider = useDataProvider();
  const [tickets, setTickets] = useState<any[]>([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dataProvider
      .getList("tickets", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "timestamp", order: "DESC" },
        filter: {},
      })
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los tickets", error);
      });
  }, []);

  return (
    <Box  m="1.5rem 2.5rem">
      <Header title="TICKETS" subtitle="Ver lista de tickets." />
      <Container>
      <Box sx={{ pathingButtom: 40}}> <Button
                    href="/#/tickets/create"
                    variant="contained"
                    color={"success"}
                    size="large"
                    startIcon={<AddIcon />}
                  >
                    CREAR
                  </Button> </Box>
      <Grid container spacing={3} paddingTop={2}> 
          {tickets.map((ticket, i) => (
            <Grid item key={`ticket-${i}`} xs={16} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }} variant="outlined">
                <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                   {ticket.timestamp}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Aula: {ticket.aula}
                  </Typography>
                  <Typography sx={{ mb: 1.5, fontWeight: 'bold' }} variant="body2" color="text.secondary">
                    Coordinador: {ticket.coordinador}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Prioridad:&nbsp;
                    <span
            style={{
              color: ticket.prioridad === 'Bajo' ? 'green' :
                     ticket.prioridad === 'Medio' ? 'orange' :
                     ticket.prioridad === 'Alto' ? 'red' : 'black'
            }}
          >
            {ticket.prioridad}
          </span>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                    Estado: {ticket.estado}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                    {ticket.categoria} - {ticket.subcategoria}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={`./#/tickets/${ticket.id}`}>Atender</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export const TicketEdit: React.FC = (props) => {
  const { permissions } = usePermissions();
  const notify = useNotify();

  // Verificar si el usuario tiene permisos de Coordinador
  const isCoordinador = permissions.includes("Coordinador");

  const handleTitleChange = () => {
    notify('Titulo actualizado')
  };

  const handleBodyChange = (event:any) => {
    const newBody = event.target.value;
    notify('Cuerpo actualizado', newBody)
  };
  
  return (
    <Edit redirect='/#/dashboard' {...props}>
      <Box sx={{ textAlign: 'center', justifyContent: 'center' }}>
      <SimpleForm
        warnWhenUnsavedChanges
        toolbar={<SaveButton label="Guardar" />}
      >
        <TextInput source="aula" label="Aula" disabled validate={required()}/>
        <TextInput source="coordinador" disabled validate={required()}/>
        <TextInput source="categoria" disabled />
        <TextInput source="folio" disabled label="Número de Oficio" />
        <TextInput source="subcategoria" disabled />
        <TextInput
          source="timestamp"
          label="Fecha y Hora"
          disabled
          validate={required()}
        />
        <SelectInput
          validate={required()}
          source="estado"
          label="Estado"
          choices={[
            { id: "En curso", name: "En Curso" },
            { id: "Completado", name: "Completado" },
          ]} onChange={handleTitleChange}
        />
        <SelectInput
          validate={required()}
          source="prioridad"
          label="Prioridad"
          choices={[
            { id: "Bajo", name: "Bajo" },
            { id: "Medio", name: "Media" },
            { id: "Alto", name: "Alto" },
          ]}
          disabled={isCoordinador}
        />
        <TextInput source="descripcion" disabled multiline rows={5} fullWidth />
        <TextInput source="comentario" multiline rows={5} fullWidth onChange={handleBodyChange}/>
      </SimpleForm>
      </Box>
    </Edit>
  );
};

type SubCategory = { id: string; name: string };
type SubCategoriesOptions = Record<string, SubCategory[]>;

const subCategoriesOptions: SubCategoriesOptions = {
  Servicios: [
    { id: "Agua", name: "Agua" },
    { id: "Luz", name: "Luz" },
    { id: "Telefono", name: "Telefono" },
    { id: "Basura", name: "Basura" },
    { id: "Limpieza del Aula", name: "Limpieza del Aula" },
  ],
  Digital: [
    { id: "Internet/Servidores/Equipo", name: "Internet/Servidores/Equipo" },
    { id: "Software", name: "Software" },
    { id: "Hardware", name: "Hardware" },
    { id: "Cámara de Seguridad", name: "Cámara de Seguridad" },
    {
      id: "Soporte Técnico Presencial y Remoto",
      name: "Soporte Técnico Presencial y Remoto",
    },
  ],
  Infraestructura: [
    { id: "Paredes", name: "Paredes" },
    { id: "Techos", name: "Techos" },
    { id: "Ventanas", name: "Ventanas" },
    { id: "Puertas", name: "Puertas" },
    { id: "Aulas en general", name: "Aulas en general" },
  ],
  "Recursos Humanos": [
    { id: "Permisos", name: "Permisos" },
    { id: "Asistencias", name: "Asistencias" },
    { id: "Salud", name: "Salud" },
    { id: "Tramites", name: "Tramites" },
    { id: "Honorarios", name: "Honorarios" },
  ],
  Beneficiarios: [
    { id: "Asistencias", name: "Asistencias" },
    { id: "Documentacion", name: "Documentacion" },
    { id: "Apoyo Academico", name: "Apoyo Academico" },
    { id: "Salud", name: "Salud" },
    { id: "Seguridad, Bullying", name: "Seguridad, Bullying" },
  ],
  Mobiliario: [
    { id: "Sillas, Butacas", name: "Sillas, Butacas" },
    { id: "Escritorios", name: "Escritorios" },
    { id: "Pizarrones", name: "Pizarrones" },
    { id: "Cafetería", name: "Cafetería" },
    { id: "Estantes, Archiveros", name: "Estantes, Archiveros" },
  ],
  Seguridad: [
    { id: "Delicuencia", name: "Delicuencia" },
    { id: "Robo", name: "Robo" },
    { id: "Bandalismo", name: "Bandalismo" },
    { id: "Imagen Intistucional", name: "Imagen Intistucional" },
  ],
  Materiales: [
    { id: "Educativos", name: "Educativos" },
    { id: "Papeleria", name: "Papeleria" },
    { id: "Limpieza", name: "Limpieza" },
  ],
  "Fenómeno Metereológico": [
    { id: "Inundaciones", name: "Inundaciones" },
    { id: "Incendios", name: "Incendios" },
    { id: "Sismos", name: "Sismos" },
  ],
};

export const TicketCreate: React.FC = (props) => {
  const { permissions } = usePermissions();
  const isCoordinador = permissions.includes("Coordinador");
  const notify = useNotify();

  const [selectedCategory, setSelectedCategory] = useState("1");
  const [subCategories, setSubCategories] = useState(
    subCategoriesOptions[selectedCategory] || []
  );
  useEffect(() => {
    setSubCategories(subCategoriesOptions[selectedCategory] || []);
  }, [selectedCategory]);
  const currentTimestamp = new Date();

  const identity = JSON.parse(localStorage.getItem("identity") || "{}");
  const fullName = identity ? identity.fullName : "";
  const formattedTimestamp = currentTimestamp.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!isCoordinador) {
    notify("No tiene los permisos para crear un ticket", { type: "error" });
    window.location.href = "/#/tickets";
    return null;
  }

  return (
    <Create {...props}>
      <SimpleForm warnWhenUnsavedChanges>
        <DateInput
          source="timestamp"
          label="Fecha"
          defaultValue={formattedTimestamp}
          disabled
          validate={required()}
          sx={{ justifyContent: "center" }}
        />
        <TextInput source="aula" label="Aula" validate={required()} />
        <TextInput
          source="coordinador"
          label="Nombre del Coordinador"
          defaultValue={fullName}
          type="text"
          disabled
          validate={required()}
        />
        <TextInput source="folio" label="Número de Oficio" />
        <SelectInput
          validate={required()}
          source="categoria"
          label="Categoría"
          choices={[
            { id: "Servicios", name: "Servicios" },
            { id: "Digital", name: "Digital" },
            { id: "Infraestructura", name: "Infraestructura" },
            { id: "Recursos Humanos", name: "Recursos humanos" },
            { id: "Beneficiarios", name: "Beneficiario" },
            { id: "Mobiliario", name: "Mobiliario" },
            { id: "Seguridad", name: "Seguridad" },
            { id: "Materiales", name: "Materiales" },
            { id: "Fenómeno Metereológico", name: "Fenómeno Metereológico" },
          ]}
          onChange={(event) => {
            const newValue = event.target.value;
            console.log(event.target.value);
            setSelectedCategory(newValue);
          }}
        />
        <SelectInput
          validate={required()}
          source="subcategoria"
          label="Subcategoría"
          choices={subCategories}
        />
        <TextInput
          validate={required()}
          source="estado"
          label="Estado"
          defaultValue="Nuevo"
          disabled
        />
        <SelectInput
          validate={required()}
          source="prioridad"
          label="Prioridad"
          choices={[
            { id: "Bajo", name: "Bajo" },
            { id: "Medio", name: "Media" },
            { id: "Alto", name: "Alto" },
          ]}
        />
        <TextInput
          source="descripcion"
          multiline
          rows={5}
          label="Descripción"
          fullWidth
          validate={required()}
        />
      </SimpleForm>
    </Create>
  );
};
