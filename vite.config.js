import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [inject({   
    $: 'jquery',
    jQuery: 'jquery',
  }), react()],
  server: {
    port: 3000,
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
    }
  }
})
