import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.scss'
import { Store } from '@prisma/client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function EventRegist () {
  const [stores, setStores] = useState<Store[]>([])
  const [store, setStore] = useState("")
  const [eventName, setEventName ] = useState<string>()
  const [date, setDate] = useState<Date|null>(new Date())
  const getStores =async () => {
    const response = await fetch('/api/stores')
    const stores = await response.json()
    setStores(stores)
  }
  const handleChange = (e:any) => {
    setEventName(e.taxrget.value)
  }
  const handleChangeStore = (e:SelectChangeEvent) => {
    setStore(e.target.value)
  }
  // const changeDateHandler = (date: Date|null):void => {
  //   setDate(date)
  // }
  useEffect(() => {
    getStores()
  },[])
  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDateTimePicker
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            onError={console.log}
            renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        <TextField
          id="outlined-name"
          label="Name"
          value={eventName}
          onChange={handleChange}
        />     
        <Select
          value={store}
          // label="Age"
          onChange={handleChangeStore}>
          {stores.map((store) => (
            <MenuItem value={store.id} key={store.id}>{store.store_name}</MenuItem>
            ))}
        </Select>
    </>
  )
}