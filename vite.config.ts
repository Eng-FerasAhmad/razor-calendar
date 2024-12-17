import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        dts({
            include: ['src/**/*'],
            exclude: ['**/*.stories.tsx', '**/*.stories.ts'],
        }),
    ],
    build: {
        lib: {
            entry: resolve('src', 'index.ts'),
            name: 'razor-icon-library',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        sourcemap: true,
        emptyOutDir: true,
    },
    server: {
        port: 3005,
        origin: ' http://127.0.0.1:3005',
    },
    resolve: {
        alias: {
            src: '/src',
            components: '/src/components',
            calendar: '/src/components/calendar',
            month: '/src/components/calendar/month',
            week: '/src/components/calendar/week',
            day: '/src/components/calendar/day',
            toolbar: '/src/components/calendar/toolbar',
            agenda: '/src/components/calendar/agenda',
            style: '/src/style',
            library: '/src/library',
            context: '/src/calendar/context',
            utils: '/src/utils',
            test: '/src/test',
            types: '/src/types',
        },
    },
});
