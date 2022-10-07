import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useEffect, useState } from 'react'
import format from 'date-fns/format'
import getDate from 'date-fns/getDate'
import getDay from 'date-fns/getDay'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import endOfWeek from 'date-fns/endOfWeek'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
import addMonths from 'date-fns/addMonths'  // 追加
import subMonths from 'date-fns/subMonths'  // 追加
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
// import Modal from './components/modal'
import EventRegistModal from './components/eventRegistModal'
// import { parseISO } from 'date-fns'

const getCalendarArray = (firstDate: Date, lastDate: Date) => {
  const sundays = eachWeekOfInterval({
    start: firstDate,
    end: lastDate
  })
  return sundays.map(sunday =>
    eachDayOfInterval({start: sunday, end: endOfWeek(sunday)})
  )
}

const offsetDate = (date:Date) => {
  const argOffset = date.setHours(date.getHours() + 9)
  const offsetDate = new Date(argOffset)
  const isoDate = offsetDate.toISOString()
  return isoDate
}

const Home: NextPage = () => {
  const [firstDayOfTheMonth, setFirstDay] = useState(startOfMonth(new Date))
  const [lastDayOfTheMonth, setlastDay] = useState(endOfMonth(new Date))
  const [event, setEvent] = useState([])
  const [show, setShow] = useState(false)
  let calendar = getCalendarArray(firstDayOfTheMonth, lastDayOfTheMonth)
  const addMonthsCalendar = async () => {
    setFirstDay(current => addMonths(current,1) )
    setlastDay(current => addMonths(current,1) )
    await getUsers()
    calendar = getCalendarArray(firstDayOfTheMonth,lastDayOfTheMonth)
  }
  const subMonthsCalendar = async () => {
    setFirstDay(current => subMonths(current,1) )
    setlastDay(current => subMonths(current,1) )
    await getUsers()
    calendar = getCalendarArray(firstDayOfTheMonth,lastDayOfTheMonth)
  }
  const currnetMonthsCalendar = async () => {
    setFirstDay(startOfMonth(new Date))
    setlastDay(endOfMonth(new Date))
    await getUsers()
    calendar = getCalendarArray(firstDayOfTheMonth,lastDayOfTheMonth)
  }
  // 表示月のイベント全て取得
  const getUsers =  async () => {
    const firstDate = offsetDate(firstDayOfTheMonth)
    const lastDate = offsetDate(lastDayOfTheMonth)
    const response = await fetch(`/api/events?first=${firstDate}&last=${lastDate}`)
    const events = await response.json()
    setEvent(events)
    console.log("event",event)
  }
  useEffect(() => {
    getUsers()
  },[]);
  return (
    <>
      <div>
        <div className={styles.calendar_menu}>
          <div>
            <button onClick={() => subMonthsCalendar()}>前の月</button>
            <button onClick={() => currnetMonthsCalendar()}>今月</button>
            <button onClick={() => addMonthsCalendar()}>次の月</button>
          </div>
          <div>
            <button onClick={() => setShow(true)}>新規作成</button>
          </div>
        </div>
        {format(firstDayOfTheMonth, 'y年M月')}
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
                  <td key={getDay(date)} className={getDay(date) === 0 ? 
                    `${styles.sunday_cell} ${styles.cell}` : 
                    getDay(date) === 6 ? `${styles.saturday_cell} ${styles.cell}` : 
                    styles.cell } >{getDate(date)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <EventRegistModal show={show} setShow={setShow}/>
      </div>
    </>
  )
}

export default Home
