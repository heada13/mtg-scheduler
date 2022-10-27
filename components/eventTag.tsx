import styles from '../styles/Home.module.scss'
import { Event } from '@prisma/client';

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

export const EventTag = ({event}:Props) => {
  const formatId = event.event_format
  const backgroundColor = backgroundColorType[formatId]

  return (
    <>
      <div className={styles.event_tag_container} style={{backgroundColor:backgroundColor}}>
        {event.event_name}
      </div>
    </>
  )
}