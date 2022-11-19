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
    console.log("url",apiGatewayUrl)
    // const apiGatewayUrl = "https://pdsr395127.execute-api.ap-northeast-1.amazonaws.com/test-profile-image"
    // const url = new URL(apiGatewayUrl)
    const apikey = process.env.NEXT_PUBLIC_S3_PROFILE_IMAGE_API_KEY || ""
    // const fileName = await fetch(apiGatewayUrl, {
    //   method: "POST",
    //   body: image,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     "x-api-key": apikey
    //   }
    // }).then((res) => {
    //   return res
    // })
    var formdata = new FormData()
    if(image){
      console.log("true")
      formdata.append("image",image)
      console.log("append",formdata.get("image"))
    }
    // const fileName = await fetch("/api/postProfileImage", {
    const fileName = await fetch(apiGatewayUrl, {
      // credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        // "x-api-key": apikey
      },
      body: formdata,
    })
    const json = await fileName.json()
    console.log("filename",json)
  }

  return (
    <>
      <div className={styles.edit_profile_container}>
        {!!objectUrl
        ? <img src={objectUrl} alt="プロフィール画像" className={styles.edit_profile_uploaded_img}/>
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
      </div>
    </>
  )
}

export default EditProfile