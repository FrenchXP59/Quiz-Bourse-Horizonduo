import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ Autorise l'URL exacte de ton instance Replit
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "e91a57b4-343e-4878-a3dd-4a295ad56925-00-1ax4rfpuzs6pf.janeway.replit.dev"
    ],
    host: true
  }
});