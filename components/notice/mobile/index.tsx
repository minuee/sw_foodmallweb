import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Notice from "components/information/notice";
import Access from "components/information/access";
import Event from "components/information/event";
import ContactUs from "components/information/contactus";

export default function ScrollableTabsButtonAuto() {
    const { t } = useTranslation(['common','yakwan']);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ maxWidth:'100vw', bgcolor: 'background.paper' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="icon label tabs example"
                TabIndicatorProps={{
                    style: { background: "#f84040" }
                }} // indicator color
                style={{height: "40px"}}
            >
                <Tab label="공지사항" />
                <Tab label="오시는길" />
                <Tab label="FAQ" />
                <Tab label="이벤트" />
                <Tab label="연락처" />
            </Tabs>
            {
                value == 1 ?
                <Access />
                :
                value == 2 ?
                <Notice />
                :
                value == 3 ?
                <Event />
                :
                value == 4 ?
                <ContactUs />
                :
                <Notice />
            }
        </Box>
    );
}

export async function getStaticProps({locale = 'ko'}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    }
}