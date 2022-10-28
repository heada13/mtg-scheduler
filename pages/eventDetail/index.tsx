import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Event } from '@prisma/client';
import { useRecoilValue } from "recoil";
import { inputEventDetail } from "../../states/eventDetailState";
import { Button } from "@mui/material";

export default function EventDetail(){
  const router = useRouter();
  const [eventData, setEvent] = useState<Event|null>()
  const eventDetailState = useRecoilValue(inputEventDetail)
  // const query =  JSON.parse(Object.keys(router.query)[0])
  useEffect(() => {
    // console.log("event page", query)
    setEvent(eventDetailState)
  },[])

  return (
    <>
      <div>
        <Button onClick={() => router.back()}>戻る</Button>
        <p>{eventData?.id}</p>
        <p>{eventData?.event_name}</p>
      </div>
    </>
  )
}