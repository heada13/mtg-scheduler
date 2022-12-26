import { Fragment, useEffect, useRef, useState } from "react"
import TextField from '@mui/material/TextField';
import styles from '../../styles/main.module.scss'
import { Button, IconButton } from "@mui/material";
import { inputMember } from '../../states/state'
import { useRecoilValue } from "recoil";
import { Member } from '@prisma/client';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

type postdataObj = {
  [prop:string]: any
}

const EditProfile = () => {
  const member = useRecoilValue(inputMember)
  const [memberState, setMemberState] = useState<Member|null>()
  const [memberName, setMemberName] = useState<string|undefined>("")
  useEffect(() => {
    setMemberState(member)
    setMemberName(member?.name)
  },[])
  // const [postSnsData, setPostSnsData] = useState({
  //   link: ''
  // })
  const [image, setImage] = useState(null)
  const [objectUrl, setObjeceUrl] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null)
  const [updateFlag, setUpdateFlag] = useState<boolean>(true)
  const uploadedImage = () => {
    inputRef.current?.click()
  }
  const handleChangeImage = (event:any) => {
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0]
      setImage(file)
      setObjeceUrl(URL.createObjectURL(file))
      setUpdateFlag(false)
    }
  }
  const handleChange = (e:any) => {
    setMemberName(e.target.value)
    setUpdateFlag(false)
  }

  const resetProfile = () => {
    setObjeceUrl("")
    if(memberState?.name) {
      setMemberName(memberState.name)
    } else {
      setMemberName("")
    }
    setUpdateFlag(true)
  }

  // s3に画像データを格納してファイル名を取得する関数
  const updateImageFileName = async () => {
    const apiGatewayUrl = process.env.NEXT_PUBLIC_S3_PROFILE_IMAGE_URL || ""
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
    return fileName
  }

  const updateMemberInfomation = async () => {
    let postData: postdataObj = {};
    const id = memberState?.id
    if(!image && !memberName) return
    if(image) {
      const filename = await updateImageFileName()
      postData.image_file_name = filename
    }
    if(memberName) {
      postData.name = memberName
    }
    
    // プロフィール更新内容をdbに登録
    const updateMember = await fetch(`/api/updateMember?id=${id}`, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
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
        : memberState?.image_file_name ?
          <img
          src={memberState?.image_file_name} 
          alt="" 
          className={styles.profile_image} 
          onClick={uploadedImage}/> 
          : <div 
            className={styles.edit_profile_blank_img} 
            onClick={uploadedImage}>
              <AddIcon fontSize="large"/>
            </div>
        }
        <input 
          type="file" 
          accept="image/*"
          hidden
          ref={inputRef}
          onChange={handleChangeImage}
          />
        <TextField
          label="ユーザーネーム"
          value={memberName}
          onChange={handleChange}
          className={styles.edit_profile_user_name}
        />
        <Button onClick={updateMemberInfomation} variant="contained" disabled={updateFlag}>更新</Button>
        {!updateFlag ? <Button onClick={resetProfile} variant="outlined" color="warning" className={styles.reset_profile_button}>変更を取り消す</Button> : ""}
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