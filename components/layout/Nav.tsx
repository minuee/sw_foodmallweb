import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import InboxIcon from '@mui/icons-material/Inbox';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';

import Link from "next/link"
import MuiLink from '@mui/material/Link';
import { useTranslation } from 'next-i18next';

import Drawer from 'react-modern-drawer';
import Image from 'next/image';
import LogoImage from "@images/logo.png";

import mConst from "utils/constants";

const data = [
  { icon: <People />, label: 'Dining', link: "/reservation",menu:'dinning' },
  { icon: <Dns />, label: '단체예약', link: "/reservation", menu:'fandb' },
  { icon: <PermMedia />, label: 'Rooms', link: "/reservation",menu:'room' }
];
const data2 = [
  { icon: <People />, label: 'common.floor.foodmall_1f',link:'/',menu : "left_4" },
  { icon: <Dns />, label: 'common.floor.foodmall_2f',link:'/',menu : "left_3" },
  { icon: <PermMedia />, label: 'common.floor.foodmall_3f',link:'/',menu : "left_2" },
  { icon: <PermMedia />, label: 'common.floor.foodmall_5f',link:'/',menu : "left_1" },
];
const data3 = [
  { icon: <People />, label: 'common.floor.stayrak_2f',link:'/',menu : "right_4"},
  { icon: <Dns />, label: 'common.floor.stayrak_3f',link:'/',menu : "right_3"},
  { icon: <PermMedia />, label: 'common.floor.stayrak_4f',link:'/',menu : "right_2" },
  { icon: <PermMedia />, label: 'common.floor.stayrak_11f',link:'/',menu : "right_1" },
];

type NavProps = {
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
};

