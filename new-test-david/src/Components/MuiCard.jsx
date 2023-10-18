import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const MuiCard = (props) => {
  return (
    <div>
      {props.details.map((detail, i) => (
        <Card sx={{ maxWidth: 345 }} key={i}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {detail.aula}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {detail.prioridad}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {detail.coordinador}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

// import { Box, Card, CardContent, Typography, Button } from "@mui/material";
// import { useDataProvider } from "react-admin";
// //import { useState, useEffect } from "react";
// import React, { useState } from 'react';

// export const MuiCard = () => {
//   const dataProvider = useDataProvider();
//   const [tickets, setTickets] = useState<any>([]);

//   useEffect(() => {
//     dataProvider
//       .getList("tickets", {
//         pagination: { page: 1, perPage: 1 },
//         sort: { field: "id", order: "ASC" },
//         filter: {},
//       })
//       .then((response) => setTickets(response.data))
//       //.then((data) => setTickets(data))
//       .catch((error) => console.error("Error:al obtener los tickets", error));
//   }, []);

//   return (
//     <Box
//       display="flex"
//       justifyContent="space-between"
//       alignItems="center"
//       borderBottom={`4px solid`}
//       p="15px"
//     >
//       {tickets.map((ticket, i) => (
//         <Box
//           key={`ticket-${i}`}
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           borderBottom={`4px solid`}
//           p="15px"
//         >
//           <Box>
//             <Typography
//               variant="h5"
//               fontWeight="600"
//             >
//               {ticket.aula}
//             </Typography>
//             <Typography>
//               {ticket.coordinador}
//             </Typography>
//           </Box>
//           <Box></Box>
//           <Box p="5px 10px" borderRadius="4px">
//             {ticket.estado}
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// //export default Tickets;
