import * as React from 'react';
import { Box, Button, Paper, Typography } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useRouter } from "next/router";

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from "components/layout/index";
import Dining from "components/reservation/mobile/Dining";
import FandB from "components/reservation/mobile/FandB";
import Rooms from "components/reservation/mobile/Rooms";
import functions from '@utils/functions';

type ValuePiece = any | Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type PostPageQuery = {
    menu: string;
};

export default function Reservation() {
    const { t } = useTranslation(['common','yakwan']);
    const [value, setValue] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const router =  useRouter();
    const query =  router.query as PostPageQuery;

  
    React.useEffect(() => {
        if ( activeStep == 0 ) {
            if ( query.menu == 'fandb') {
                setValue(1)
            }else if ( query.menu == 'room') {
                setValue(2);
            }else{
                setValue(0)
            }
        }
    }, [query,activeStep]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if ( newValue != value ) {
            setValue(newValue);
            setActiveStep(0);
        }
    };


    return (
        <Layout>
            <Box height={'100vh'}>
                <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="icon label tabs example">
                    <Tab icon={<PhoneIcon />} label="Dining" />
                    <Tab icon={<FavoriteIcon />} label="F&B" />
                    <Tab icon={<PersonPinIcon />} label="객실" />
                </Tabs>
                <Box>
                    {
                        value == 1 ?
                        <FandB />
                        :
                        value == 2 ?
                        <Rooms />
                        :
                        <Dining />
                    }
                </Box>
            </Box>
        </Layout>
    );
}

export async function getStaticProps({locale = 'ko'}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    }
  }