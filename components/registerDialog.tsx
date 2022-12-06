import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

type Props = {
  props: {
    open: boolean,
    close: any,
    postMemberList: any
  }
}

export const RegisterDialog = ({props}: Props) => {
  const {open, close, postMemberList} = props

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
            このイベントに参加表明をしますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>キャンセル</Button>
          <Button onClick={postMemberList}>参加表明</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}