import styles from '../styles/main.module.scss'
import { Event } from '@prisma/client';
// import Link from "next/link";
import { useRouter } from "next/router";
import { inputEventDetail } from '../states/eventDetailState'
import { SetterOrUpdater, useSetRecoilState } from 'recoil';

type Props = {
  event: Event
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

export const EventTag = ({ event }: Props) => {
  const formatId = event.event_format
  const backgroundColor = backgroundColorType[formatId]
  // const query = JSON.stringify(event)
  const router = useRouter();
  const setEventDetailState: SetterOrUpdater<Event|null> = useSetRecoilState(inputEventDetail)
  
  const pushEventPage = () => {
    setEventDetailState(event)
    router.push('/eventDetail')
  }

  return (
    <>
      {/* <Link href={{pathname:'event', query: query}}> */}
        <div 
          className={styles.event_tag_container} 
          style={{backgroundColor:backgroundColor}}
          onClick={pushEventPage}>
          {event.event_name}
        </div>
      {/* </Link> */}
    </>
  )
}