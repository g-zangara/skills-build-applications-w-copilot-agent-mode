import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

export function useCollection(resource) {
  const [items, setItems] = useState([])
  const [state, setState] = useState('loading')

  useEffect(() => {
    let active = true
    fetchCollection(resource)
      .then((data) => {
        if (active) {
          setItems(data)
          setState('ready')
        }
      })
      .catch(() => active && setState('error'))
    return () => { active = false }
  }, [resource])

  return { items, state }
}