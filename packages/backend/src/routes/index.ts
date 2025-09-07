import { Application } from 'express'
import ttsRoutes from './tts.route'
import history from 'connect-history-api-fallback'
import { healthHandler } from '../middleware/health.middleware'

export function setupRoutes(app: Application): void {
  app.use('/api/v1/tts', ttsRoutes)
  app.use('/api/health', healthHandler)

  // New login endpoint
  app.post('/api/login', (req, res) => {
    const { allowCode } = req.body;
    if (allowCode === process.env.ALLOW_CODE) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid ALLOW_CODE' });
    }
  });

  app.use(history())
}
