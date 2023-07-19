import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    build: {
        target: 'modules',
        outDir: 'dist',
        assetsDir: '.',
        minify: true,
        sourcemap:  'source-map',
        rollupOptions: {
            input: './src/widget.js',
            output: {
                entryFileNames: 'app.js',
                format: 'amd',
            },
        },
    },
    plugins: [vue()],
});
