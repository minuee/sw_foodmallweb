import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useStyles  } from 'styles/desktop/header';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useTranslation } from 'next-i18next';
import functions from '@utils/functions';
import { globalDropDownLocale } from '@stores/layoutStore';
import { useRecoilState } from 'recoil';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Dropdown from 'components/common/Dropdown';

type HeaderLangProps = {
    locale? : any,
    handleLocaleChange: (str: string) => void | undefined;
};

const LangPopupState: React.FC<HeaderLangProps> = ({ locale = 'ko', handleLocaleChange}) => {

    const { t } = useTranslation(['common','yakwan']);
    const classes = useStyles();
    const [visibilityAnimation, setVisibilityAnimation] = React.useState(false);
    const [repeat, setRepeat] = React.useState(null);
    const [dropdownVisibility, setDropdownVisibility] = useRecoilState(globalDropDownLocale);
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState:any) => (
            <Box>
                <Box 
                    sx={dropdownVisibility ? styles.wrapper2 :styles.wrapper}
                    {...bindTrigger(popupState)}
                    onClick={() => setDropdownVisibility(!dropdownVisibility)}
                >
                   <Typography  variant="manrope" className={classes.textStyle1}>
                        {functions.convertLocale(locale)}
                    </Typography>
                    {
                    dropdownVisibility
                    ?
                    <KeyboardArrowUpIcon fontSize="small" sx={{color:'#fff'}} />
                    :
                    <KeyboardArrowDownIcon fontSize="small" sx={{color:'#fff'}} />
                    }
                    
                </Box>
                <Box 
                    sx={{position:'absolute',top:"40px",right:"146px",display:'flex',justifyContent:'center',alignItems:'center',width: "74px",height: "170px",zIndex:1, borderTopColor:'#fff', borderTopWidth:'1px'}}
                    onClick={() => setDropdownVisibility(!dropdownVisibility)}
                >   
                        <Dropdown visibility={dropdownVisibility}>
                        <ul>
                            <Box sx={styles.dropWrapper}> 
                                <Box sx={styles.commonBox} onClick={()=>{handleLocaleChange('ko')}}>
                                    <Typography  variant="manrope" sx={styles.textStyle2}>
                                        {t("locale.locale_kr")}
                                    </Typography>
                                </Box>
                                <Box sx={styles.commonBox} onClick={()=>{handleLocaleChange('en')}}>
                                    <Typography  variant="manrope" sx={styles.textStyle2}>
                                        {t("locale.locale_en")}
                                    </Typography>
                                </Box>
                                <Box sx={styles.commonBox} onClick={()=>{handleLocaleChange('ja');}}>
                                    <Typography  variant="manrope" sx={styles.textStyle2}>
                                        {t("locale.locale_ja")}
                                    </Typography>
                                </Box>
                                <Box sx={styles.commonBox} onClick={()=>{handleLocaleChange('zh-CN');}}>
                                    <Typography  variant="manrope" sx={styles.textStyle2}>
                                        {t("locale.locale_cn")}
                                    </Typography>
                                </Box>
                            </Box>
                        </ul>
                    </Dropdown>
                </Box>
            </Box>
        )}
        </PopupState>
    );
}

const styles = {
    wrapper : {
        width: "74px",height: "30px",padding: "4px 16px",display: 'flex',justifyContent:'center',alignItems:'center',zIndex:10,
        borderRadius: "15px", border: "solid 1px #e2e2e2",
    },
    wrapper2 : {
        width: "74px",height: "30px",padding: "4px 16px",display: 'flex',justifyContent:'center',alignItems:'center',zIndex:10,
        borderTopLeftRadius: "15px",borderTopRightRadius: "15px", border: "solid 0px #e2e2e2",opacity: "0.8",backgroundColor: "#242424"
    },
    dropWrapper : {
        backgroundColor:"rgba(36,36,36,0.8)",
        width:'100%',
        height:'auto',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderBottomLeftRadius: "15px",borderBottomRightRadius: "15px",
    },
    commonBox : {
        display:'flex',flexDirection:'column',justifyContent:'center',padding:"5px 0"
    },
    textStyle2 : {
        fontSize: "12px",
        fontWeight: "600",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "20px",
        letterSpacing: "normal",
        textAlign: "center",
        color: "#fff",
        "&:hover": { color: "#f84040" }
    }
}

export default LangPopupState