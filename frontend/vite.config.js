import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Determine allowed hosts for preview (Render provides RENDER_EXTERNAL_URL)
const allowedHosts = ['localhost', '127.0.0.1']
const renderUrl = import.meta.env.RENDER_EXTERNAL_URL || import.meta.env.VITE_RENDER_EXTERNAL_URL
if (renderUrl) {
  try {
    const url = new URL(renderUrl)
    allowedHosts.push(url.hostname)
  } catch {
    // ignore invalid URL
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts,
  },
})
