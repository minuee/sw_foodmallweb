
import * as React from 'react';
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';

import SAMPLE_IMG from "@images/banquet/sample_event.png";

import Divider from '@mui/material/Divider';
const myArray = new Array(1, 2, 3, 4,5);

export default function Event() {
    const { t } = useTranslation(['common','yakwan']);
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box sx={{ maxWidth:'100vw',padding:'10px',bgcolor: 'background.paper',zIndex:1  }}>
            <Typography variant="sourceHanSans" sx={{color:'#555',fontSize:'1.5em',lineHeight:'2em'}}>
                Event
            </Typography>
            <Box sx={styles.tabsWrapper}>
              <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>진행중 이벤트</Typography></Divider>
              <Box sx={styles.eventOuterWrap}>
                  {   
                    myArray.map((item:any,index:number) => {
                      return (
                        <Box sx={styles.eventWrapper} key={index}>
                          <Image 
                              src={SAMPLE_IMG}  
                              alt="table" 
                              style={{width:'100%',height:'100%',objectFit: 'contain',marginBottom:'5px'}}
                          />
                          <Typography sx={styles.helpText2}>이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트</Typography>
                          <Typography sx={styles.helpText2_2}>2024.01.01 ~ 2024.12.31</Typography>
                        </Box>
                      )
                    })
                  }
              </Box>
              <Divider textAlign="left"><Typography sx={styles.popupSubTitle}>완료 이벤트</Typography></Divider>
              <Box sx={styles.eventOuterWrap}>
                  {   
                    myArray.map((item:any,index:number) => {
                      return (
                        <Box sx={styles.eventWrapper} key={index}>
                          <Image 
                              src={SAMPLE_IMG}  
                              alt="table" 
                              style={{width:'100%',height:'100%',objectFit: 'contain',marginBottom:'5px'}}
                          />
                          <Typography sx={styles.helpText2}>이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트이벤트</Typography>
                          <Typography sx={styles.helpText2_2}>2024.01.01 ~ 2024.12.31</Typography>
                        </Box>
                      )
                    })
                  }
              </Box>
          </Box>
        </Box>
    );
}


const styles = {
  tabsWrapper: {
    display:'flex',flexDirection:'column',widht:'100%',height:'100%',overflowY:'scroll',padding:'10px 0'
  },
  popupSubTitle : {
    fontFamily: 'SourceHanSans',
    fontSize: '0.9em',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: "2em",
    color: '#22201f'
  },
  eventOuterWrap : {
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
    gap: "5px 10px",
  },
  eventWrapper: {
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'flex-start',
      minWidth:'100px',
      maxWidth:'300px',
      marginBottom:'10px',
      marginRight:'10px',
      "&:nth-last-child(1)": {
        maxWidth:'100%'
      }
  },
  helpText : {
    fontFamily: 'SourceHanSans',
    fontSize: '0.8em',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: "1.5em",
    color:'#b2b2b2'
  },
  helpTextRed : {
      fontFamily: 'SourceHanSans',
      fontSize: '0.8em',
      fontWeight: '500',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: "1.5em",
      color:'#f84040',
      paddingLeft:'4px'
  },
  helpText2 : {
      fontFamily: 'SourceHanSans',
      fontSize: '0.8em',
      fontWeight: '500',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: "1.5em",
      color:'#22201f',
  },
  helpText2_2 : {
      fontFamily: 'SourceHanSans',
      fontSize: '0.7em',
      fontWeight: '500',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: "1em",
      color:'#b2b2b2',
  },
}
