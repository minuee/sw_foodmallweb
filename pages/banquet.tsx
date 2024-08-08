import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { accessEnvirmentInfo,accessForceDesktop } from '@stores/envStore';
import { useRecoilState } from "recoil";
import Layout from "components/layout/index";
import BanquetMobileScreen from "components/banquet/mobile/index";
import BanquetScreen from "components/banquet/index";
import functions from '@utils/functions'

export default function Banquet() {
  const { t } = useTranslation(['common','yakwan']);
  const [accessInfo] = useRecoilState(accessEnvirmentInfo);
  const [forceDesktop] = useRecoilState(accessForceDesktop);

  const isGlobalDesktop = React.useMemo(() => {
    return functions.isGlobalDesktop(accessInfo.isDesktop, accessInfo.isTablet,forceDesktop)
  }, [accessInfo,forceDesktop]);
  
  if ( !isGlobalDesktop ) {
    return (
        <Layout>
          <BanquetMobileScreen />
        </Layout>
    );
  }else{
    return (
      <Layout>
        <BanquetScreen />
      </Layout>
    );
  }
}


export async function getStaticProps({locale = 'ko'}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common','yakwan'])),
    },
  }
}