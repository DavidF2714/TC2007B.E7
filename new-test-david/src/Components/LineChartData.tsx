import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useDataProvider } from 'react-admin';
import { useEffect, useState } from 'react';

export const Prueba = () => {
  const dataProvider = useDataProvider();
  const [chartData, setChartData] = useState<
    {
      id: string;
      color: string;
      data: { x: string; y: number }[];
    }[]>([]);  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  useEffect(() => {
    // Lógica para obtener las tres aulas con más tickets
    dataProvider
      .getList('tickets', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'DESC' },
        filter: { estado: 'Completado' } 
      })
      .then((response) => {
        const tickets = response.data;
        const aulas = tickets.map((ticket) => ticket.aula);
        const aulasUnicas: string[] = Array.from(new Set(aulas));
        // Función para obtener el número de tickets por categoría en un aula específica
        const getCategoryTicketCount = (category: string, aula: string) => {
          const matchingTicket = tickets.find(ticket => ticket.aula === aula && ticket.categoria === category);
          return matchingTicket ? 1 : 0; // Puedes ajustar esto según tus necesidades
        };
        const aulasConTickets = aulasUnicas.map((aula) => {
          const ticketsAula = tickets.filter((ticket) => ticket.aula === aula);
          return {
            aula,
            tickets: ticketsAula.length,
          };
        });
        const aulasConTicketsOrdenadas = aulasConTickets.sort(
          (a, b) => b.tickets - a.tickets
        );
        const aulasConTicketsOrdenadasTop3 = aulasConTicketsOrdenadas.slice(
          0,
          3
        );
        const aulasConTicketsOrdenadasTop3Nombres = aulasConTicketsOrdenadasTop3.map(
          (aula) => aula.aula
        );
        const aulasConTicketsOrdenadasTop3Tickets = aulasConTicketsOrdenadasTop3.map(
          (aula) => aula.tickets
        );
        const chartData = [
          {
            id:"Aula "+ aulasConTicketsOrdenadasTop3Nombres[0],
            color: tokens("dark").greenAccent[500],
            data: [
              {
                x: 'Servicios',
                y: getCategoryTicketCount('Servicios', aulasConTicketsOrdenadasTop3Nombres[0]),
              },
              {
                x: 'Digital',
                y: getCategoryTicketCount('Digital', aulasConTicketsOrdenadasTop3Nombres[0]),
              },
              {
                x: 'Infrestructura',
                y: getCategoryTicketCount('Infrestructura', aulasConTicketsOrdenadasTop3Nombres[0]),
              },
              {
                x: 'RH',
                y: getCategoryTicketCount('Recursos Humanos', aulasConTicketsOrdenadasTop3Nombres[0]),
              },
              {
                x: 'Beneficiario',
                y: getCategoryTicketCount('Beneficiario', aulasConTicketsOrdenadasTop3Nombres[0]),
              },
              {
                x: 'Mobiliario',
                y: getCategoryTicketCount('Mobiliario', aulasConTicketsOrdenadasTop3Nombres[0]),
              },
              {
                x: 'Seguridad',
                y: getCategoryTicketCount('Seguridad', aulasConTicketsOrdenadasTop3Nombres[0]),
              },
              {
                x: 'Materiales',
                y: getCategoryTicketCount('Materiales', aulasConTicketsOrdenadasTop3Nombres[0]),
              },
              {
                x: 'FM',
                y: getCategoryTicketCount('Fenómeno Meteorológico', aulasConTicketsOrdenadasTop3Nombres[0]),
              },
            ],
          },
          {
            id: "Aula "+aulasConTicketsOrdenadasTop3Nombres[1],
            color: tokens("dark").blueAccent[300],
            data: [
              {
                x: 'Servicios',
                y: getCategoryTicketCount('Servicios', aulasConTicketsOrdenadasTop3Nombres[1]),
              },
              {
                x: 'Digital',
                y: getCategoryTicketCount('Digital', aulasConTicketsOrdenadasTop3Nombres[1]),
              },
              {
                x: 'Infrestructura',
                y: getCategoryTicketCount('Infrestructura', aulasConTicketsOrdenadasTop3Nombres[1]),
              },
              {
                x: 'RH',
                y: getCategoryTicketCount('Recursos Humanos', aulasConTicketsOrdenadasTop3Nombres[1]),
              },
              {
                x: 'Beneficiario',
                y: getCategoryTicketCount('Beneficiario', aulasConTicketsOrdenadasTop3Nombres[1]),
              },
              {
                x: 'Mobiliario',
                y: getCategoryTicketCount('Mobiliario', aulasConTicketsOrdenadasTop3Nombres[1]),
              },
              {
                x: 'Seguridad',
                y: getCategoryTicketCount('Seguridad', aulasConTicketsOrdenadasTop3Nombres[1]),
              },
              {
                x: 'Materiales',
                y: getCategoryTicketCount('Materiales', aulasConTicketsOrdenadasTop3Nombres[1]),
              },
              {
                x: 'FM',
                y: getCategoryTicketCount('Fenómeno Meteorológico', aulasConTicketsOrdenadasTop3Nombres[1]),
              },
            ],
          },
          {
            id:"Aula "+ aulasConTicketsOrdenadasTop3Nombres[2],
            color: tokens("dark").redAccent[200],
            data: [
              {
                x: 'Servicios',
                y: getCategoryTicketCount('Servicios', aulasConTicketsOrdenadasTop3Nombres[2]),
              },
              {
                x: 'Digital',
                y: getCategoryTicketCount('Digital', aulasConTicketsOrdenadasTop3Nombres[2]),
              },
              {
                x: 'Infrestructura',
                y: getCategoryTicketCount('Infrestructura', aulasConTicketsOrdenadasTop3Nombres[2]),
              },
              {
                x: 'RH',
                y: getCategoryTicketCount('Recursos Humanos', aulasConTicketsOrdenadasTop3Nombres[2]),
              },
              {
                x: 'Beneficiario',
                y: getCategoryTicketCount('Beneficiario', aulasConTicketsOrdenadasTop3Nombres[2]),
              },
              {
                x: 'Mobiliario',
                y: getCategoryTicketCount('Mobiliario', aulasConTicketsOrdenadasTop3Nombres[2]),
              },
              {
                x: 'Seguridad',
                y: getCategoryTicketCount('Seguridad', aulasConTicketsOrdenadasTop3Nombres[2]),
              },
              {
                x: 'Materiales',
                y: getCategoryTicketCount('Materiales', aulasConTicketsOrdenadasTop3Nombres[2]),
              },
              {
                x: 'FM',
                y: getCategoryTicketCount('Fenómeno Meteorológico', aulasConTicketsOrdenadasTop3Nombres[2]),
              },
            ],
          },
        ];
        setChartData(chartData);
      })
      .catch((error) => {
        console.error('Error al obtener tickets en curso:', error);
      });
  },);
  return (chartData)
};
