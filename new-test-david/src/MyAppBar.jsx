import { AppBar, useTheme, ThemeProvider, ToggleThemeButton } from 'react-admin';
import { Button } from '@mui/material';

const ThemeToggler = () => {
    const [theme, setTheme] = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ToggleThemeButton onClick={toggleTheme}>
            {theme === 'dark' ? 'Light theme' : 'Dark theme'}
        </ToggleThemeButton>
    );
}

export const MyAppBar = () => (
    <AppBar toolbar={<ThemeToggler />} />
);