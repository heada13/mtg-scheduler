import { Fragment, useRef, useState } from "react"
import TextField from '@mui/material/TextField';
import styles from '../../styles/main.module.scss'
import ImageIcon from '@mui/icons-material/Image';
import { Button, IconButton } from "@mui/material";
import { inputMember } from '../../states/state'
import { useRecoilValue } from "recoil";
import { Member } from '@prisma/client';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

const EditProfile = () => {
  const member = useRecoilValue(inputMember)
  const [memberName, setMemberName] = useState<string>("")
  const [postSnsData, setPostSnsData] = useState({
    link: ''
  })
  const [image, setImage] = useState(null)
  const [objectUrl, setObjeceUrl] = useState<string>("")
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadedImage = () => {
    inputRef.current?.click()
  }
  const setImageOnState = (event:any) => {
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0]
      setImage(file)
      setObjeceUrl(URL.createObjectURL(file))
    }
  }
  const handleChange = (e:any) => {
    setMemberName(e.target.value)
  }

  const apiGatewayUrl = process.env.NEXT_PUBLIC_S3_PROFILE_IMAGE_URL || ""
  const updateMemberInfomation = async () => {
    // s3に画像データを格納してファイル名を取得
    const imageFileName = await fetch(apiGatewayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: image,
    })
    const json = await imageFileName.json()
    const body = JSON.parse(json.body)
    const fileName = body.filename

    // プロフィール更新内容をdbに登録
    const postData = {
      id: member?.id,
      name: memberName,
      image_file_name: fileName
    }
    const updateMember = await fetch("/api/updateMember", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
    console.log("member", updateMember)
    if(updateMember.status === 200) {
      setOpen(true)
    }
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <>
      <div className={styles.edit_profile_container}>
        {!!objectUrl
        ? <img 
          src={objectUrl} 
          alt="プロフィール画像" 
          className={styles.edit_profile_uploaded_img}
          onClick={uploadedImage}/>
        : <div 
          className={styles.edit_profile_blank_img} 
          onClick={uploadedImage}> 
          </div>
        }
        <input 
          type="file" 
          accept="image/*"
          hidden
          ref={inputRef}
          onChange={setImageOnState}
          />
        <TextField
          label="アカウント名"
          value={memberName}
          onChange={handleChange}
        />
        <Button onClick={updateMemberInfomation}>更新</Button>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message="登録成功"
          action={action}
        />
      </div>
    </>
  )
}

export default EditProfile