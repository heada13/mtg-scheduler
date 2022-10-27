import { Fragment, useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
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
import { Modal } from '@mui/material';

type Props = {
  show: boolean,
  setShow: (value: boolean |((prevVar: boolean) => boolean)) => void;
}

type Post = {
  date: Date,
  eventName: string|null,
  format: number|null,
  store: number|null
}

export default function EventRegistModal ({show, setShow}:Props) {
  const [stores, setStores] = useState<Store[]>([])
  const [formats, setFormats] = useState<Format[]>([])
  const [postData, setPostData] = useState<Post>({
    date: new Date,
    eventName: '',
    format: null,
    store: null
  })
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
    setPostData((pre) => ({...pre, eventName: e.target.value}))
  }
  const handleChangeStore = (e:any) => {
    setPostData((pre) => ({...pre, store: e.target.value}))
  }
  const handleChangeFormat = (e:any) => {
    setPostData((pre) => ({...pre, format: e.target.value}))
  }
  const handleChangeDate = (e:any) => {
    setPostData((pre) => ({...pre, date: e}))
  }
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const offsetDate = (date:Date) => {
    const argOffset = date?.setHours(date?.getHours() + 9)
    const offset = new Date(argOffset)
    return offset
  }
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
    const offset = offsetDate(postData.date)
    setPostData((pre) => ({...pre, date: offset}))
    const post = await fetch('/api/eventPost', {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      }
    })
    if(post.status === 200) {
      // setShow(false)
      setOpen(true)
    }
  }
  useEffect(() => {
    getStores()
    getFormats()
  },[])
  // if(show) {
    return (
      <>
        <Modal 
          open={show}
          onClose={setShow}>
        {/* <div className={styles.overlay}> */}
          <div className={styles.modal_container}>
            <div className={styles.regist_content}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  value={postData.date}
                  onChange={handleChangeDate}
                  onError={console.log}
                  renderInput={(params) => <TextField {...params} />}
                  />
              </LocalizationProvider>
            </div>
            <div className={styles.regist_content}>
              <TextField
                id="outlined-name"
                label="イベント名"
                value={postData.eventName}
                onChange={handleChange}
                />     
            </div>
            <div className={styles.regist_content}>
              <InputLabel>開催店舗</InputLabel>
              <Select
                value={postData.store}
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
                value={postData.format}
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
        {/* </div> */}
        </Modal>
      </>
    )
  // )}else {
  //   return <></>
  // }
}