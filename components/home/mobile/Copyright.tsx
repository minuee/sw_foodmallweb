'use client'

import * as React from 'react';
import Link from "next/link"
import Image from 'next/image';
import styled from 'styled-components';
import { Typography,Box } from "@mui/material";
import { useTranslation } from 'next-i18next';
import theme from 'styles/theme';
import LogoImage from "@images/bi-color.png";
import { useStyles  } from 'styles/mobile/copyright';
type PopupCopyRightProps = {
    isMobile? : boolean,
}

const Copyright: React.FC<PopupCopyRightProps> = ({ isMobile = false}) => {
    const { t } = useTranslation(['common','yakwan']);
    const classes = useStyles();
    return (
        <CopyrightComponent theme={theme}>
            <DataComponent>
                <Box display={'flex'} flex={1} justifyContent={'center'} alignItems={'center'}>
                    <Image src={LogoImage} width={59*1.2} height={36*1.2} alt={'logo'} />
                </Box>
                <Box display={'flex'} flexDirection={'column'} flex={1.5} justifyContent={'center'} fontSize={"25px"}>
                    <Typography  variant="manrope" className={classes.textStyle1}>
                        CS CENTER
                    </Typography>
                    <Typography  variant="manrope" className={classes.textStyle2}>
                        1811-1811
                    </Typography>
                    <Typography  variant="sourceHanSans" className={classes.textStyle3}>
                        <span>CS 운영시간 :</span>오전10시~오후6시
                    </Typography>
                </Box>
            </DataComponent>
            <DataComponent>
                <Box display={'flex'} flex={1} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} fontSize={"25px"} padding={"0 20px"}>
                    <Typography  variant="sourceHanSans" className={classes.textStyle3}>
                        {t('common.menu.footer_menu_1')}
                    </Typography>
                    <Typography  variant="sourceHanSans" className={classes.textStyle3_2}>|</Typography>
                    <Typography  variant="sourceHanSans" className={classes.textStyle3}>
                        {t('common.menu.footer_menu_2')}
                    </Typography>
                    <Typography  variant="sourceHanSans" className={classes.textStyle3_2}>|</Typography>
                    <Typography  variant="sourceHanSans" className={classes.textStyle3}>
                        {t('common.menu.footer_menu_3')}
                    </Typography>
                    <Typography  variant="sourceHanSans" className={classes.textStyle3_2}>|</Typography>
                    <Typography  variant="sourceHanSans" className={classes.textStyle3}>
                        {t('common.menu.footer_menu_4')}
                    </Typography>
                </Box>
            </DataComponent>
            <DataComponent>
                <Box display={'flex'} flex={1} flexDirection={'column'} justifyContent={'space-around'} alignItems={'center'} fontSize={"25px"}>
                    <Typography  variant="sourceHanSans" className={classes.textStyle4}>
                        대표이사:정대원 | 사업자등록번호 : 01-85-39823 
                    </Typography>
                    <Typography  variant="sourceHanSans" className={classes.textStyle4}>
                        통신판매업신고 : 제2018-서울중구-1731호
                    </Typography>
                    <Typography  variant="sourceHanSans" className={classes.textStyle4}>
                        주소:서울특별시 중구 퇴계로 211-5 성원푸드몰 
                    </Typography>
                    <Typography  variant="sourceHanSans" className={classes.textStyle4}>
                        팩스:1811-1819 | 문의메일:reservation@swfoodmall.com
                    </Typography>
                    
                </Box>
            </DataComponent>
            <DataComponent>
                <Box fontSize={"25px"}>
                    <Typography  variant="sourceHanSans" className={classes.textCopyRight}>
                        {'Copyright © '}2024. FoodMall all rights reserved
                    </Typography>
                </Box>
                </DataComponent>
        </CopyrightComponent>
    )
}

const CopyrightComponent = styled.footer`
  display:flex;
  flex-direction:column;
  flex:1;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  background: #f7f7f7 0% 0% no-repeat padding-box;
  border-top: 1px solid #9f9f9f;
  width: 100%;

`;

const DataComponent = styled.footer`
  display:flex;
  flex:1;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  max-width: 624px;
`;
export default Copyright;