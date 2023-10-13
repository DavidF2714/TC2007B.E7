import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';

export const PieChartDataProvider = () => {
  const dataProvider = useDataProvider();
  const [pieChartData, setPieChartData] = useState<
    {
      id: string;
      label: string;
      value: number;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    dataProvider
      .getList('tickets', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'DESC' },
        filter: undefined,
      })
      .then((response) => {
        const tickets = response.data;

        // Función para contar tickets por prioridad
        const countTicketsByPriority = (priority: string) => {
          return tickets.filter((ticket) => ticket.prioridad === priority).length;
        };

        // Construir el array de datos para la PieChart
        const pieChartData = [
          {
            id: 'Alto',
            label: 'Alto',
            value: countTicketsByPriority('alto'),
            color: 'hsl(0, 75%, 75%)',
          },
          {
            id: 'Medio',
            label: 'Medio',
            value: countTicketsByPriority('medio'),
            color: 'hsl(120, 75%, 75%)',
          },
          {
            id: 'Bajo',
            label: 'Bajo',
            value: countTicketsByPriority('bajo'),
            color: 'hsl(240, 75%, 75%)',
          },
        ];

        console.log('Datos para la PieChart:', pieChartData);
        setPieChartData(pieChartData);
      })
      .catch((error) => {
        console.error('Error al obtener datos para la PieChart:', error);
      });
  }, []);

  return pieChartData;
};
