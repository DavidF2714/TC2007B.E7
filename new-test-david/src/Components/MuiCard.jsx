import {Box, Card, CardContent, Typography} from '@mui/material'

export const MuiCard = () => {
  return <Box width = '300px'>
        <Card>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>React</Typography> 
                <Typography variant='body2' color='text.secondary'>React (también llamada React. js o ReactJS) es una librería Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página.</Typography>
            </CardContent>
        </Card>
    </Box>
}
