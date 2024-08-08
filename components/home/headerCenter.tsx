
import * as React from 'react';
import Link from "next/link"
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Typography,Box } from "@mui/material";

import { useStyles  } from 'styles/desktop/header';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { usePathname } from 'next/navigation'
//import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
//import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import SungwonjungTitle from "@images/sungwonjung/title.png";
import KeyboardArrowDownIcon from "@images/sungwonjung/icon_arrow_down.png";
import KeyboardArrowUpIcon from "@images/sungwonjung/icon_arrow_up.png";

import TabMenu from "./TabMenu";

type headerCenterProps = {
    locale? : any,
};

const headerCenter: React.FC<headerCenterProps> = ({ locale = 'ko'}) => {

    const { t } = useTranslation(['common','yakwan']);
    const pathname = usePathname();
    const classes = useStyles();
    const [tabValue, setValue] = React.useState(0);
    const [routeName, setRouteName] = React.useState('/sungwonjung');
    const [anchorCenterEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isCenterOpen = Boolean(anchorCenterEl);

    React.useEffect(() => {
        handleMenuChange(0);
        console.log("pathname",pathname)
        setRouteName(pathname)
        if ( pathname == "/rooms" || pathname == "/banquet" ) {
            setValue(1)
        }
    },[])

    const handleCenterClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }
    const handleCenterClose = (e:any) => {
        e.preventDefault();
        setAnchorEl(null);
    }
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const handleMenuChange = ( newValue : number ) => {
        setValue(newValue);
    }

    const renderSubTitle = (name:string) => {
        if ( name == '/sungwonjung') {
            return (
                <Image 
                    src={SungwonjungTitle}  
                    alt="slide" 
                    style={{width:'122px',objectFit: 'contain'}}
                />  
            )
        }else if (name == '/rooms') {
            return (
                <Typography  variant="manrope" sx={styles.textStyle1}>
                    {t("common.navname.rooms")}
                </Typography>
            )
        }else{
            return (
                <Typography  variant="manrope" sx={styles.textStyle1}>
                    {t("common.navname.party")}
                </Typography>
            )
        }
    }

    return (
        <>
            <Box sx={{flex:2,display:'flex',flexDirection:'row',alignItems:'center',width:"200px",zIndex:1000,justifyContent:'center'}}>
                <Box sx={{display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center",marginRight:2,zIndex:1000}} >
                    <Tooltip title="Click Here!">
                    {
                        isCenterOpen
                        ?
                        <IconButton
                            onClick={(e)=>handleCenterClose(e)}
                            size="medium"
                            aria-controls={isCenterOpen ? 'account-center-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={isCenterOpen ? 'true' : undefined}
                        >
                            {
                                renderSubTitle(routeName)
                            }
                            
                            <Box sx={styles.toggleCirle}>
                                <Image 
                                    src={KeyboardArrowUpIcon}  
                                    alt="slide" 
                                    style={{width:'32px',objectFit: 'contain'}}
                                />  
                            </Box>
                        </IconButton>
                        :
                        <IconButton
                            onClick={handleCenterClick}
                            size="medium"
                            aria-controls={isCenterOpen ? 'account-center-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={isCenterOpen ? 'true' : undefined}
                        >
                             {
                                renderSubTitle(routeName)
                            }
                            <Box sx={styles.toggleCirle}>
                                <Image 
                                    src={KeyboardArrowDownIcon}  
                                    alt="slide" 
                                    style={{width:'32px',objectFit: 'contain'}}
                                />  
                            </Box>
                        </IconButton>
                    }
                    </Tooltip>
                </Box>
            </Box>
            <Menu
                anchorEl={anchorCenterEl}
                id="account-center-menu"
                open={isCenterOpen}
                onClose={handleCenterClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        zIndex:1,
                        width:"312px",
                        height:"546px",
                        borderRadius: "20px",
                        boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.16)",
                        border: "solid 1px #dcdcdc",
                        backgroundColor: "#fff",
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.5))'
                    },
                }}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            >
                <Box sx={{width: '100%',height:'100%',bgcolor: '#fff',margin:0,padding:0 }}>
                    <Tabs 
                        value={tabValue} 
                        onChange={handleChange} 
                        centered
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        TabIndicatorProps={{
                            style: { background: "#f84040",borderBottomWidth:1,borderBottomColor:'#ccc' }
                        }} // indicator color
                    >
                        <Tab label={<Typography  variant="manrope" sx={tabValue == 0 ? styles.textStyleBold : styles.textStyleDefault}>FOODMALL</Typography>} />
                        <Tab label={<Typography  variant="manrope" sx={tabValue == 1 ? styles.textStyleBold : styles.textStyleDefault}>STAYRAK</Typography>} />
                    </Tabs>
                    <Box sx={{display:'flex',width:'100%',height:'470px',margin:0,padding:0}}>
                        <TabMenu 
                            tabValue={tabValue}
                            locale={locale}
                            handleMenuChange={handleMenuChange}
                        />
                    </Box>
                </Box>
            </Menu>
        </>
    )
}

const styles = {
    textStyle1 : {
        fontSize: "26px",
        fontWeight: "500",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.52px",
        color:'#fff'
    },
    textStyleDefault : {
        fontSize: "22px",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "20px",
        letterSpacing: "-0.44px",
        textAlign: "center",
        color: "#a2a2a2"
    },
    textStyleBold : {
        fontSize: "22px",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "20px",
        letterSpacing: "-0.44px",
        textAlign: "center",
        color: "#ff0000"
    },
    toggleCirle : {
        cursor:"pointer",
        display:'flex',
        margin : "0 10px"
    }
}

export default headerCenter;