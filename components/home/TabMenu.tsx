import * as React from 'react';
import Box from '@mui/material/Box';
import Link from "next/link"
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import useLocaleTransfer from "services/locale/transfer";
import { useStyles  } from 'styles/desktop/header';
import { useTranslation } from 'next-i18next';
import functions from '@utils/functions';
import { rightFloor,leftFloor  } from '@utils/constants';
import tabLeft from "@images/foodmall.png";
import tabRight from "@images/stayrak.png";
import { usePathname } from 'next/navigation'

type TabMenuProps = {
    tabValue? : number,
    locale? : any,
    handleMenuChange: (num: number) => void | undefined;
};


const TabMenu: React.FC<TabMenuProps> = ({ tabValue = 0, locale = 'ko', handleMenuChange}) => {

    const { t } = useTranslation(['common','yakwan']);
    const classes = useStyles();
    const pathname = usePathname();
    React.useEffect(() => {
       console.log("pathname",tabValue,pathname)
    },[])

    const renderBuild = () => {
        if ( tabValue == 0 ) {
            return (
                <Box sx={styles.floorWrap}>
                    <Image src={tabLeft} width={344*0.3} height={484*0.3} alt={'left'} style={{zIndex:10,filter:"brightness(100%)"}} />
                    <Image src={tabRight} width={357*0.3} height={740*0.3} alt={'left'} style={{zIndex:1,filter:"opacity(30%)"}} />
                </Box>
                
            )
        }else{
            return (
                <Box sx={styles.floorWrap}>
                    <Image src={tabLeft} width={344*0.3} height={484*0.3} alt={'left'} style={{zIndex:1,filter:"opacity(30%)"}} />
                    <Image src={tabRight} width={357*0.3} height={740*0.3} alt={'left'} style={{zIndex:10,filter:"brightness(100%)"}} />
                </Box>
            )
        }
    }

    if ( tabValue == 1 ) {
        return (
            <Box sx={styles.wrapper}>
            {
                rightFloor.map((item,index) => {
                    return (
                        <Box 
                            key={index}
                            sx={pathname == item.desktopUrl ? styles.commonSelectWrap : styles.commonWrap}
                        >
                            <Box sx={{display:'flex',flex:1,alignItems:'center',paddingLeft:'20px'}}>
                                <Link href={item?.desktopUrl} style={{color:'#fff',textDecoration: "none" }} >
                                    <Typography variant="sourceHanSans" sx={styles.textStyle1}>
                                    {item.floorName}
                                    </Typography>
                                </Link>
                            </Box>
                            <Box sx={{display:'flex',flex:2,alignItems:'center',paddingLeft:'5px'}}>
                                <Link href={item?.desktopUrl} style={{color:'#fff',textDecoration: "none" }} >
                                    <Typography variant="sourceHanSans" sx={styles.textStyle1}>
                                    {useLocaleTransfer(t,'common',item.localeName)}
                                    </Typography>
                                </Link>
                            </Box>
                            
                        </Box>
                    )
                })
                }
                {
                    renderBuild()
                }
            </Box>
        );
    }
    return (
        <Box sx={styles.wrapper}>
            {
                leftFloor.map((item,index) => {
                    return (
                        <Box 
                            key={index}
                            sx={pathname == item.desktopUrl ? styles.commonSelectWrap : styles.commonWrap}
                        >
                            <Box sx={{display:'flex',flex:1,alignItems:'center',paddingLeft:'30px'}}>
                                <Link href={item?.desktopUrl} style={{color:'#fff',textDecoration: "none" }} >
                                    <Typography variant="sourceHanSans" sx={styles.textStyle1}>
                                    {item.floorName}
                                    </Typography>
                                </Link>
                            </Box>
                            <Box sx={{display:'flex',flex:2,alignItems:'center',paddingLeft:'5px'}}>
                                <Link href={item?.desktopUrl} style={{color:'#fff',textDecoration: "none" }} >
                                    <Typography variant="sourceHanSans" sx={styles.textStyle1}>
                                    {useLocaleTransfer(t,'common',item.localeName)}
                                    </Typography>
                                </Link>
                            </Box>
                        </Box>
                    )
                })
            }
            {
                renderBuild()
            }
        </Box>
    );
}

const styles = {
    wrapper : {
        display:'flex',width:'100%',height:'100%',margin:"10px 0 0 0",flexDirection:'column',backgroundColor:'#fff',justifyContent:'flex-start'
    },
    commonWrap : {
        display:'flex',width:'calc( 100% - 20px)',height:'52px',justifyContent:'center',alignItems:'center',flexDirection:'row',
        margin:'0 10px',
        "&:hover": { background:'#f6f5f5',borderRadius:'26px'}
    },
    commonSelectWrap : {
        display:'flex',width:'calc( 100% - 20px)',height:'52px',justifyContent:'center',alignItems:'center',flexDirection:'row',
        margin:'0 10px',background:'#f6f5f5',borderRadius:'26px'
    },
    textStyle1 : {
        fontSize: "18px",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.36px",
        textAlign: "left",
        color: "#474747",
    },
    floorWrap: {
        display:'flex',alignItems:'flex-end',justifyContent:'center',flexDirection:'row',paddingTop:3
    }
}

export default TabMenu