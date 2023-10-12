import React, { useEffect, useState } from 'react';
import { useAuthenticated } from 'react-admin';
import { useDataProvider } from 'react-admin';

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
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

export const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dataProvider = useDataProvider();
    const [ticketCount, setTicketCount] = useState(0);
    const [ticketsEnCurso, setTicketsEnCurso] = useState(0);
    const [ticketsCompletados, setTicketsCompletados] = useState(0);
    const [aulasRegistradas, setAulasRegistradas] = useState(0);
    const [tickets, setTickets] = useState<any[]>([]);
    const [mostRepeatedCategory, setMostRepeatedCategory] = useState<string>('');

    useEffect(() => {
        // Lógica para contar todos los tickets
        dataProvider
            .getList('tickets', {
                pagination: { page: 1, perPage: 1 },
                sort: { field: 'id', order: 'DESC' },
                filter: {} 
            })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    setTicketCount(response.data[0].id); 
                } else {
                    setTicketCount(0);
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
                filter: { estado: 'En curso' }
            })
            .then((response) => {
                const enCursoTickets = response.data.filter(ticket => ticket.estado === 'En curso');
                setTicketsEnCurso(enCursoTickets.length);
            })
            .catch((error) => {
                console.error('Error al obtener tickets en curso:', error);
            });

        // Lógica para contar tickets con estado "Completado"
        dataProvider
            .getList('tickets', {
                pagination: { page: 1, perPage: 100 },
                sort: { field: 'id', order: 'DESC' },
                filter: { estado: 'Completado' } 
            })
            .then((response) => {
                const completadosTickets = response.data.filter(ticket => ticket.estado === 'Completado');
                setTicketsCompletados(completadosTickets.length);
            })
            .catch((error) => {
                console.error('Error al obtener tickets en curso:', error);
            });

        // Lógica para contar aulas registradas
        dataProvider
            .getList('tickets', {
                pagination: { page: 1, perPage: 100 },
                sort: { field: 'id', order: 'DESC' },
                filter: {} 
            })
            .then((response) => {
                const uniqueAulas = new Set(response.data.map(ticket => ticket.aula));
                setAulasRegistradas(uniqueAulas.size);
            })
            .catch((error) => {
                console.error('Error al obtener aulas registradas:', error);
            });

            // Lógica para obtener la lista de tickets recientes
        dataProvider
            .getList('tickets', {
                pagination: { page: 1, perPage: 5 }, 
                sort: { field: 'id', order: 'DESC' },
                filter: {} 
            })
            .then((response) => {
                setTickets(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de tickets:', error);
            });

            // Lógica para obtener la categoría más repetida
            dataProvider
            .getList('tickets', {
              pagination: { page: 1, perPage: 100 }, 
              sort: { field: 'id', order: 'DESC' },
              filter: {}
            })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const categoryCounts: { [key: string]: number } = {};
                    let maxCategory = '';
                    let maxCount = 0;

                    response.data.forEach((ticket) => {
                        const categoria: string = ticket.categoria;
                        if (categoria in categoryCounts) {
                            categoryCounts[categoria]++;
                        } else {
                            categoryCounts[categoria] = 1;
                        }

                        if (categoryCounts[categoria] > maxCount) {
                            maxCount = categoryCounts[categoria];
                            maxCategory = categoria;
                        }
                    });

                    if (maxCategory) {
                        setMostRepeatedCategory(maxCategory);
                    } else {
                        setMostRepeatedCategory('No se encontraron categorías en la base de datos.');
                    }
                } else {
                    setMostRepeatedCategory('No se encontraron tickets en la base de datos.');
                }
            })
            .catch((error) => {
                console.error('Error al obtener los tickets:', error);
                setMostRepeatedCategory('Error al obtener los tickets');
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
                    Categoría más repetida  
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {mostRepeatedCategory}
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

