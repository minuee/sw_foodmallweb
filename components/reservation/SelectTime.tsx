import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from 'next-i18next';

type SelectTimeProps = {
  ismode? : string;
  selectHour:any;
  selectMinute:any;
  onClickSelectHour(data:any): void;
  onClickSelectMinute(data:any): void;
};

const SelectDining: React.FC<SelectTimeProps> = ({ ismode,selectHour,selectMinute,onClickSelectHour,onClickSelectMinute}) => {
  const { t } = useTranslation(['common','yakwan']);
  React.useEffect(() => {

  }, []);

  const hours = [
    {
      code : '10',
      label: '10:00',
    },
    {
      code : '11',
      label: '11:00',
    },
    {
      code : '12',
      label: '12:00',
    },
    {
      code : '13',
      label: '13:00',
    },
    {
      code : '14',
      label: '14:00',
    },
    {
      code : '15',
      label: '15:00',
    },
    {
      code : '16',
      label: '16:00',
    },
    {
      code : '17',
      label: '17:00',
    },
    {
      code : '18',
      label: '18:00',
    },
    {
      code : '19',
      label: '19:00',
    },
    {
      code : '20',
      label: '20:00',
    },
  ];

  let minuteArray  = new Array( "00","05","10","20","25","30","35","40","45","50","55");
  let termArray  = new Array( 2,3,6,9,24);
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>
        {ismode == 'dining'  ? t("reservation.title_step_3_1") : t("reservation.title_step_3")}
      </Typography>
      <Box sx={styles.hourWrapper}>
        {
          hours.map((item:any,index:number) => {
            return (
              <Box
                key={index}
                sx={styles.commonBoxWrapper}
              >
                <Button
                  disabled={item.code == "10"}
                  color={item.code == selectHour ? "error" : 'inherit'}
                  size='small'
                  variant={item.code == selectHour ? "contained" : 'outlined'}
                  onClick={()=>onClickSelectHour(item.code)}
                >
                  {item.label}
                </Button>
              </Box>
            )
            })
        }
      </Box>
      <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>
        {ismode == 'dining'  ? t("reservation.title_step_3_2") : t("reservation.title_step_3_3")}
      </Typography>
      {
        ismode == 'dining' 
        ?
        <Box sx={styles.minuteWrapper}>
          {
            selectHour == "" ?
            <Box sx={{display:'flex',alignItems:'center',width:'100%',minHeight:"50px",padding:"10px"}}>
              <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.title_step_3_add")}</Typography>
            </Box>
            :
            minuteArray.map((item:any,index:number) => {
              return (
                <Box
                  key={index}
                  sx={styles.commonBoxWrapper}
                >
                  <Button
                    disabled={false}
                    color={item == selectMinute ? "error" : 'inherit'}
                    size='small'
                    variant={item == selectMinute ? "contained" : 'outlined'}
                    onClick={()=>onClickSelectMinute(item)}
                  >
                    {item}
                  </Button>
                </Box>
              )
            })
          }
        </Box>
        :
        <Box sx={styles.minuteWrapper}>
          {
            termArray.map((item:any,index:number) => {
              return (
                <Box
                  key={index}
                  sx={styles.commonBoxWrapper}
                >
                  <Button
                    disabled={false}
                    color={item == selectMinute ? "error" : 'inherit'}
                    size='small'
                    variant={item == selectMinute ? "contained" : 'outlined'}
                    onClick={()=>onClickSelectMinute(item)}
                  >
                    {item == 24 ? t("reservation.title_time_allday") :item + t("reservation.title_step_3")}
                  </Button>
                </Box>
              )
            })
          }
        </Box>
        }
    </Box>
    );
  }

const styles = {
  wrapper : {
    display:'flex',flexDirection:'column'
  },
  hourWrapper : {
    display:'flex',flexDirection:'row',alignItems:'space-evenly',flexWrap:'wrap',marginBottom:"15px"
  },
  commonBoxWrapper : {
    position:'relative',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginRight:"5px",marginBottom:"5px"
  },
  minuteWrapper : {
    display:'flex',flexDirection:'row',alignItems:'space-evenly',flexWrap:'wrap'
  },
  menuTextStyle : {
    fontSize: "16px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "-0.32px",
    color: "#22201f",
    marginBottom:'4px'
  }
}

export default SelectDining;