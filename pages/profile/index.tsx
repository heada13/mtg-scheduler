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
        <Button onClick={()=> router.push('/editProfile') }>プロフィール変更</Button>
        { member?.email }
      </div>
    </>
  )
}

export default Profile