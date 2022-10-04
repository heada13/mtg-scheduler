import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.scss'

export default function EventRegist () {
  const [stores, setStores] = useState([])
  const getStores =async () => {
    const response = await fetch('/api/stores')
    const stores = await response.json()
    setStores(stores)
  }
  useEffect(() => {
    getStores()
  },[])
  return (
    <>

    </>
  )
}