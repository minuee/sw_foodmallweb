import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import IMG_ROOM1 from "@images/reservation/sungwon.png";
import IMG_ROOM2 from "@images/reservation/atlie.png";
import IMG_ROOM3 from "@images/reservation/restorant.png";
import IMG_ROOM4 from "@images/reservation/bupet.png";
import IMG_ROOM5 from "@images/reservation/susino.png";

import IMG_PARTYROOM1 from "@images/reservation/party_middle12.png";
import IMG_PARTYROOM2 from "@images/reservation/party_small11.png";
import IMG_PARTYROOM3 from "@images/reservation/party_small3.png";

import CHECK_ICON from "@icons/check_white.png";

type SelectDiningrProps = {
    selectData:any;
    activeIndex:any;
    onClickSelectDining(data:any): void;
};

const SelectDining: React.FC<SelectDiningrProps> = ({ selectData,activeIndex,onClickSelectDining}) => {
 
    React.useEffect(() => {
  
    }, []);
  

    const rooms = [
      {
        code : 'code1',
        label: '성원정',
        icon: IMG_ROOM1
      },
      {
        code : 'code2',
        label: '아뜰리에',
        icon: IMG_ROOM2
      },
      {
        code : 'code3',
        label: '레스토랑',
        icon: IMG_ROOM3
      },
      {
        code : 'code4',
        label: '뷔폐',
        icon: IMG_ROOM4
      },
      {
        code : 'code5',
        label: '스시노칸도',
        icon: IMG_ROOM5
      },
    ];

    const partyRooms = [
      {
        code : 'code1',
        label: '중규모연회장(12층',
        icon: IMG_PARTYROOM1
      },
      {
        code : 'code2',
        label: '소규모연회장(11층)',
        icon: IMG_PARTYROOM2
      },
      {
        code : 'code3',
        label: '소규모연호장(3층)',
        icon: IMG_PARTYROOM3
      },
    ];

    return (
        <Box sx={{display:'flex',flexDirection:'row',alignItems:'space-evenly'}}>
          {
            activeIndex == 1 ?
            partyRooms.map((item:any,index:number) => {
              return (
                <Box
                  key={index}
                  sx={styles.commonDataWrap}
                  onClick={()=>onClickSelectDining(item)}
                >
                  <Image 
                    src={item.icon}  
                    alt="slide" 
                    style={{
                      width:'100%', height:'100%',
                      objectFit: 'cover',
                      opacity:0.5
                    }}
                  />
                    <Box sx={{...styles.commonBoxWrap,backgroundColor:selectData == item.code ?'#f84040' : '#fff'}}>
                      <Typography variant="sourceHanSans" sx={{letterSpacing:-1,color:selectData == item.code?'#fff': '#242424'}}>{item.label}</Typography>
                    </Box>
                    {
                      selectData == item.code && (
                      <Box sx={styles.checkWrap2}>
                        <Image 
                          src={CHECK_ICON}  
                          alt="slide" 
                          style={{
                            width:'40px', height:'40px',
                            objectFit: 'contain'
                          }}
                        />
                      </Box>
                      )
                    }
                </Box>
              )
           })
            :
            rooms.map((item:any,index:number) => {
              return (
                <Box
                  key={index}
                  sx={styles.commonDataWrap}
                  onClick={()=>onClickSelectDining(item)}
                >
                  <Image 
                    src={item.icon}  
                    alt="slide" 
                    style={{
                      width:'100%', height:'100%',
                      objectFit: 'cover',
                      opacity:0.5
                    }}
                  />
                    <Box sx={{...styles.commonBoxWrap,backgroundColor:selectData == item.code ?'#f84040' : '#fff'}}>
                      <Typography variant="sourceHanSans" sx={{letterSpacing:-1,color:selectData == item.code?'#fff': '#242424'}}>{item.label}</Typography>
                    </Box>
                    {
                      selectData == item.code && (
                      <Box sx={styles.checkWrap}>
                        <Image 
                          src={CHECK_ICON}  
                          alt="slide" 
                          style={{
                            width:'30px', height:'30px',
                            objectFit: 'contain'
                          }}
                        />
                      </Box>
                      )
                    }
                </Box>
              )
           })
          }
        </Box>
    );
  }

  const styles = {

    commonDataWrap : {
      position:'relative',display:'flex',flexDirection:'column',width:'100px',justifyContent:'center',alignItems:'center',marginRight:"5px"
    },
    commonBoxWrap :{
      border:'1px solid #dcdcdc',borderTopRadius:'5px',borderBottomRadius:'5px',width:'100%',minHeight:'30px',display:'flex',justifyContent:'center',alignItems:'center'
    },
    checkWrap : {
      position:'absolute',left:0,top:0,width:'100%',height:'100%',display:'flex',justifyContent:'center',pt:'10px',zIndex:3,border:'2px solid #f84040',borderRadius:'5px'
    },
    checkWrap2 : {
      position:'absolute',left:0,top:0,width:'100%',height:'100%',display:'flex',justifyContent:'center',pt:'30px',zIndex:3,border:'2px solid #f84040',borderRadius:'5px'
    }
  }
  export default SelectDining;