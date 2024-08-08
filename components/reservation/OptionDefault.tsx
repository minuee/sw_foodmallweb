import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from 'next-i18next';

import CHECK_ICON from "@icons/check_white.png";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type OptionDefaultProps = {
  selectData:any;
  onClickSelectDining(data:any): void;
};

const OptionDefault: React.FC<OptionDefaultProps> = ({ selectData,onClickSelectDining}) => {
  const { t } = useTranslation(['common','yakwan']);

  const [selectOption, setSelectOption] = React.useState({
    FFA01 : true,
    FFA02 : true,
    FFA03 : true,
    FFA04 : true,
    FFI01 : true,
    FFI03 : true,
    FFI04 : true,
    FFI05 : true,
    FFI06 : true,
    FFI02 : true,
  });
  
  React.useEffect(() => {
    onClickSelectDining(selectOption)
  }, [selectOption]);
  

  return (
    <Box sx={styles.wrapper}>
      <Box sx={{...styles.commonWrapper,marginRight:'10px'}}>
        <Box sx={styles.titleWrap}>
          <Typography variant="sourceHanSans" sx={styles.mainTitle}>
          {t("reservation.gropu_default_option.main_title_1")}
          </Typography>
        </Box>
        <Box sx={styles.dataWrap}>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FFA01 : !selectOption.FFA01})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FFA01 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_default_option.screen")}
            </Typography>
          </Box>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FFA02 : !selectOption.FFA02})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FFA02 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_default_option.projector")}
            </Typography>
          </Box>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FFA03 : !selectOption.FFA03})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FFA03 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_default_option.wireless_mike")}
            </Typography>
          </Box>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FFA04 : !selectOption.FFA04})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FFA04 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_default_option.pin_mike")}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{...styles.commonWrapper,marginLeft:'10px'}}>
        <Box sx={styles.titleWrap}>
          <Typography variant="sourceHanSans" sx={styles.mainTitle}>
          {t("reservation.gropu_default_option.main_title_2")}
          </Typography>
        </Box>
        <Box sx={styles.dataWrap}>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FFI01 : !selectOption.FFI01})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FFI01 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_default_option.phase")}
            </Typography>
          </Box>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FFI03 : !selectOption.FFI03})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FFI03 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
            {t("reservation.gropu_default_option.banner")}
            </Typography>
          </Box>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FFI04 : !selectOption.FFI04})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FFI04 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_default_option.hanger")}
            </Typography>
          </Box>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FFI05 : !selectOption.FFI05})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FFI05 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_default_option.blind")}
            </Typography>
          </Box>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FFI06 : !selectOption.FFI06})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FFI06 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_default_option.partition")}
            </Typography>
          </Box>
          <Box sx={styles.boxWrap} onClick={()=> setSelectOption({...selectOption,FFI02 : !selectOption.FFI02})}>
            <CheckCircleIcon fontSize="small" sx={{color:selectOption.FFI02 ? '#f84040': '#ccc',marginRight:'10px'}} />
            <Typography variant="sourceHanSans" sx={styles.dataTitle}>
              {t("reservation.gropu_default_option.parking")}
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
    display:'flex',flexDirection:'column',border:'solid 1px #dcdcdc',width:'48%',height:'100%',borderRadius:'10px'
  },
  boxWrap : {
    display:'flex',height:"35px",flexDirection:'row',alignItems:'center',justifyContent:'flex-start',padding:"0 5px",width:'100%',
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
  }
}
export default OptionDefault;