import 'dotenv/config'
import app, { initializeDatabase } from './app.js'

const port = Number(process.env.PORT ?? 5000)

initializeDatabase()
  .then(() => {
    app.listen(port, '127.0.0.1', () => {
      console.log(`API server listening on http://127.0.0.1:${port}`)
    })
  })
  .catch((error) => {
    console.error('Unable to start API server:', error.message)
    process.exitCode = 1
  })
