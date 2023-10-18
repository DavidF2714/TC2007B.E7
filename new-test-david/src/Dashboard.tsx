import { useEffect, useState } from 'react';
import { useDataProvider, usePermissions, useNotify} from 'react-admin';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "./Components/Header";
import LineChart from "./Components/LineChart";
import BarChart from "./Components/BarChart";
import PieChart from "./Components/PieChart";
import StatBox from "./Components/StatBox";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';

export const Dashboard = () => {
  const {permissions} = usePermissions();
  const isCoordinador = permissions.includes('Coordinador');
  const notify = useNotify();

  if(isCoordinador){
    notify('No tiene los permisos para visualizar el Panel de Control',{type:'error'});
    window.location.href='/#/tickets'
    return null;
  }

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
                progress="null"
                increase=""
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
                progress="null"
                increase=""
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
                progress="null"
                increase=""
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
                progress="null"
                increase=""
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
                      {ticket.aula}
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
                Prioridad de Tickets
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <Box height="300px" width="800px" m="-30px 90px 0 0">
                <PieChart isDashboard={true} />
                </Box>
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                </Typography>
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
                Estado de tickets
              </Typography>
              <Box height="370px" width="700px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              padding="30px"
            >
            </Box>
          </Box>
        </Box>
      );
    };

