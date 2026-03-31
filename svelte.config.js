import adapter from '@sveltejs/adapter-static'; // <--- Cambia auto por static
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			// Esto es vital para que carguen las imágenes y estilos en GitHub Pages
			base: process.env.NODE_ENV === 'production' ? '/prueba-actividad-2' : '',
		}
	}
};

export default config;