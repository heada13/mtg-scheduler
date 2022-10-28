import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Event } from '@prisma/client';
import { useRecoilValue } from "recoil";
import { inputEventDetail } from "../../states/eventDetailState";
import { Button, Snackbar } from "@mui/material";

export default function EventDetail(){
  const router = useRouter();
  const [eventData, setEvent] = useState<Event|null>()
  const [open, setOpen] = useState(false);
  const eventDetailState = useRecoilValue(inputEventDetail)
  // const query =  JSON.parse(Object.keys(router.query)[0])
  useEffect(() => {
    // console.log("event page", query)
    setEvent(eventDetailState)
  },[])
  const postMemberList = async () => {
    // const postData = {
    //   event_id: ,
    //   member_id: 
    // }
    const post = await fetch('/api/postMemberList', {
      method: "POST",
      // body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      }
    })
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
      <div>
        <Button onClick={() => router.back()}>戻る</Button>
        <p>{eventData?.id}</p>
        <p>{eventData?.event_name}</p>
      </div>
    </>
  )
}