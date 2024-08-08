
import * as React from 'react';
import Link from "next/link"
import { useTranslation } from 'next-i18next';
import { Typography,Box } from "@mui/material";
import { useStyles  } from 'styles/desktop/header';
import Image from 'next/image';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

//로그인 전역상태
import { loginUserState } from '@stores/userStore';
import { useRecoilState } from 'recoil';

import LangPopupState from 'components/home/newlang';

import iconMy from "@icons/header/my-icon.png";
import iconMenu from "@icons/header/menu-icon2.png";
import functions from '@utils/functions';

type HeaderRightProps = {
    locale? : any,
    handleLocaleChange?: (str: string) => void | undefined;
};

const headerRight: React.FC<HeaderRightProps> = ({ locale = 'ko', handleLocaleChange}) => {

    const { t } = useTranslation(['common','yakwan']);
    const classes = useStyles();
  
    const [loginUserInfo, setLoginUserInfo] = useRecoilState(loginUserState);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const onHandleLogout = () => {
        setLoginUserInfo({
            mem_id: "",
            mem_name: "",
            email: "",
            mobile: "",
            token: "",
            state : "",
        })
    }
    
    return (
        <>
            <Box sx={styles.wrapper}>
                <Box sx={styles.localeWrapper}>
                    <LangPopupState 
                        locale={locale}
                        handleLocaleChange={(code) => handleLocaleChange?.(code)}
                    />
                </Box>
                <Box sx={styles.myWrapper}>
                    {/* <PersonIcon fontSize="medium" sx={{color:'#fff'}} /> */}
                    <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",width:'40px',height:'40px',borderRadius:"10px",backgroundColor:'#fff'}}>
                        <Image src={iconMy} width={40} height={40} alt={'button'} />
                    </Box>
                    
                </Box>
                <Box sx={styles.infoWrapper}>
                    <Tooltip title="Account settings">
                        <IconButton
                            //onClick={handleClick}
                            onMouseOver={handleClick}
                            size="medium"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Box sx={styles.iconWrap2}>
                                <Image src={iconMenu} width={40} height={40} alt={'button'} />
                            </Box>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    padding: "4px 6px 8px",
                    opacity: "0.7",
                    borderRadius: "20px",
                    backgroundColor: "#242424",
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 0.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        opacity: "0.8",
                        bgcolor: '#000000',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Typography  variant="manrope" className={classes.textStyle1} sx={{ "&:hover": { color: "#f84040" } }}>
                        {t("common.header.info_menu_1")}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Typography  variant="manrope" className={classes.textStyle1} sx={{ "&:hover": { color: "#f84040" } }}>
                        {t("common.header.info_menu_2")}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Typography  variant="manrope" className={classes.textStyle1} sx={{ "&:hover": { color: "#f84040" } }}>
                        {t("common.header.info_menu_3")}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Typography  variant="manrope" className={classes.textStyle1} sx={{ "&:hover": { color: "#f84040" } }}>
                        {t("common.header.info_menu_4")}
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

const styles = {
    wrapper : {
        display: "flex",flex:1,flexDirection: "row",justifyContent: "flex-end",alignItems: "center"
    },
    localeWrapper : {
        display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center",marginRight:"15px",cursor:'pointer'
    },
    myWrapper : {
        display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center",marginRight:"10px",cursor:'pointer'
    },
    iconWrap: {
        display: "flex",justifyContent: "center",alignItems: "center",width:'40px',height:'40px',borderRadius:"10px",backgroundColor:'#fff'
    },
    nameWrap : {
        display: "flex",justifyContent: "center",alignItems: "center",width:'auto',minWidth:'140px',height:'40px',borderRadius:"10px",backgroundColor:'transparent'
    },
    infoWrapper : {
        display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center",cursor:'pointer',
    },
    iconWrap2 : {
        display: "flex",justifyContent: "center",alignItems: "center",width:'40px',height:'40px',borderRadius:"10px",backgroundColor:'#fff',cursor:'pointer'
    }
}

export default headerRight