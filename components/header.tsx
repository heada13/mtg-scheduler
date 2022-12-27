import { AccountCircle } from "@mui/icons-material"
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useAuthContext } from "../lib/authContext";
import { Logout } from "../components/logout" 
import Link from "next/link";
import styles from '../styles/main.module.scss'
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { inputMember } from "../states/state";
import { Member } from "@prisma/client";

export const Header = () => {
  const router = useRouter()
  const { user } = useAuthContext()
  const isLoggedIn = !!user
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const member = useRecoilValue(inputMember)
  const [memberState, setMemberState] = useState<Member|null>()

  useEffect(() => {
    setMemberState(member)
  },[member])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    router.push('/profile')
  }

  return (
    <>
      <AppBar position="fixed" >
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div" onClick={()=> router.push('/')}>
              MTG-scheduler
            </Typography>
            {isLoggedIn ? (
              <div>
                {memberState?.image_file_name !== "/" ? (
                <img 
                src={memberState?.image_file_name} 
                alt="" 
                className={styles.profile_image_icon}
                onClick={handleMenu}
                />
                ):
                (
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton> 
              )}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem><Logout/></MenuItem>
              </Menu>
              </div>
            ) : (
              <div className={styles.header_unloggedin_menu}>
                <div>
                  <Link href="/signup">Signup</Link>
                </div>
                <div className={styles.header_login_button}>
                  <Link href="/login">Login</Link>
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
    </>
  )
}