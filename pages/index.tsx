import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { accessEnvirmentInfo,accessForceDesktop } from '@stores/envStore';
import { useRecoilState } from "recoil";
import Layout from "components/layout/index";
import HomeScreen from "components/home/index";
import HomeMobile from 'components/home/mobile';
import functions from '@utils/functions'

export default function Home() {
  const { t } = useTranslation(['common','yakwan']);
  const [accessInfo] = useRecoilState(accessEnvirmentInfo);
  const [forceDesktop] = useRecoilState(accessForceDesktop);

  const isGlobalDesktop = React.useMemo(() => {
    return functions.isGlobalDesktop(accessInfo.isDesktop, accessInfo.isTablet,forceDesktop)
  }, [accessInfo,forceDesktop]);
  
  if ( !isGlobalDesktop ) {
    return (
        <Layout>
          <HomeMobile />
        </Layout>
    );
  }else{
    return (
      <Layout>
        <HomeScreen />
      </Layout>
    );
  }
}

export async function getStaticProps({ locale = 'ko' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common','yakwan'])),
    },
  }
}