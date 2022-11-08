import { useRef, useState } from "react"
import TextField from '@mui/material/TextField';
import styles from '../../styles/main.module.scss'
import ImageIcon from '@mui/icons-material/Image';

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
      </div>
    </>
  )
}

export default EditProfile