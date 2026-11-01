import { useEffect } from 'react'

const useIdleTimeout = (onTimeout, timeout = 15 * 60 * 1000, enabled = true) => {
  useEffect(() => {
    if (!enabled) return

    let timer

    const resetTimer = () => {
      clearTimeout(timer)
      timer = setTimeout(onTimeout, timeout)
    }

    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
      'click'
    ]

    events.forEach(event => {
      window.addEventListener(event, resetTimer)
    })

    resetTimer()

    return () => {
      clearTimeout(timer)
      events.forEach(event => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }, [onTimeout, timeout, enabled])
}

export default useIdleTimeout