import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Mets ici exactement le nom du host bloqué
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "ac33bcb7-30c1-47a4-aa97-7205aca9d3d6-00-1kor9zkqoyb3.janeway.replit.dev"
    ],
    host: true // important pour Replit
  }
})