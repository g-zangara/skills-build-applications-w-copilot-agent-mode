import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

export function useCollection(endpoint) {
  const [items, setItems] = useState([])
  const [state, setState] = useState('loading')

  useEffect(() => {
    let active = true
    fetchCollection(endpoint)
      .then((data) => {
        if (active) {
          setItems(data)
          setState('ready')
        }
      })
      .catch(() => active && setState('error'))
    return () => { active = false }
  }, [endpoint])

  return { items, state }
}