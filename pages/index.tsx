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

const getCalendarArray = (firstDate: Date, lastDate: Date) => {
  const sundays = eachWeekOfInterval({
    start: firstDate,
    end: lastDate
  })
  return sundays.map(sunday =>
    eachDayOfInterval({start: sunday, end: endOfWeek(sunday)})
  )
}


const Home: NextPage = () => {
  const [firstDayOfTheMonth, setFirstDay] = useState(startOfMonth(new Date))
  const [lastDayOfTheMonth, setlastDay] = useState(endOfMonth(new Date))
  const getUsers = async () => {
    // const response = await fetch(`/api/authors?first=${firstDayOfTheMonth}&last=${lastDayOfTheMonth}`)
    const response = await fetch(`/api/authors`)
    console.log('response',response)
    const users = response.json()
    console.log(users)
    // setUsers(users)
  }
  useEffect(() => {
    getUsers()
  }, []);
  const [targetDate, setTargetDate] = useState(new Date())  // 変更
  const calendar = getCalendarArray(firstDayOfTheMonth, lastDayOfTheMonth)
  return (
    <>
      <div>
        <div>
          <button onClick={() => setTargetDate(current => subMonths(current, 1))}>前の月</button>
          <button onClick={() => setTargetDate(new Date())}>今月</button>
          <button onClick={() => setTargetDate(current => addMonths(current, 1))}>次の月</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((weekRow, rowNum) => (
              <tr key={rowNum}>
                {weekRow.map(date => (
                  <td key={getDay(date)} className={styles.calendar_cell}>{getDate(date)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home
