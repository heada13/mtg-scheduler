import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { inputMember } from "../../states/state";
import styles from '../../styles/main.module.scss'
import { Member } from "@prisma/client";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter()
  const memberState = useRecoilValue(inputMember)
  const [member, setMember] = useState<Member|null>()

  useEffect(() => {
    setMember(memberState)
  },[memberState])

  return (
    <>
      <div className={styles.profile_container}>
        {member?.image_file_name === "/" ? 
        <div className={styles.blank_profile_image}>未設定</div> :
        <img src={member?.image_file_name} alt="profile-image" className={styles.profile_image}/> 
        }
        {member?.name ? 
        <h2 className={styles.user_name}>{member?.name}</h2> :
        <h2 className={styles.user_name}>ユーザーネーム未設定</h2>
        }
        <Button onClick={()=> router.push('/editProfile') } variant="outlined">プロフィール変更</Button>
      </div>
    </>
  )
}

export default Profile