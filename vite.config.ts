import { defineConfig, UserConfigExport } from 'vite'
import externalGlobals from "rollup-plugin-external-globals";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// https://github.com/vitejs/vite/issues/1930#issuecomment-783747858
export default ({ mode }) => {
  const developmentConfig: UserConfigExport = {
    server: {
      port: 8080,
      open: '/index.dev.html',
    }
  }
  const productionConfig: UserConfigExport = {
    build: {
      rollupOptions: {
        plugins: [
          // https://github.com/vitejs/vite/issues/4398
          externalGlobals({
            axios: 'axios',
            react: 'React',
            'react-dom': 'ReactDOM',
          }),
        ],
      }
    }
  }
  const config = mode === 'production'
    ? productionConfig : developmentConfig

  return defineConfig({
    ...config,
    plugins: [react()]
  })
}