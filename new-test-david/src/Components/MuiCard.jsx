import {Box, Card, CardContent, Typography, Button} from '@mui/material'

export const MuiCard = () => {
  return <Box width = '300px'>
    <Card variant="outlined" style={{ marginBottom: "1rem" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Ticket #
        </Typography>
        <Typography color="text.secondary">Aula: </Typography>
        <Typography color="text.secondary">Coordinador: </Typography>
        {/* Add other fields as needed */}
        <Button variant="contained">
          Edit
        </Button>
        <Button variant="contained">
          Delete
        </Button>
      </CardContent>
    </Card>
    </Box>
}