const Nav: React.FC<NavProps> = ({ isOpen, handleOpen }) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const { t } = useTranslation(['common','yakwan']);
  if ( !isOpen ) return null;

  return (
    <Drawer
      open={isOpen}
      onClose={() => {handleOpen(false) }}
      lockBackgroundScroll={false}
      enableOverlay={true} //toggle off == flase
      direction='left'
      className='bla bla bla'
      size={"100vh"}
      style={{position:'fixed',overflow: 'auto',backgroundColor:'#1b0661',width:'70vw', maxWidth:'300px',left:0,top:0,}}
      zIndex={999}
    >
      <Box sx={{ display: 'flex',width:'100%', height:'100%',backgroundColor:'#1b0661' }}>
        <Paper elevation={0} sx={{width:'100%', maxWidth: "300px",backgroundColor:'#1b0661' }}>
          <Box>
            <ListItem>
              <Image src={LogoImage} width={77} height={45} alt={'logo'} /> 
            </ListItem>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{display:'flex',flex:1, height: 40 }}>
                <ListItemIcon>
                  <Home sx={{color:'#fff'}} />
                </ListItemIcon>
                {/* <ListItemText
                  primary={t("common.navname.home")}
                  primaryTypographyProps={{
                    color: '#fff',
                    fontWeight: 'medium',
                    variant: 'h6',
                    letterSpacing:-1
                  }}
                /> */}
              </ListItemButton>
              <ListItemButton sx={{ height: 40,textAlign:'right',display:'flex',flex:1,justifyContent:"flex-end",alignItems:'center'}}>
                <Link href={{pathname: "/login"}} style={{color:'#fff',textDecoration: "none",textAlign:'right' }} onClick={()=> handleOpen(false)}>
                <ListItemText
                  primary={t("common.navname.login")}
                  primaryTypographyProps={{
                    color: '#fff',
                    fontWeight: 'medium',
                    variant: 'h6',
                    letterSpacing:-1
                  }}
                />
                </Link>
              </ListItemButton>
            </ListItem>
            <Divider color="#555" />
            <Box sx={{bgcolor: open ? '#292633' : null, pb: open ? 2 : 0,}}>
              <ListItemButton
                alignItems="flex-start"
                onClick={() => {setOpen(!open);setOpen2(false);setOpen3(false)}}
                sx={{px: 3,pt: 2.5,pb: open ? 0 : 2.5,'&:hover, &:focus': { '& svg': { opacity: open ? 1 : 1} }}}
              >
                <ListItemText
                  primary={t("common.navname.reservation")}
                  primaryTypographyProps={{fontSize: 15,color: '#fff',fontWeight: 'medium',lineHeight: '20px', mb: '2px', }}
                  secondary="Dining, 단체예약, Rooms"
                  secondaryTypographyProps={{noWrap: true,fontSize: 12,lineHeight: '16px',color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',}}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{ mr: -1,color:'#fff',opacity: 1,transform: open ? 'rotate(-180deg)' : 'rotate(0)',transition: '0.5s',}}
                />
              </ListItemButton>
              {open &&
                data.map((item,index) => (
                  <ListItemButton
                    key={index}
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <Link href={{pathname: item.link,query:{menu : item.menu}}} style={{color:'#fff',textDecoration: "none" }} onClick={()=> handleOpen(false)}>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                      />
                    </Link>
                  </ListItemButton>
                ))}
            </Box>
            <Divider color="#555" />
            <Box sx={{bgcolor: open2 ? '#292633' : null, pb: open2 ? 2 : 0,}}>
              <ListItemButton
                alignItems="flex-start"
                onClick={() => {setOpen2(!open2);setOpen(false);setOpen3(false)}}
                sx={{px: 3,pt: 2.5,pb: open2 ? 0 : 2.5,'&:hover, &:focus': { '& svg': { opacity: open2 ? 1 : 1} }}}
              >
                <ListItemText
                  primary={t("common.floor.leftfloor")}
                  primaryTypographyProps={{fontSize: 15,color: '#fff',fontWeight: 'medium',lineHeight: '20px', mb: '2px', }}
                  secondary={`${t("common.floor.foodmall_1f")},${t("common.floor.foodmall_2f")},${t("common.floor.foodmall_3f")},${t("common.floor.foodmall_5f")}`}
                  secondaryTypographyProps={{noWrap: true,fontSize: 12,lineHeight: '16px',color: open2 ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',}}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{ mr: -1,color:'#fff',opacity: 1,transform: open2 ? 'rotate(-180deg)' : 'rotate(0)',transition: '0.5s',}}
                />
              </ListItemButton>
              {open2 &&
                data2.map((item,index) => (
                  <ListItemButton
                    key={index}
                    sx={{ index: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <Link href={{pathname: item.link,query:{menu : item.menu}}} style={{color:'#fff',textDecoration: "none" }} onClick={()=> handleOpen(false)}>
                    <ListItemText
                      primary={t(item.label)}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                    </Link>
                  </ListItemButton>
                ))}
            </Box>
            <Divider color="#555" />
            <Box sx={{bgcolor: open3 ? '#292633' : null, pb: open3 ? 2 : 0,}}>
              <ListItemButton
                alignItems="flex-start"
                onClick={() => {setOpen3(!open3);setOpen2(false);setOpen(false)}}
                sx={{px: 3,pt: 2.5,pb: open3 ? 0 : 2.5,'&:hover, &:focus': { '& svg': { opacity: open3 ? 1 : 1} }}}
              >
                <ListItemText
                  primary={t("common.floor.rightfloor")}
                  primaryTypographyProps={{fontSize: 15,color: '#fff',fontWeight: 'medium',lineHeight: '20px', mb: '2px', }}
                  secondary={`${t("common.floor.stayrak_2f")},${t("common.floor.stayrak_3f")},${t("common.floor.stayrak_4f")},${t("common.floor.stayrak_11f")}`}
                  secondaryTypographyProps={{noWrap: true,fontSize: 12,lineHeight: '16px',color: open3 ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',}}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{ mr: -1,color:'#fff',opacity: 1,transform: open3 ? 'rotate(-180deg)' : 'rotate(0)',transition: '0.5s',}}
                />
              </ListItemButton>
              {open3 &&
                data3.map((item,index) => (
                  <ListItemButton
                    key={index}
                    sx={{ index: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <Link href={{pathname: item.link,query:{menu : item.menu}}} style={{color:'#fff',textDecoration: "none" }} onClick={()=> handleOpen(false)}>
                    <ListItemText
                      primary={t(item.label)}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                    />
                    </Link>
                  </ListItemButton>
                ))}
            </Box>
            <Divider color="#555" />
            <Link href={{pathname: "/intro"}} style={{color:'#fff',textDecoration: "none" }} onClick={()=> handleOpen(false)}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon sx={{color:'#fff'}} />
              </ListItemIcon>
              <ListItemText primary={t("common.navname.intro")} sx={{color:'#fff'}} />
            </ListItemButton>
            </Link>
            <Divider color="#555" />
            <Link href={{pathname: "/notice"}} style={{color:'#fff',textDecoration: "none" }} onClick={()=> handleOpen(false)}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon sx={{color:'#fff'}} />
              </ListItemIcon>
              <ListItemText primary={t("common.navname.information")} sx={{color:'#fff'}} />
            </ListItemButton>
            </Link>
            <Divider color="#555" />
            <Link href={{pathname: "/banquet"}} style={{color:'#fff',textDecoration: "none" }} onClick={()=> handleOpen(false)}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon sx={{color:'#fff'}} />
              </ListItemIcon>
              <ListItemText primary={t("common.navname.party")} sx={{color:'#fff'}} />
            </ListItemButton>
            </Link>
            <Divider color="#555" />
            <ListItemButton>
              <MuiLink href={mConst.happyCallUrl} underline="none" rel="noopener noreferrer" target="_blank">
              <ListItemIcon>
                <InboxIcon sx={{color:'#fff'}} />
              </ListItemIcon>
              </MuiLink>
              <MuiLink href={mConst.happyCallUrl} underline="none" rel="noopener noreferrer" target="_blank">
              <ListItemText primary={t("common.navname.inquiry")} sx={{color:'#fff'}} />
              </MuiLink>
            </ListItemButton>
            <Divider color="#555" />
            <Link href={{pathname: "/event/sns"}} style={{color:'#fff',textDecoration: "none" }} onClick={()=> handleOpen(false)}>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon sx={{color:'#fff'}} />
              </ListItemIcon>
              <ListItemText primary={t("common.navname.sns")} sx={{color:'#fff'}} />
            </ListItemButton>
            </Link>
            <Divider color="#555" />
          </Box>
        </Paper>
      </Box>
    </Drawer>
  );
}

export default Nav;