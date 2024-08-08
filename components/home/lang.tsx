import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useStyles  } from 'styles/desktop/header';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useTranslation } from 'next-i18next';
import functions from '@utils/functions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
type HeaderLangProps = {
    locale? : any,
    handleLocaleChange: (str: string) => void | undefined;
};

const LangPopupState: React.FC<HeaderLangProps> = ({ locale = 'ko', handleLocaleChange}) => {

    const { t } = useTranslation(['common','yakwan']);
    const classes = useStyles();
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState:any) => (
            <Box>
                <Box 
                    sx={{width: "74px",height: "30px",padding: "4px 16px",borderRadius: "15px", border: "solid 1px #e2e2e2",display:'flex',justifyContent:'center',alignItems:'center'}}
                    {...bindTrigger(popupState)}
                >
                   <Typography  variant="manrope" className={classes.textStyle1}>
                        {functions.convertLocale(locale)}
                    </Typography>
                    {
                    popupState.isOpen
                    ?
                    <KeyboardArrowUpIcon fontSize="small" sx={{color:'#fff'}} />
                    :
                    <KeyboardArrowDownIcon fontSize="small" sx={{color:'#fff'}} />
                    }
                    
                </Box>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={()=>{handleLocaleChange('ko');popupState.close();}}>
                        <Typography  variant="manrope" className={classes.textStyle2} sx={{ "&:hover": { color: "#f84040" } }}>{t("locale.locale_kr")}</Typography>
                    </MenuItem>
                    <MenuItem onClick={()=>{popupState.close();handleLocaleChange('en');}}>
                        <Typography  variant="manrope" className={classes.textStyle2} sx={{ "&:hover": { color: "#f84040" } }}>{t("locale.locale_en")}</Typography>
                    </MenuItem>
                    <MenuItem onClick={()=>{popupState.close();handleLocaleChange('ja');}}>
                        <Typography  variant="manrope" className={classes.textStyle2} sx={{ "&:hover": { color: "#f84040" } }}>{t("locale.locale_ja")}</Typography>
                    </MenuItem>
                    <MenuItem onClick={()=>{popupState.close();handleLocaleChange('zh-CN');}}>
                        <Typography  variant="manrope" className={classes.textStyle2} sx={{ "&:hover": { color: "#f84040" } }}>{t("locale.locale_cn")}</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        )}
        </PopupState>
    );
}

export default LangPopupState