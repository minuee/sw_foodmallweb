
import { Box, Zoom, Typography,  } from "@mui/material";
import { useTranslation } from 'next-i18next';

const PopLayerAgree  = () => {
    const { t } = useTranslation('yakwan');
    return (
        <Box sx={styles.zommDataWrapper}>
            <Typography variant="sourceHanSans" sx={styles.textStyle01}>
            {t("agree_2.main_tltle_1")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle02}>
            {t("agree_2.msg_title_1_subtitle")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_1_msg_1")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_1_msg_2")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_2_msg_3")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_2_msg_4")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_2_msg_5")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_2_msg_6")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle02}>
            {t("agree_2.msg_title_2_subtitle")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_2_msg_1")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle02}>
            {t("agree_2.msg_title_3_subtitle")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_3_msg_1")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle02}>
            {t("agree_2.msg_title_4_subtitle")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_4_msg_1")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle02}>
            {t("agree_2.msg_title_5_subtitle")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_5_msg_1")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_5_msg_2")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_5_msg_3")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.msg_title_5_msg_4")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle01}>
            {t("agree_2.main_tltle_2")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle02}>
            {t("agree_2.main_title_2_subtitle")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.main_title_2_msg_1")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.main_title_2_msg_2")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_2.main_title_2_msg_3")}
            </Typography>
        </Box>
               
    )
}

const styles = {
    zommDataWrapper : {
        display:'flex',flexDirection:"column",width:'100%',height:'382px',padding:'15px',overflow:'scroll'
    },
    textStyle01 : {
        fontSize: "14px",fontWeight: "bold",fontStretch: "normal",fontStyle: "normal",lineHeight: "2",letterSpacing: "-0.28px",color: "#22201f",
    },
    textStyle02 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "2",letterSpacing: "-0.28px",color: "#22201f",paddingLeft:"5px"
    },
    textStyle03 : {
        fontSize: "14px",fontWeight: "500",fontStretch: "normal",fontStyle: "normal",lineHeight: "1.71",letterSpacing: "-0.28px",color: "#707070",paddingLeft:"15px"
    }
}

export default PopLayerAgree;
