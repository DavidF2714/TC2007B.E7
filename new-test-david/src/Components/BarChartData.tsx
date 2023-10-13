import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';

export const Prueba = () => {
    const dataProvider = useDataProvider();
    const [chartData, setChartData] = useState<
      {
        Aula: any;
        Nuevo: number;
        nuevoColor: string;
        "En Curso": number;
        "En CursoColor": string;
        Completado: number;
        completadoColor: string;
      }[]
    >([]);
  
    useEffect(() => {
      dataProvider
        .getList('tickets', {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'id', order: 'DESC' },
            filter: undefined
        })
        .then((response) => {
          const tickets = response.data;
  
          // Función para contar tickets por estado en un aula específica
          const countTicketsByState = (aula: any, estado: string) => {
            return tickets.filter((ticket) => ticket.aula === aula && ticket.estado === estado).length;
          };
  
          // Obtener las aulas únicas
          const aulasUnicas = Array.from(new Set(tickets.map((ticket) => ticket.aula)));
  
          // Ordenar aulas por la cantidad de tickets (de mayor a menor)
          const aulasOrdenadas = aulasUnicas.sort((aulaA, aulaB) => {
            const ticketsA = countTicketsByState(aulaA, 'Completado');
            const ticketsB = countTicketsByState(aulaB, 'Completado');
            return ticketsB - ticketsA;
          });
  
          // Tomar las primeras 7 aulas o menos si hay menos de 7
          const topAulas = aulasOrdenadas.slice(0, 7);
  
          // Construir el array de datos
          const chartData = topAulas.map((aula) => {
            return {
              Aula: "Aula "+aula,
              "Nuevo": countTicketsByState(aula, 'Nuevo'),
              "nuevoColor": "hsl(205, 75%, 75%)",
              "En Curso": countTicketsByState(aula, 'En curso'),
              "En CursoColor": "hsl(55, 75%, 75%)",
              "Completado": countTicketsByState(aula, 'Completado'),
              "completadoColor": "hsl(500, 75%, 75%)",
            };
          });
  
          console.log('Tickets en curso:', chartData)
          setChartData(chartData);
        })
        .catch((error) => {
          console.error('Error al obtener tickets en curso:', error);
        });
    }, []);
  
    return chartData;
  };  