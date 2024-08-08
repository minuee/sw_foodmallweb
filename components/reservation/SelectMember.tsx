import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type SelectMemberProps = {
    selectAdult:any;
    selectChild:any;
    onClickSelectAdult(data:any): void;
    onClickSelectChild(data:any): void;
};

const SelectMember: React.FC<SelectMemberProps> = ({ selectAdult,selectChild,onClickSelectAdult,onClickSelectChild}) => {
  const { t } = useTranslation(['common','yakwan']);
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
    <Box sx={styles.wrapper}>
      <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.title_step_4_1")}</Typography>
        <Box sx={styles.partWrapper}>
          <Box sx={styles.iconWrapper} onClick={()=>onClickAddAdult('eachminus',1)}>
            <RemoveIcon fontSize="medium" />
          </Box>
          <Box sx={styles.dataWrapper}>
            <Typography variant="sourceHanSans" component={'h4'}>{selectAdult*1}</Typography>
          </Box>
          <Box sx={styles.iconWrapper} onClick={()=>onClickAddAdult('eachadd',1)}>
            <AddIcon fontSize="medium" />
          </Box>
        </Box>
        <Box sx={styles.adultWrapper}>
          {
            addButton.map((item:any,index:number) => {
              return (
                <Box
                  key={index}
                  sx={{...styles.buttonWrapper,marginRight: index == 4 ? 0 : "5px",marginBottom:"5px"}}
                >
                  <Button
                    color={'inherit'}
                    sx={styles.buttonStyle}
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
          <Typography variant="sourceHanSans" sx={styles.menuTextStyle}>{t("reservation.title_step_4_2_add")}</Typography>
          <Box sx={styles.partWrapper}>
              <Box sx={styles.iconWrapper} onClick={()=>onClickAddChild('eachminus',1)}>
                <RemoveIcon fontSize="medium" />
              </Box>
              <Box sx={styles.dataWrapper}>
                <Typography variant="sourceHanSans" component={'h4'}>{selectChild*1}</Typography>
              </Box>
              <Box sx={styles.iconWrapper} onClick={()=>onClickAddChild('eachadd',1)}>
                <AddIcon fontSize="medium" />
              </Box>
          </Box>
          <Box sx={styles.childWrapper}>
            {
              addButton.map((item:any,index:number) => {
                return (
                  <Box
                    key={index}
                    sx={{...styles.buttonWrapper2,marginRight:index == 4 ? 0 : "5px",marginBottom:"5px"}}
                  >
                    <Button
                        color={'inherit'}
                        //size='small'
                        sx={styles.buttonStyle}
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


  const styles = {
    wrapper : {
      display:'flex',flexDirection:'column',width:'100%'
    },
    partWrapper : {
      display:'flex',flexDirection:'row',justifyContent:'space-around',padding:'10px',marginBottom:2,border:'1px solid #ccc',borderRadius:'5px'
    },
    iconWrapper : {
      display:'flex',flex:1
    },
    dataWrapper : {
      display:'flex',flex:10,justifyContent:'center',alignItems:'center'
    },
    adultWrapper : {
      display:'flex',flexDirection:'row',alignItems:'space-evenly',flexWrap:'wrap',width:'100%',marginBottom:"25px"
    },
    buttonWrapper : {
      flex:1,position:'relative',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'
    },
    buttonStyle : {
      width:'100%', maxHeight: '30px', minHeight: '30px'
    },
    childWrapper : {
      display:'flex',flexDirection:'row',alignItems:'space-evenly',flexWrap:'wrap'
    },
    buttonWrapper2 : {
      flex:1,position:'relative',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'
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

  export default SelectMember;