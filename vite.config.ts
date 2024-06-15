import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3005,
        origin: ' http://127.0.0.1:3005',
    },
    resolve: {
        alias: {
            src: '/src',
            components: '/src/components',
            style: '/src/style',
            library: '/src/library',
            store: '/src/store',
            utils: '/src/utils',
            test: '/src/test',
        },
    },
});
