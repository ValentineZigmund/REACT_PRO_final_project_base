import { defineConfig } from 'vite';
import reactSWC from '@vitejs/plugin-react-swc';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [react(), tsconfigPaths(), reactSWC(), svgr()],

	build: {
		outDir: 'dist',
		sourcemap: true,
	},
});
