const request = async (path, options = {}) => {
  const token = localStorage.getItem('authToken')
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  })
  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(result.message || `Request failed (${response.status})`)
  }
  return result
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) })
}
