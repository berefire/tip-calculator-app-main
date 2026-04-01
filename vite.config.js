import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    base: "/tip-calculator-app-main/",
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),

            "@styles": path.resolve(__dirname, 'src/styles'),
            "@tokens": path.resolve(__dirname, 'src/styles/tokens'),
            "@base": path.resolve(__dirname, "src/styles/base"),
            "@utilities": path.resolve(__dirname, "src/styles/utilities"),
            "@components": path.resolve(__dirname, "src/styles/components"),
            "@layout": path.resolve(__dirname, "src/styles/layout"),
            "@states": path.resolve(__dirname, "src/styles/states"),

            "@js": path.resolve(__dirname, 'src/js'),
            "@assets": path.resolve(__dirname, 'src/assets'),
        },
    },
});
            