import Link from "../extra/Link";

import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from "components/layout/index";
export default function About() {
  const { t } = useTranslation(['common','yakwan']);
  return (
    <Layout>
      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t('hello')}{t('messages.success.created')}
        </Typography>
        <Box sx={{ maxWidth: "sm",mb:10 }}>
          <Button variant="contained" component={Link} noLinkStyle href="/">
          {t('gotohome')}
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}

export async function getStaticProps({locale = 'ko'}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common','yakwan'])),
    },
  }
}
