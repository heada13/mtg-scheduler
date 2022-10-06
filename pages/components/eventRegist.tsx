import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Home.module.scss'
import { Select, Input } from '@chakra-ui/react'
import { Store } from '@prisma/client';
import { DateTimePicker } from '@mui/x-date-pickers';
import DateFnsUtils from '@date-io/date-fns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

export default function EventRegist () {
  const [stores, setStores] = useState<Store[]>([])
  const [eventName, setEventName ] = useState<string>()
  const [date, setDate] = useState<Date|null>(new Date())
  const getStores =async () => {
    const response = await fetch('/api/stores')
    const stores = await response.json()
    setStores(stores)
  }
  const handleChange = (e:any) => {
    setEventName(e.target.value)
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
      <Input 
      placeholder='イベント名を入力してください' 
      value={eventName}
      onChange={handleChange}
      className={styles.regist_content}>
      </Input>
      <Select placeholder='店舗選択'>
        {stores.map((store) => (
          <option value={store.id} key={store.id}>{store.store_name}</option>
          ))}
      </Select>
    </>
  )
}