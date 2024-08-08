import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type SelectMemberProps = {
    selectAdult:any;
    selectChild:any;
    onClickSelectAdult(data:any): void;
    onClickSelectChild(data:any): void;
};

const SelectMember: React.FC<SelectMemberProps> = ({ selectAdult,selectChild,onClickSelectAdult,onClickSelectChild}) => {
 
    React.useEffect(() => {
  
    }, []);
  

    const addButton = [
      {
        code : '10',
        label: '+10',
      },
      {
        code : '20',
        label: '+20',
      },
      {
        code : '30',
        label: '+30',
      },
      {
        code : '50',
        label: '+50',
      },
      {
        code : '100',
        label: '+100',
      },
    ];

    const onClickAddAdult = (mode:string,val:number) => {
      if ( mode == "add" ) {
        onClickSelectAdult(val);
      }else if ( mode == "eachadd" ) {
        if ( selectAdult < 100 ) {
          onClickSelectAdult(selectAdult+val);
        }
      }else if ( mode == "eachminus" ) {
        if ( selectAdult > 0 ) {
          onClickSelectAdult(selectAdult-val);
        }
      }
    }

    const onClickAddChild = (mode:string,val:number) => {
      if ( mode == "add" ) {
        onClickSelectChild(val);
      }else if ( mode == "eachadd" ) {
        if ( selectChild < 100 ) {
          onClickSelectChild(selectChild+val);
        }
      }else if ( mode == "eachminus" ) {
        if ( selectChild > 0 ) {
          onClickSelectChild(selectChild-val);
        }
      }
    }

    return (
        <Box sx={{display:'flex',flexDirection:'column'}}>
          <Typography variant="caption">일반</Typography>
          <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-around',padding:'10px',marginBottom:2,border:'1px solid #ccc',borderRadius:'5px'}}>
              <Box sx={{display:'flex',flex:1}} onClick={()=>onClickAddAdult('eachminus',1)}>
                <RemoveIcon fontSize="medium" />
              </Box>
              <Box sx={{display:'flex',flex:10,justifyContent:'center',alignItems:'center'}}>
                <Typography variant="sourceHanSans" component={'h4'}>{selectAdult*1}</Typography>
              </Box>
              <Box sx={{display:'flex',flex:1}} onClick={()=>onClickAddAdult('eachadd',1)}>
                <AddIcon fontSize="medium" />
              </Box>
          </Box>
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'space-evenly',flexWrap:'wrap'}}>
            {
              addButton.map((item:any,index:number) => {
                return (
                  <Box
                    key={index}
                    sx={{position:'relative',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginRight:"5px",marginBottom:"5px"}}
                    
                  >
                    <Button
                        color={'inherit'}
                        sx={{maxWidth: '50px', maxHeight: '30px', minWidth: '40px', minHeight: '30px'}}
                        variant={'outlined'}
                        onClick={()=>onClickAddAdult('add',item.code*1)}
                    >
                        {item.label}
                    </Button>
                  </Box>
                )
              })
            }
          </Box>
          <Typography variant="caption">소인(~11세)</Typography>
          <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-around',padding:'10px',marginBottom:2,border:'1px solid #ccc',borderRadius:'5px'}}>
              <Box sx={{display:'flex',flex:1}} onClick={()=>onClickAddChild('eachminus',1)}>
                <RemoveIcon fontSize="medium" />
              </Box>
              <Box sx={{display:'flex',flex:10,justifyContent:'center',alignItems:'center'}}>
                <Typography variant="sourceHanSans" component={'h4'}>{selectChild*1}</Typography>
              </Box>
              <Box sx={{display:'flex',flex:1}} onClick={()=>onClickAddChild('eachadd',1)}>
                <AddIcon fontSize="medium" />
              </Box>
          </Box>
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'space-evenly',flexWrap:'wrap'}}>
            {
              addButton.map((item:any,index:number) => {
                return (
                  <Box
                    key={index}
                    sx={{position:'relative',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginRight:"5px",marginBottom:"5px"}}
                    
                  >
                    <Button
                        color={'inherit'}
                        //size='small'
                        sx={{maxWidth: '50px', maxHeight: '30px', minWidth: '40px', minHeight: '30px'}}
                        variant={'outlined'}
                        onClick={()=>onClickAddChild('add',item.code)}
                    >
                        {item.label}
                    </Button>
                  </Box>
                )
              })
            }
          </Box>
        </Box>
    );
  }

  export default SelectMember;