import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

type Props = {
  props: {
    open: boolean,
    close: any,
    deleteMemberList: any
  }
}

export const UnregisterDialog = ({props}: Props) => {
  const {open, close, deleteMemberList} = props

  const closeDialog = () => {
    close()
  }

  return (
    <>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            このイベントに参加表明を取り消しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>キャンセル</Button>
          <Button onClick={deleteMemberList}>取り消す</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}