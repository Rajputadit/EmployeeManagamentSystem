import serverless from 'serverless-http'
import app, { initializeDatabase } from '../../server/app.js'

const expressHandler = serverless(app)
let databaseReady

export const handler = async (event, context) => {
  try {
    databaseReady ??= initializeDatabase().catch((error) => {
      databaseReady = undefined
      throw error
    })
    await databaseReady
    return await expressHandler(event, context)
  } catch (error) {
    console.error('Netlify API request failed:', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'API could not connect to its database. Check Netlify function logs.' })
    }
  }
}
