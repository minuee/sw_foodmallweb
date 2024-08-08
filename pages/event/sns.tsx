import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from "components/layout/index";

import SNS from "components/information/sns"


export default function ScrollableTabsButtonAuto() {
    const { t } = useTranslation(['common','yakwan']);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Layout>
            <SNS />
        </Layout>
    );
}

export async function getStaticProps({locale = 'ko'}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common','yakwan'])),
      },
    }
}