import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "./mockData";
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

  useEffect(() => {
    // Lógica para obtener las aulas con más tickets
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

        const getCategoryTicketCount = (category: string, aula: string) => {
          const matchingTicket = tickets.find(ticket => ticket.aula === aula && ticket.categoria === category);
          return matchingTicket ? 1 : 0; // Puedes ajustar esto según tus necesidades
        };

        // Obtén las 5 aulas con más tickets
        const aulasConTicketsOrdenadas = aulasUnicas
          .map((aula) => ({
            aula,
            tickets: tickets.filter((ticket) => ticket.aula === aula).length,
          }))
          .sort((a, b) => b.tickets - a.tickets)
          .slice(0, 5);

        // Crea objetos para cada aula con colores
        const chartData = aulasConTicketsOrdenadas.map((aulaInfo, index) => {
          const colorNumber = index % 3; // Alterna entre 0, 1 y 2 para green, blue y red
          const color = `tokens("dark").${
            colorNumber === 0
              ? "greenAccent"
              : colorNumber === 1
              ? "blueAccent"
              : "redAccent"
          }[500]`;
          const data = [
            {
              x: 'Servicios',
              y: getCategoryTicketCount('Servicios', aulaInfo.aula),
            },
            {
              x: 'Digital',
              y: getCategoryTicketCount('Digital', aulaInfo.aula),
            },
            {
              x: 'Infraestructura',
              y: getCategoryTicketCount('Infraestructura', aulaInfo.aula),
            },
            {
              x: 'Recursos Humanos',
              y: getCategoryTicketCount('Recursos Humanos', aulaInfo.aula),
            },
            {
              x: 'Beneficiario',
              y: getCategoryTicketCount('Beneficiario', aulaInfo.aula),
            },
            {
              x: 'Mobiliario',
              y: getCategoryTicketCount('Mobiliario', aulaInfo.aula),
            },
            {
              x: 'Seguridad',
              y: getCategoryTicketCount('Seguridad', aulaInfo.aula),
            },
            {
              x: 'Materiales',
              y: getCategoryTicketCount('Materiales', aulaInfo.aula),
            },
            {
              x: 'Fenómeno Meteorológico',
              y: getCategoryTicketCount('Fenómeno Meteorológico', aulaInfo.aula),
            },
          ];
          return {
            id: "Aula " + aulaInfo.aula,
            color,
            data,
          };
        });

        console.log('chartData:', chartData);
        setChartData(chartData);
      })
      .catch((error) => {
        console.error('Error al obtener tickets en curso:', error);
      });
  }, []);

  return chartData;
};




