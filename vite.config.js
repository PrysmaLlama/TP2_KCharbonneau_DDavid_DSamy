import { defineConfig } from 'vite';
 
export default defineConfig({
    base: '/TP2_KCharbonneau_DDavid_DSamy/',
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