import { Suspense, useEffect, useState } from "react"
import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import Paper from '@mui/material/Paper';
import { useRecoilState, useRecoilValue } from "recoil";
import { inputEventsByDate } from "../../states/state";
import styles from '../../styles/main.module.scss'
import { EventWithStoreAndFormat } from "../../types/types";
import { useRouter } from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CalendarEventList = () => {
  const router = useRouter()
  const EventsByDate = useRecoilValue(inputEventsByDate)
  const [eventsList, setEventsList] = useState<EventWithStoreAndFormat[]>()
  useEffect(() => {
    setEventsList(EventsByDate)
  },[EventsByDate])
  return (
    <>
      <div className={styles.event_list_container}>
        <div className={styles.back_button_container}>
          <ArrowBackIcon onClick={() => router.back()}></ArrowBackIcon>
          <Button onClick={() => router.back()}>戻る</Button>
        </div>
      {/* <Suspense fallback={<CircularProgress/>}> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {eventsList?.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.stores.store_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.event_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.event_day}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      {/* </Suspense> */}
      </div>
    </>
  )
}

export default CalendarEventList