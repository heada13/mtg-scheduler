import { Fragment, useEffect, useState } from 'react'
import styles from '../../styles/Home.module.scss'
import { Store, Format } from '@prisma/client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  show: boolean,
  setShow: (value: boolean |((prevVar: boolean) => boolean)) => void;
}

export default function EventRegistModal ({show, setShow}:Props) {
  const [stores, setStores] = useState<Store[]>([])
  const [store, setStore] = useState("")
  const [formats, setFormats] = useState<Format[]>([])
  const [format, setFormat] = useState("")
  const [eventName, setEventName ] = useState<string>()
  const [date, setDate] = useState<Date|null>(new Date())
  const [open, setOpen] = useState(false);
  const getStores =async () => {
    const response = await fetch('/api/stores')
    const stores = await response.json()
    setStores(stores)
  }
  const getFormats =async () => {
    const response = await fetch('/api/formats')
    const formats = await response.json()
    setFormats(formats)
  }
  const handleChange = (e:any) => {
    setEventName(e.target.value)
  }
  const handleChangeStore = (e:SelectChangeEvent) => {
    setStore(e.target.value)
  }
  const handleChangeFormat = (e:SelectChangeEvent) => {
    setFormat(e.target.value)
  }
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const eventPost = async () => {
    const post = await fetch('/api/eventPost', {
      method: "POST",
      body: JSON.stringify({
        store: store,
        eventName: eventName,
        eventDay: date,
        format: format
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
    console.log("post",post)
    if(post.status === 200) {
      // setShow(false)
      setOpen(true)
    }
  }
  useEffect(() => {
    getStores()
    getFormats()
  },[])
  if(show) {
    return (
      <>
        <div className={styles.overlay}>
          <div className={styles.modal_container}>
            <div className={styles.regist_content}>
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
            </div>
            <div className={styles.regist_content}>
              <TextField
                id="outlined-name"
                label="イベント名"
                value={eventName}
                onChange={handleChange}
                />     
            </div>
            <div className={styles.regist_content}>
              <InputLabel>開催店舗</InputLabel>
              <Select
                value={store}
                label="開催店舗"
                onChange={handleChangeStore}>
                {stores.map((store) => (
                  <MenuItem value={store.id} key={store.id}>{store.store_name}</MenuItem>
                  ))}
              </Select>
            </div>
            <div className={styles.regist_content}>
              <InputLabel>フォーマット</InputLabel>
              <Select
                value={format}
                label="format"
                onChange={handleChangeFormat}>
                {formats.map((format) => (
                  <MenuItem value={format.id} key={format.id}>{format.format_name}</MenuItem>
                  ))}
              </Select>
            </div>
            <div className={styles.button_container}>
              <Button variant='outlined' onClick={() => setShow(false)}>キャンセル</Button>
              <Button variant="contained" onClick={eventPost}>登録</Button>
            </div>
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              message="登録成功"
              action={action}
            />
          </div>
        </div>
      </>
  )}else {
    return <></>
  }
}