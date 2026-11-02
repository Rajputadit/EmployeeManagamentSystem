import app, { initializeDatabase } from './app.js'

const port = Number(process.env.PORT ?? 5000)
const host = '0.0.0.0'

initializeDatabase()
  .then(() => {
    app.listen(port, host, () => {
      console.log(`API server listening on ${host}:${port}`)
    })
  })
  .catch((error) => {
    console.error('Unable to start API server:', error.message)
    process.exitCode = 1
  })
