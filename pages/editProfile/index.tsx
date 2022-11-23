import { useRef, useState } from "react"
import TextField from '@mui/material/TextField';
import styles from '../../styles/main.module.scss'
import ImageIcon from '@mui/icons-material/Image';
import { Button } from "@mui/material";

type Post = {
  name: string
}

const EditProfile = () => {
  const [postProfileData, setPostProfileData] = useState<Post>({
    name: ''
  })
  const [postSnsData, setPostSnsData] = useState({
    link: ''
  })
  const [image, setImage] = useState(null)
  const [objectUrl, setObjeceUrl] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadedImage = () => {
    inputRef.current?.click()
  }
  const setImageOnState = (event:any) => {
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0]
      setImage(file)
      setObjeceUrl(URL.createObjectURL(file))
      console.log("image",objectUrl)
    }
  }

  const updateMemberInfomation = async () => {
    const apiGatewayUrl = process.env.NEXT_PUBLIC_S3_PROFILE_IMAGE_URL || ""
    const fileName = await fetch(apiGatewayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: image,
    })
    const json = await fileName.json()
    // const body = JSON.parse(json.body)
    console.log("filename", json)
  }

  const [photo, setPhoto] = useState<string>()

  const getImage = async () => {
    const apiGatewayUrl = process.env.NEXT_PUBLIC_S3_PROFILE_IMAGE_URL || ""
    const url = `${apiGatewayUrl}?file=text.jpg`
    const get = await fetch(url)
    const blob = await get.blob()
    const objurl = URL.createObjectURL(blob)
    setPhoto(objurl)
  }

  return (
    <>
      <div className={styles.edit_profile_container}>
        {!!objectUrl
        ? <img src={objectUrl} alt="プロフィール画像" className={styles.edit_profile_uploaded_img}/>
        : <div className={styles.edit_profile_blank_img} onClick={uploadedImage}> </div>
        }
        {!!photo
        ? <img src={photo} alt="プロフィール画像" className={styles.edit_profile_uploaded_img}/>
        : <div className={styles.edit_profile_blank_img} onClick={uploadedImage}> </div>
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
          value={postProfileData.name}
        />
        <TextField
          label="SNSリンク"
          value={postSnsData.link}
        />
        <Button onClick={updateMemberInfomation}>更新</Button>
        <Button onClick={getImage}>取得</Button>
        {/* <img src={photo} alt=""/> */}
      </div>
    </>
  )
}

export default EditProfile