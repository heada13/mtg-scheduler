import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { inputMember } from "../../states/eventDetailState";
import styles from '../../styles/main.module.scss'
import { Member } from "@prisma/client";

const Profile = () => {
  const memberState = useRecoilValue(inputMember)
  const [member, setMember] = useState<Member|null>()

  useEffect(() => {
    setMember(memberState)
  },[memberState])

  return (
    <>
      <div className={styles.profile_container}>
        { member?.email }
      </div>
    </>
  )
}

export default Profile