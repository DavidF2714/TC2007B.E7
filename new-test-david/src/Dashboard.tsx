import React, { useEffect, useState } from 'react';
import { useAuthenticated } from 'react-admin';
import { useDataProvider } from 'react-admin';

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import { mockTransactions } from "./Components/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "./Components/Header";
import LineChart from "./Components/LineChart";
import GeographyChart from "./Components/GeographyChart";
import BarChart from "./Components/BarChart";
import StatBox from "./Components/StatBox";
import ProgressCircle from "./Components/ProgressCircle";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import authProvider from './AuthProvider';

export const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const auth = useAuthenticated();
    const dataProvider = useDataProvider();
    const [ticketCount, setTicketCount] = useState(0);
    const [ticketsEnCurso, setTicketsEnCurso] = useState(0);
    const [ticketsCompletados, setTicketsCompletados] = useState(0);
    const [aulasRegistradas, setAulasRegistradas] = useState(0);
    const [tickets, setTickets] = useState<any[]>([]);


    useEffect(() => {
        // Lógica para contar todos los tickets
        dataProvider
            .getList('tickets', {
                pagination: { page: 1, perPage: 1 },
                sort: { field: 'id', order: 'DESC' },
                filter: {} // Puedes ajustar esto según tus necesidades de filtro
            })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    setTicketCount(response.data[0].id); // Establece el contador en el último ID
                } else {
                    setTicketCount(0); // Si no hay tickets, el contador comienza en 0
                }
            })
            .catch((error) => {
                console.error('Error al obtener los tickets:', error);
            });

        // Lógica para contar tickets con estado "En curso"
        dataProvider
            .getList('tickets', {
                pagination: { page: 1, perPage: 100 },
                sort: { field: 'id', order: 'DESC' },
                filter: { estado: 'En curso' } // Ajusta esto a tu campo de estado
            })
            .then((response) => {
                // Filtra los resultados por el estado "En curso"
                const enCursoTickets = response.data.filter(ticket => ticket.estado === 'En curso');
                setTicketsEnCurso(enCursoTickets.length);
            })
            .catch((error) => {
                console.error('Error al obtener tickets en curso:', error);
            });

        dataProvider
            .getList('tickets', {
                pagination: { page: 1, perPage: 100 },
                sort: { field: 'id', order: 'DESC' },
                filter: { estado: 'Completado' } // Ajusta esto a tu campo de estado
            })
            .then((response) => {
                // Filtra los resultados por el estado "En curso"
                const completadosTickets = response.data.filter(ticket => ticket.estado === 'Completado');
                setTicketsCompletados(completadosTickets.length);
            })
            .catch((error) => {
                console.error('Error al obtener tickets en curso:', error);
            });

        // Lógica para contar aulas registradas
        dataProvider
            .getList('tickets', {
                pagination: { page: 1, perPage: 100 }, // Ajusta el valor de perPage según la cantidad máxima de tickets
                sort: { field: 'id', order: 'DESC' },
                filter: {} // Puedes ajustar esto según tus necesidades de filtro
            })
            .then((response) => {
                const uniqueAulas = new Set(response.data.map(ticket => ticket.aula));
                setAulasRegistradas(uniqueAulas.size);
            })
            .catch((error) => {
                console.error('Error al obtener aulas registradas:', error);
            });

            // Lógica para obtener la lista de tickets
        dataProvider
            .getList('tickets', {
                pagination: { page: 1, perPage: 5 }, // Ajusta perPage según tus necesidades
                sort: { field: 'id', order: 'DESC' },
                filter: {} // Puedes ajustar esto según tus necesidades de filtro
            })
            .then((response) => {
                setTickets(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de tickets:', error);
            });
}, []);

    return (
        <Box m="20px">
          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Bienvenido" />
    
            <Box>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 30px",
                }}
              >
                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                Descargar Reporte
              </Button>
            </Box>
          </Box>
    
          {/* GRID & CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
            <Box
                gridColumn="span 3"
                display="flex"
                alignItems="center"
                justifyContent="center"
                 >
              <StatBox
                title={ticketCount}
                subtitle="Tickets Generados"
                progress="0.75"
                increase="+14%"
                icon={
                  <AddCircleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={ticketsEnCurso}
                subtitle="Tickets En Curso"
                progress="0.50"
                increase="+21%"
                icon={
                  <AccessTimeFilledIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={ticketsCompletados}
                subtitle="Tickets Completados"
                progress="0.30"
                increase="+5%"
                icon={
                  <CheckCircleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={aulasRegistradas}
                subtitle="Aulas Registradas"
                progress="0.80"
                increase="+43%"
                icon={
                  <SchoolIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
    
            {/* ROW 2 */}
            <Box
              gridColumn="span 8"
              gridRow="span 2"
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Categorías de Tickets
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    categoria
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Tickets Recientes
                </Typography>
              </Box>
              {tickets.map((ticket, i) => (
                <Box
                key={`ticket-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {ticket.aula} Aula
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {ticket.coordinador}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{ticket.timestamp}</Box>
                  <Box
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    {ticket.estado}
                  </Box>
                </Box>
              ))}
            </Box>
    
            {/* ROW 3 */}
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              p="30px"
            >
              <Typography variant="h5" fontWeight="600">
                Campaign
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size="125" />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography>Includes extra misc expenditures and costs</Typography>
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Sales Quantity
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              padding="30px"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ marginBottom: "15px" }}
              >
                Geography Based Traffic
              </Typography>
              <Box height="200px">
                <GeographyChart isDashboard={true} />
              </Box>
            </Box>
          </Box>
        </Box>
      );
    };


