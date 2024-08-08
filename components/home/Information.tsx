import * as React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import * as apiObject from '@utils/api';
import Skeleton from '@mui/material/Skeleton';

import { Typography,Box } from "@mui/material";
import { useTranslation } from 'next-i18next';
import IconNotice from "@icons/main/icon_notice.png";
import IconMore from "@icons/main/event_btn.png";
import IconMPoint from "@icons/main/point.png";
import IconInformation from "@icons/main/icon_info.png";
import IconQna from "@icons/main/icon_qna.png";
import IconAcesss from "@icons/main/icon_access.png";
import IconTel from "@icons/main/icon_tel.png";
const API_SERVER_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const Information: React.FC = () => {
    const { t } = useTranslation(['common','yakwan']);
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<any>([]);
    const [Categorydata, setCategoryData] = React.useState<any>([]);
    const getDataList = async() => {
        const url = `${API_SERVER_BASE_URL}/sr_system_api/board/board.php?action=findList`;
        const payload = {
            board_code : "notice",
            search:""
        };
        const res = await apiObject.defaultFetch(url, payload);
    
        if ( res.state == 'true') {
          const resultData = res?.row;
          return resultData;
        }else{
            return [];
        }
    }

    const getCategoryDataList = async() => {
        const url = `${API_SERVER_BASE_URL}/sr_system_api/board/board.php?action=code_data`;
        const payload = {};
        const res = await apiObject.defaultFetch(url, payload);
    
        if ( res.state == 'true') {
            const resultData = res?.row;
            setCategoryData(resultData)
        }
    }

    React.useEffect(() => {
        getCategoryDataList();
        
     },[])

     
    const isData = React.useMemo(async() => {
        const returnData = await getDataList();
        console.log("returnData",returnData)
        setData(returnData.filter((element:any,index:number) => index < 3));
        setTimeout(() => {
            setLoading(false)
          }, 2000);
        return true;
      }, [Categorydata]);
 

    return (
        <Box sx={styles.wrapper}>
            <Box sx={{display:'flex',width:"1424px",minHeight:"150px",flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Box sx={{display:'flex',width:"700px",minHeight:"150px",flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Box sx={{display:'flex',width:"100%",flexDirection:'row',justifyContent:"flex-start",alignItems:'center',padding:"0 0 20px 40px"}}>
                        <Image src={IconNotice} width={62} height={62} alt={'notice'} />
                        <Box ml={2}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle1}>{t("main.information.main_1_title")}</Typography>
                        </Box>
                        <Box ml={2} pt={2}>
                            <Image src={IconMore} width={54} height={54} alt={'notice'} />
                        </Box>
                    </Box>
                    <Box sx={{display:'flex',width:"100%",flexDirection:'column',justifyContent:"center",padding:"0 0 0 64px"}}>
                        {
                            isLoading
                            ?
                                <Box sx={{display:'flex',width:"100%",flexDirection:'column'}}>
                                    <Skeleton />  
                                    <Skeleton />  
                                    <Skeleton />    
                                </Box>
                            :
                            <>
                            {
                                data?.map((item:any,index:number) => {
                                    return (
                                        <Box sx={{display:'flex',width:"100%",flexDirection:'row',alignItems:"center"}} key={index}>
                                            <Box pr={2} pb={"3px"}><Image src={IconMPoint} width={5} height={5} alt={'piint'} /></Box>
                                            <Typography  variant="sourceHanSans" sx={styles.textStyle2}> {item?.title}</Typography>
                                        </Box>
                                    )
                                })
                            }
                            </>
                        }
                        
                        
                    </Box>
                </Box>
                <Box sx={{display:'flex',width:"1024px",minHeight:"150px",flexDirection:'column',justifyContent:'center',overflow:"hidden"}}>
                    <Box sx={{display:'flex',width:"100%",flexDirection:'row',alignItems:'center',mb:3,padding:"0 0 0 100px"}}>
                        <Image src={IconInformation} width={62} height={62} alt={'notice'} />
                        <Box ml={2}>
                            <Typography  variant="sourceHanSans" sx={styles.textStyle1}>{t("main.information.main_2_title")}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:'flex',width:"637px",height:"92px",flexDirection:'row',justifyContent:"center",alignItems:'center',border:"1px solid #ccc",margin:"0 0 0 100px",backgroundColor:'#f7f7f7',borderRadius:"15px"}}>
                        <Box sx={{display:'flex',flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
                            <Image src={IconQna} width={56} height={56} alt={'notice'} />
                            <Box ml={2}>
                                <Typography  variant="sourceHanSans" sx={styles.textStyle3}>{t("main.information.info_menu_1")}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:'flex',flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
                            <Image src={IconAcesss} width={56} height={56} alt={'notice'} />
                            <Box ml={2}>
                                <Typography  variant="sourceHanSans" sx={styles.textStyle3}>{t("main.information.info_menu_2")}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:'flex',flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
                            <Image src={IconTel} width={56} height={56} alt={'notice'} />
                            <Box ml={2}>
                                <Typography  variant="sourceHanSans" sx={styles.textStyle3}>{t("main.information.info_menu_3")}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

const styles = {
    wrapper: {
        display:"flex",
        flexDirection:"row",
        flex:"1",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 100px",
        background: "#ffffff",
        width: "100%"
    },
    textStyle1 : {
        fontSize: "28px",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.56px",
        color: "#22201f"
    },
    textStyle2 : {
        fontSize: "16px",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "25px",
        letterSpacing: "-0.32px",
        color: "#22201f",
        overflow: "hidden", 
        width:"300px",
        textOverflow: "ellipsis",
    },
    textStyle3:{
        fontSize: "19px",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        letterSpacing: "-0.38px",
        textAlign: "left",
        color: "#22201f",
    }
}

export default Information;