import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { accessEnvirmentInfo,accessForceDesktop } from '@stores/envStore';
import { useRecoilState } from "recoil";
import Layout from "components/layout/index";
import NoticeScreen from "components/notice/mobile";
import functions from '@utils/functions';

export default function Notice() {
  const { t } = useTranslation(['common','yakwan']);
  const [accessInfo] = useRecoilState(accessEnvirmentInfo);
  const [forceDesktop] = useRecoilState(accessForceDesktop);

  const isGlobalDesktop = React.useMemo(() => {
    return functions.isGlobalDesktop(accessInfo.isDesktop, accessInfo.isTablet,forceDesktop)
  }, [accessInfo,forceDesktop]);
  
  if ( !isGlobalDesktop ) {
    return (
        <Layout>
          <NoticeScreen />
        </Layout>
    );
  }else{
    return (
      <Layout>
        <NoticeScreen />
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