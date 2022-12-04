import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { Event } from '@prisma/client';
import { useRecoilValue } from "recoil";
import { inputEventDetail, inputMember } from "../../states/eventDetailState";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Snackbar } from "@mui/material";
import styles from '../../styles/main.module.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { tagColor } from '../../const/tagColor'
import { EventWithStoreAndFormat } from '../../types/returnType'

export default function EventDetail(){
  const formatTagColor = { tagColor }
  const router = useRouter();
  const [eventData, setEvent] = useState<EventWithStoreAndFormat>()
  const [bgColor, setBgColor] = useState<string>()
  const [open, setOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [regist, setRegist] = useState<boolean>(false)
  const eventDetailState = useRecoilValue(inputEventDetail)!
  const memberState = useRecoilValue(inputMember)
  useEffect(() => {
    // console.log("event page", query)
    // if(eventDetailState) {
      getRegistState()
      setEvent(eventDetailState)
    // }
      const formatId = eventDetailState!.event_format
      setBgColor(formatTagColor.tagColor[formatId])
  },[])
  const getRegistState = async () => {
    const memberID = memberState?.id
    const eventID = eventDetailState?.id
    const response = await fetch(`/api/getMemberList?member=${memberID}&event=${eventID}`)
    const eventRegisted = await response.json()
    console.log("regist",eventRegisted)
    if(eventRegisted) {
      setRegist(true)
    }
  }

  const postMemberList = async () => {
    const postData = {
      event_id: eventData?.id,
      member_id: memberState?.id
    }
    console.log("member",memberState)
    const post = await fetch('/api/postMemberList', {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      }
    })
    setDialogOpen(false)
    if(post.status === 200) {
      // setShow(false)
      setOpen(true)
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="登録成功"
      />
      <Dialog
        open={dialogOpen}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            このイベントに参加表明をしますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setDialogOpen(false)}>キャンセル</Button>
          <Button onClick={postMemberList}>参加表明</Button>
        </DialogActions>
      </Dialog>
      <div className={styles.event_detail_container}>
        <div className={styles.event_detail_button}>
          <div className={styles.event_detail_back_button}>
            <ArrowBackIcon onClick={() => router.back()}></ArrowBackIcon>
            <Button onClick={() => router.back()}>戻る</Button>
          </div>
          {
            regist ?
            <Button variant="contained" color="warning" onClick={() => setDialogOpen(true)}>登録削除</Button> :
            <Button variant="contained" onClick={() => setDialogOpen(true)}>参加表明</Button> 
          } 
        </div>
        <label htmlFor="">イベント名</label>
        <h1>{eventData?.event_name}</h1>
        <div className={styles.event_detail_format_tag} style={{backgroundColor:bgColor}}>{eventData?.formats.format_name}</div>
        { regist && <p>あなたはこのイベントに参加表明済みです</p>}
      </div>
    </>
  )
}