import styles from '../styles/main.module.scss'
import { Event } from '@prisma/client';
// import Link from "next/link";
import { useRouter } from "next/router";
import { inputEventDetail } from '../states/state'
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { EventWithStoreAndFormat } from '../types/types'

// interface Props extends Event {
//   event: Event,
//   formats: {
//     id: number,
//     format_name: string
//   }
// }

type Props = {
  event: EventWithStoreAndFormat
}

type backgroundColorObj = {
  [key:number]: string
}

const backgroundColorType: backgroundColorObj = {
  1:'skyblue',
  2:'gray',
  3:'red',
  4:'orange',
  5:'green',
  6:'purple',
  7:'brown',
  8:'pink',
  9:'yellow'
}

export const EventTag = ({event}: Props) => {
  const formatId = event.event_format
  const backgroundColor = backgroundColorType[formatId]
  // const query = JSON.stringify(event)
  const router = useRouter();
  const setEventDetail: SetterOrUpdater<EventWithStoreAndFormat|null> = useSetRecoilState(inputEventDetail)
  
  const pushEventPage = () => {
    console.log("event",event)
    setEventDetail(event)
    router.push('/eventDetail')
  }

  return (
    <>
      <div className={styles.event_tag_container}>
        <div className={styles.event_tag_format_color}           
            style={{backgroundColor:backgroundColor}}>
        </div>
        <span 
          className={styles.event_tag_text} 
          onClick={pushEventPage}>
          {event.event_name}
        </span>
      </div>
    </>
  )
}