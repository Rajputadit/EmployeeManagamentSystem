import jwt from 'jsonwebtoken'

export const authenticate = (requiredRole) => (request, response, next) => {
  const authorization = request.get('authorization')
  const token = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : null

  if (!token) {
    return response.status(401).json({ message: 'Authentication required' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if (requiredRole && payload.role !== requiredRole) {
      return response.status(403).json({ message: 'You do not have permission to do this' })
    }

    request.auth = { id: payload.sub, role: payload.role }
    return next()
  } catch {
    return response.status(401).json({ message: 'Session expired. Please log in again.' })
  }
}
