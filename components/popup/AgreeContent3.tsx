
import { Box, Zoom, Typography,  } from "@mui/material";
import { useTranslation } from 'next-i18next';

const PopLayerAgree  = () => {
    const { t } = useTranslation('yakwan');
    return (
        <Box sx={styles.zommDataWrapper}>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.main_tltle")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle01}>
            {t("agree_3.main_subtitle_1")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            ·{t("agree_3.subtitle_1_msg_1")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_1_msg_2")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_1_msg_3")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_1_msg_4")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle01}>
            {t("agree_3.main_subtitle_2")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle02}>
            {t("agree_3.subtitle_2_msg_1")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            ·{t("agree_3.subtitle_2_submsg_1")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_2_submsg_2")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_2_submsg_3")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            ·{t("agree_3.subtitle_2_submsg_4")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_2_submsg_2")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_2_submsg_3")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            ·{t("agree_3.subtitle_2_submsg_5")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_2_submsg_6")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_2_submsg_3")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            ·{t("agree_3.subtitle_2_submsg_7")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_2_submsg_2")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_2_submsg_8")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            ·{t("agree_3.subtitle_2_submsg_9")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_2_submsg_10")}
            </Typography>
            <Typography variant="sourceHanSans" sx={styles.textStyle03}>
            {t("agree_3.subtitle_2_submsg_11")}
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
