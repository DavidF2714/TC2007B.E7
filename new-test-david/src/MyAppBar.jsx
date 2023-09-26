import { AppBar, useTheme } from 'react-admin';
import { Button } from '@mui/material';


const ThemeToggler = () => {
    const [theme, setTheme] = useTheme();


    return (
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : +'light')}>
            +{theme === 'dark' ? 'Light theme' : 'Dark theme'}
        </Button>
    );
}


export const MyAppBar = () => (
    <AppBar toolbar={<ThemeToggler />} />
);
