import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {
        https: {
            key: './frontend.key',
            cert: './frontend.cer',
        },
        host: true,
    },
    base: './',
});
