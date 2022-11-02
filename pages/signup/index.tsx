import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { app } from "../../firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from 'react';
import styles from '../../styles/main.module.scss'
import { useRouter } from 'next/router';

export default function SignUp () {
  const auth = getAuth(app)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const create = await createUserWithEmailAndPassword(auth, email, password)
    console.log("create",create)
    const uid = create.user.uid
    const postBody = {
      name:"",
      email:email,
      pass:password,
      auth_uid:uid
    }
    const post = await fetch('/api/postMember',{
      method:'POST',
      body:JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      }
    })
    if(post.status === 200) {
      router.push("/")
    }
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.sign_up_container}>
        <div>
          <InputLabel>メールアドレス</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            onChange={handleChangeEmail}
            />
        </div>
        <div>
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <Button type="submit" variant="outlined">
            登録
          </Button>
        </div>
      </form>
    </>
  )
}