import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from 'next-i18next';

import CHECK_ICON from "@icons/check_white.png";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


type OptionAddProps = {
  selectData:any;
  onClickSelectDining(data:any): void;
};
const OptionAdd: React.FC<OptionAddProps> = ({ selectData,onClickSelectDining}) => {
  const { t } = useTranslation(['common','yakwan']);
  const [selectOption, setSelectOption] = React.useState({
    FSA01 : false,
    FSA02 : false,
    FSA03: false,
    FSA04 : false
  });
  
  React.useEffect(() => {
    onClickSelectDining(selectOption)
  }, [selectOption]);
  

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.commonWrapper}>
        <Box sx={styles.titleWrap}>
          <Typography variant="sourceHanSans" sx={styles.mainTitle}>
          {t("reservation.gropu_part_title.gropu_menu_option_non_free")}
          </Typography>
        </Box>
        <Box sx={styles.dataWrap}>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FSA01 : !selectOption.FSA01})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FSA01 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_add_option.karaoke")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.dataPriceTitle}>
              {t("reservation.gropu_add_option.karaoke_price")}
            </Typography>
          </Box>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FSA02 : !selectOption.FSA02})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FSA02 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_add_option.amp")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.dataPriceTitle}>
              {t("reservation.gropu_add_option.amp_price")}
            </Typography>
          </Box>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FSA03 : !selectOption.FSA03})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FSA03 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_add_option.television")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.dataPriceTitle}>
              {t("reservation.gropu_add_option.television_price")}
            </Typography>
          </Box>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FSA04 : !selectOption.FSA04})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FSA04 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_add_option.meal")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.dataPriceTitle}>
              {t("reservation.gropu_add_option.meal_price")}
            </Typography>
          </Box>
        </Box>
      </Box>
      
    </Box>
  );
}

const styles = {
  wrapper : {
    display:'flex',flexDirection:'row',alignItems:'space-evenly',width:'100%',margin:"0 10px",height:'280px'
  },
  commonWrapper : {
    display:'flex',flexDirection:'column',border:'solid 1px #dcdcdc',width:'100%',height:'100%',borderRadius:'10px'
  },
  boxWrap : {
    display:'flex',height:"35px",flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:"0 5px",width:'100%',cursor:'pointer'
  },
  titleWrap : {
    display:'flex',backgroundColor:'#efefef',width:'100%',height:'40px',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',alignItems:'center',justifyContent:"center"
  },
  dataWrap : {
    display:'flex',flexDirection:'column',width:'100%',height:'calc( 100% - 40px)',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px',alignItems:'center',padding:"10px"
  },
  mainTitle : {
    fontSize: "18px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-0.36px",
    color: "#22201f",
  },
  dataTitle : {
    fontSize: "18px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-0.36px",
    color: "#22201f",
  },
  dataPriceTitle : {
    fontSize: "16px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
    color: "#b2b2b2",
  }
}
export default OptionAdd;