import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    // Allow Render's forwarded host when using `vite preview` in their environments
    // so preview won't block requests from the deployed domain.
    allowedHosts: ['expense-tracker-1-nwqt.onrender.com'],
  },
})
