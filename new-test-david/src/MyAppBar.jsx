import { AppBar, useTheme, ThemeProvider } from 'react-admin';
import { Button } from '@mui/material';

const ThemeToggler = () => {
    const [theme, setTheme] = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <Button onClick={toggleTheme}>
            {theme === 'dark' ? 'Light theme' : 'Dark theme'}
        </Button>
    );
}

export const MyAppBar = () => (
    <AppBar toolbar={<ThemeToggler />} />
);