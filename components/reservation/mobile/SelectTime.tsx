import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";


type SelectTimeProps = {
    selectHour:any;
    selectMinute:any;
    onClickSelectHour(data:any): void;
    onClickSelectMinute(data:any): void;
};

const SelectDining: React.FC<SelectTimeProps> = ({ selectHour,selectMinute,onClickSelectHour,onClickSelectMinute}) => {
 
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
    return (
        <Box sx={{display:'flex',flexDirection:'column'}}>
          <Typography variant="caption">시간</Typography>
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'space-evenly',flexWrap:'wrap'}}>
            {
              hours.map((item:any,index:number) => {
                return (
                  <Box
                    key={index}
                    sx={{position:'relative',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginRight:"5px",marginBottom:"5px"}}
                    
                  >
                    <Button
                        disabled={item.code == "10"}
                        color={item.code == selectHour ? "primary" : 'inherit'}
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
          <Typography variant="caption">분</Typography>
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'space-evenly',flexWrap:'wrap'}}>
            {
              minuteArray.map((item:any,index:number) => {
                return (
                  <Box
                    key={index}
                    sx={{position:'relative',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginRight:"5px",marginBottom:"5px"}}
                    
                  >
                    <Button
                        disabled={false}
                        color={item == selectMinute ? "primary" : 'inherit'}
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
        </Box>
    );
  }

  export default SelectDining;