
import * as React from 'react';
import Link from "next/link"
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'next-i18next';
import { Typography,Box } from "@mui/material";
import Button from '@mui/material/Button';

import { globalOpenReservation } from '@stores/layoutStore';
import { useStyles  } from 'styles/desktop/header';
import LogoImage from "@images/logo.png";
import DeskTopMenuIcon from "@icons/header/menu-icon.png";
import DeskTopSearchIcon from "@icons/header/search-icon.png";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
type HeaderLeftProps = {
    locale? : any,
};

const headerLeft: React.FC<HeaderLeftProps> = ({ locale = 'ko'}) => {

    const { t } = useTranslation(['common','yakwan']);
    const classes = useStyles();
    const [isOpenReservation, setOpenReservation] = useRecoilState(globalOpenReservation);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    return (
        <>
            <Box sx={styles.wrapper}>
                <Link href={"/"} locale={locale}>
                    <Image src={LogoImage} width={72} height={44} alt={'logo'} />
                </Link>
                {/* <Box sx={{display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center",marginLeft:3}}>
                    <Button sx={{border:"1px solid #b2b2b2",backgroundColor:'transparent',borderRadius:"16px",height:'32px',padding:"0 25px 0 10px"}}>
                        <Typography  variant="manrope" className={classes.textStyleOff}>Online</Typography>
                    </Button>
                    <Button sx={{border:0,backgroundColor:'#f84040',borderRadius:"16px",height:'32px',padding:"0 15px",left:-20}}>
                        <Typography  variant="manrope" className={classes.textStyleON}>Store</Typography>
                    </Button>
                </Box> */}
                <Box sx={styles.menuWrapper}>
                    <Image src={DeskTopMenuIcon} width={30} height={30} alt={'menu'} />
                </Box>
                <Box sx={styles.searchWrapper}>
                    <Image src={DeskTopSearchIcon} width={30} height={30} alt={'menu'} />
                </Box>
                <Box sx={styles.bookingWrapper}>
                    <Tooltip title="Account settings">
                        <IconButton
                            //onClick={handleClick}
                            onMouseOver={handleClick}
                            size="medium"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Typography  variant="sourceHanSans" className={classes.titleStyle1}>
                                {t("common.navname.reservation")}
                            </Typography>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={styles.eventWrapper}>
                    <Typography  variant="sourceHanSans" className={classes.titleStyle1}>
                        EVENT
                    </Typography>
                </Box>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                onMouseLeave={handleClose}
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
                <MenuItem onClick={()=>setOpenReservation(1)}>
                    <Typography  variant="manrope" className={classes.textStyle1} sx={{ "&:hover": { color: "#f84040" } }}>Dinging</Typography>
                </MenuItem>
                <MenuItem onClick={()=>setOpenReservation(2)}>
                    <Typography  variant="manrope" className={classes.textStyle1} sx={{ "&:hover": { color: "#f84040" } }}>{t("reservation.title_group_reservation")}</Typography>
                </MenuItem>
                <MenuItem onClick={()=>setOpenReservation(3)}>
                    <Typography  variant="manrope" className={classes.textStyle1} sx={{ "&:hover": { color: "#f84040" } }}>{t("common.floor.stayrak_4f")}</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

const styles = {
    wrapper : {
        flex:1,display:'flex',flexDirection:'row',alignItems:'center'
    },
    menuWrapper : {
        display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center",marginLeft:3,marginRight:1
    },
    searchWrapper : {
        display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center",marginRight:2
    },
    bookingWrapper : {
        display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center",marginRight:2
    },
    eventWrapper : {
        display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center"
    }
}

export default headerLeft