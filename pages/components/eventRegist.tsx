import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.scss'
import { Select } from '@chakra-ui/react'
import { Store } from '@prisma/client';

export default function EventRegist () {
  const [stores, setStores] = useState<Store[]>([])
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
      <Select placeholder='店舗選択'>
        {stores.map((store) => (
          <option value={store.id} key={store.id}>{store.store_name}</option>
        ))}
      </Select>
    </>
  )
}