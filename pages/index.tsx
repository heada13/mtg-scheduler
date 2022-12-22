import type { NextPage } from 'next'
import { Event, Member } from '@prisma/client'
import getMonth from 'date-fns/getMonth'
import styles from '../styles/main.module.scss'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import format from 'date-fns/format'
import getDate from 'date-fns/getDate'
import getDay from 'date-fns/getDay'
import subHours from 'date-fns/subHours'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import endOfWeek from 'date-fns/endOfWeek'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import EventRegistModal from '../components/eventRegistModal'
import Button from '@mui/material/Button'
import { EventTag } from '../components/eventTag'
import { useAuthContext } from "../lib/authContext"
import { inputMember, inputEventDetail, inputEventsByDate } from '../states/state'
import { SetterOrUpdater, useSetRecoilState, useRecoilState } from 'recoil'
import { EventWithStoreAndFormat } from '../types/types'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { StayCurrentLandscapeSharp } from '@mui/icons-material'

const getCalendarArray = (firstDate: Date, lastDate: Date) => {
  const sundays = eachWeekOfInterval({
    start: firstDate,
    end: lastDate
  })
  return sundays.map(sunday =>
    eachDayOfInterval({start: sunday, end: endOfWeek(sunday)})
  )
}

const formatDate = (date:Date) => {
  // const argOffset = date.setHours(date.getHours() + 9)
  // const offsetDate = new Date(argOffset)
  const isoDate = date.toISOString()
  return isoDate
}

const offsetTime = () => {
  const now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000))
  return now
}

const Home: NextPage = () => {
  const [firstDayOfTheMonth, setFirstDay] = useState(startOfMonth(offsetTime()))
  const [lastDayOfTheMonth, setlastDay] = useState(endOfMonth(offsetTime()))
  const [eventByDay, setEventByDay] = useState<EventWithStoreAndFormat[][]>([[]])
  const [show, setShow] = useState(false)
  const [calendar, setCalendar] = useState(getCalendarArray(firstDayOfTheMonth, lastDayOfTheMonth))
  const [open, setOpen] = useState<boolean>(false)
  const { user } = useAuthContext()
  const router = useRouter();
  const setMember: SetterOrUpdater<Member|null> = useSetRecoilState(inputMember)
  const addMonthsCalendar = async () => {
    const addMonthFirstDay = addMonths(firstDayOfTheMonth,1)
    setFirstDay(addMonthFirstDay)
    const addMonthLastDay = addMonths(lastDayOfTheMonth,1)
    setlastDay(addMonthLastDay)
    const addMonthCalendar = getCalendarArray(addMonthFirstDay,addMonthLastDay)
    setCalendar(addMonthCalendar)
    await getEvents(addMonthFirstDay,addMonthLastDay)
  }
  const subMonthsCalendar = async () => {
    const subMonthFirstDay = subMonths(firstDayOfTheMonth,1)
    setFirstDay(subMonthFirstDay)
    const subMonthLastDay = subMonths(lastDayOfTheMonth,1)
    setlastDay(subMonthLastDay)
    const subMonthCalendar = getCalendarArray(subMonthFirstDay,subMonthLastDay)
    setCalendar(subMonthCalendar)
    await getEvents(subMonthFirstDay, subMonthLastDay)
  }
  const currnetMonthsCalendar = async () => {
    const currentMonthFirstDay = startOfMonth(offsetTime())
    setFirstDay(currentMonthFirstDay)
    const currentMonthLastDay = endOfMonth(offsetTime())
    setlastDay(currentMonthLastDay)
    const nowCalendar = getCalendarArray(currentMonthFirstDay,currentMonthLastDay)
    setCalendar(nowCalendar)
    await getEvents(currentMonthFirstDay, currentMonthLastDay)
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const eventByDateList = (events:EventWithStoreAndFormat[]) => {
    // 31日分の空のデータを生成
    const listByDate = new Array(31)
    // 初期値に空のリストを格納
    for(let i = 0; i < listByDate.length; i++){
      listByDate[i] = []
    }
    events.forEach((el:EventWithStoreAndFormat) => {
      const date = new Date(el.event_day)
      const eventDate = getDate(subHours(new Date(el.event_day),9))
      listByDate[eventDate].push(el)
    })
    setEventByDay(listByDate)
  }
  // 表示月のイベント全て取得
  const getEvents =  async (firstDate:Date,lastDate:Date ) => {
    const formatfirstDate = formatDate(firstDate)
    const formatlastDate = formatDate(lastDate)
    const response = await fetch(`/api/events?first=${formatfirstDate}&last=${formatlastDate}`)
    const events = await response.json()
    eventByDateList(events)
  }
  const getMember = async () => {
    if (!user) return
    const uid = user.uid
    const response = await fetch(`/api/getMember?uid=${uid}`)
    const member = await response.json()
    setMember(member[0])
  }

  // const setEventsByDate = useSetRecoilState(inputEventsByDate)
  // const setSelected = (list: EventWithStoreAndFormat[]) => setEventsByDate(list)
  const [eventsByDate, setEventsByDate] = useRecoilState(inputEventsByDate)

  const clickHandler = (date: number) => {
    setEventsByDate(eventByDay[date])
    router.push('/calendarEventList')
  }
  
  const today = getDate(new Date())

  useEffect(() => {
    getEvents(startOfMonth(offsetTime()), endOfMonth(offsetTime()))
  },[]);
  useEffect(() => {
    getMember()
  },[user])
  return (
    <>
      <EventRegistModal show={show} setShow={setShow}/>
      <div>
        {/* <Header /> */}
        <main className={styles.main}>
          <div className={styles.calendar_main}>
            <div className={styles.calendar_header}>
              <h1>
                {format(firstDayOfTheMonth, 'y年M月')}
              </h1>
              <div className={styles.calendar_menu}>
                {/* <div> */}
                  <Button onClick={() => subMonthsCalendar() } variant="contained" className={`${styles.calendar_menu_button}`}><KeyboardArrowLeftIcon/></Button>
                  <Button onClick={() => currnetMonthsCalendar()} variant="contained" className={`${styles.calendar_menu_button} ${styles.calendar_menu_button_center}`}>今日</Button>
                  <Button onClick={() => addMonthsCalendar()} variant="contained" className={`${styles.calendar_menu_button}`}><KeyboardArrowRightIcon/></Button>
                {/* </div> */}
                {/* <div>
                  <button onClick={() => setShow(true)}>新規作成</button>
                </div> */}
              </div>
            </div>
            <table className={styles.calendar_container}>
              <thead>
                <tr>
                  <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
                </tr>
              </thead>
              <tbody>
                {calendar.map((weekRow, rowNum) => (
                  <tr key={rowNum}>
                    {weekRow.map(date => (
                      <td key={getDay(date)} className={styles.cell} >
                        <div onClick={() => clickHandler(getDate(date))} className={getDate(date) === today ? `${styles.today}` : ''}>
                          {getDate(date)}
                        </div>
                        <div className={styles.calendar_event}>
                        {eventByDay[getDate(date)]?.map( event => (
                          getMonth(date) === getMonth(new Date(event.event_day)) &&
                          (<EventTag key={event.id} event={event}></EventTag>)
                          ))}
                        </div>
                        </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
