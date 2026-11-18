import { defineConfig } from 'vite';
 
export default defineConfig({
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'index.html',
                produit: 'produit.html',
                galerie: 'Gallery.html',
            },
        },
    },
});