import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { MemberList, Member } from '@prisma/client';
import { useRecoilValue } from "recoil";
import { inputEventDetail, inputMember } from "../../states/state";
import { Button, CircularProgress, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import styles from '../../styles/main.module.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { tagColor } from '../../const/tagColor'
import { EventWithStoreAndFormat } from '../../types/returnType'
import { UnregisterDialog } from '../../components/unregisterDialog'
import { RegisterDialog } from '../../components/registerDialog'
import { Box } from "@mui/system";

export default function EventDetail(){
  const formatTagColor = { tagColor }
  const router = useRouter();
  const [eventData, setEvent] = useState<EventWithStoreAndFormat>()
  const [bgColor, setBgColor] = useState<string>()
  const [open, setOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [unregisterDialogOpen, setUnregistDialogOpen] = useState<boolean>(false)
  const [regist, setRegist] = useState<boolean>(false)
  const [memberList, setMembersList] = useState<Member[]>([])
  const eventDetailState = useRecoilValue(inputEventDetail)!
  const memberState = useRecoilValue(inputMember)
  useEffect(() => {
    // console.log("event page", query)
    // if(eventDetailState) {
      getRegistState()
      getMemberList()
      setEvent(eventDetailState)
    // }
      const formatId = eventDetailState!.event_format
      setBgColor(formatTagColor.tagColor[formatId])
  },[])
  const getRegistState = async () => {
    const postData = {
      event_id: eventData?.id,
      member_id: memberState?.id
    }
    const response = await fetch('/api/getRegisterState', {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      }
    })
    const eventRegisted = await response.json()
    if(eventRegisted.length) {
      setRegist(true)
    } else {
      setRegist(false)
    }
  }
  const getMemberList = async () => {
    const id = eventData?.id
    const response = await fetch(`/api/getMemberList?event_id=${id}`)
    const memberList = await response.json()
    console.log("list",memberList)
    setMembersList(memberList)
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
      setOpen(true)
    }
    getRegistState()
    getMemberList()
  }
  const deleteMemberList = async () => {
    const postData = {
      event_id: eventData?.id,
      member_id: memberState?.id
    }
    console.log("member",postData)
    const post = await fetch('/api/deleteMemberList', {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      }
    })
    setUnregistDialogOpen(false)
    if(post.status === 200) {
      // setShow(false)
      setOpen(true)
    }
    getRegistState()
    getMemberList()
  }
  
  const handleClose = () => {
    setOpen(false)
  }
  const handleCloseRegisterDialog = () => {
    setDialogOpen(false)
  }
  const handleCloseUnregisterDialog = () => {
    setUnregistDialogOpen(false)
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="登録成功"
      />
      <RegisterDialog
      props={{
        open: dialogOpen,
        close: handleCloseRegisterDialog,
        postMemberList: postMemberList
      }}
      />
      <UnregisterDialog
      props={{
        open: unregisterDialogOpen,
        close: handleCloseUnregisterDialog,
        deleteMemberList: deleteMemberList   
      }}
      />
      <div className={styles.event_detail_container}>
        <div className={styles.event_detail_button}>
          <div className={styles.back_button_container}>
            <ArrowBackIcon onClick={() => router.back()}></ArrowBackIcon>
            <Button onClick={() => router.back()}>戻る</Button>
          </div>
          {
            regist ?
            <Button variant="contained" color="warning" onClick={() => setUnregistDialogOpen(true)}>登録削除</Button> :
            <Button variant="contained" onClick={() => setDialogOpen(true)}>参加表明</Button> 
          } 
        </div>
        <label htmlFor="">イベント名</label>
        <h1>{eventData?.event_name}</h1>
        <div className={styles.event_detail_format_tag} style={{backgroundColor:bgColor}}>{eventData?.formats.format_name}</div>
        { regist && <p>あなたはこのイベントに参加表明済みです</p>}
        <Suspense fallback={<CircularProgress />}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {memberList.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img src={row.image_file_name} alt="profile-image" className={styles.event_detail_profile_img}/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Suspense>
      </div>
    </>
  )
}