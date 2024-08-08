import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from 'next-i18next';

type SelectTimeProps = {
  selectRoomCount:number;
  selectMemberCount:number;
  onClickSelectRoomCount(number:any): void;
  onClickSelectMemberCount(number:any): void;
};

const SelectNumber: React.FC<SelectTimeProps> = ({ selectRoomCount,selectMemberCount,onClickSelectRoomCount,onClickSelectMemberCount}) => {
  const { t } = useTranslation(['common','yakwan']);
  React.useEffect(() => {

  }, []);

  const rooms = [
    {
      code : 1,
      label: 1,
    },
    {
      code : 2,
      label: 2,
    },
    {
      code : 3,
      label: 3,
    },
    {
      code : 4,
      label: 4,
    },
  ];

  const counts = [
    {
      code : 1,
      label: 1,
    },
    {
      code : 2,
      label: 2,
    },
    {
      code : 3,
      label: 3,
    },
    {
      code : 4,
      label: 4,
    },
    {
      code : 5,
      label: 5,
    },
    {
      code : 6,
      label: 6,
    },
  ];


  return (
    <Box sx={styles.wrapper}>
      <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>
        {t("reservation.title_step_6")}
      </Typography>
      <Box sx={styles.hourWrapper}>
        {
          rooms.map((item:any,index:number) => {
            return (
              <Box
                key={index}
                sx={selectRoomCount == item.code ? styles.commonBoxWrapper2 : styles.commonBoxWrapper}
                onClick={()=> onClickSelectRoomCount(item.code)}
              >
                <Typography variant="sourceHanSans" sx={{...styles.menuTextStyle,color:selectRoomCount == item.code ? "#fff" : "#22201f" }}>
                  {item.label}
                </Typography>
              </Box>
            )
          })
        }
      </Box>
      <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>
        {t("reservation.title_step_4")} <span>·{t("reservation.title_step_4_add")}</span>
      </Typography>
      <Box sx={styles.hourWrapper}>
        {
          counts.map((item:any,index:number) => {
            return (
              <Box
                key={index}
                sx={selectMemberCount == item.code ? styles.commonBoxWrapper2 : styles.commonBoxWrapper}
                onClick={()=> onClickSelectMemberCount(item.code)}
              >
                <Typography variant="sourceHanSans" sx={{...styles.menuTextStyle,color:selectMemberCount == item.code ? "#fff" : "#22201f" }}>
                  {item.label}
                </Typography>
              </Box>
            )
          })
        }
      </Box>
    </Box>
    );
  }

const styles = {
  wrapper : {
    display:'flex',flexDirection:'column',padding:"20px 20px"
  },
  hourWrapper : {
    display:'flex',flexDirection:'row',alignItems:'space-evenly',flexWrap:'wrap',margin:"15px 0"
  },
  commonBoxWrapper : {
    display:'flex',justifyContent:'center',alignItems:'center',width:"46px",height:"46px",marginRight:"5px",marginBottom:"5px",borderRadius:"6px",border: "solid 1px #c8c8c8",cursor:"pointer"
  },
  commonBoxWrapper2 : {
    display:'flex',justifyContent:'center',alignItems:'center',width:"46px",height:"46px",marginRight:"5px",marginBottom:"5px",borderRadius:"6px",backgroundColor:"#bb9b6a",cursor:"pointer",border: "solid 1px #bb9b6a"
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
    "& > span" : {
      fontSize: "13px",
      fontWeight: "500",
      color: "#b2b2b2",
  }
  }
}

export default SelectNumber;