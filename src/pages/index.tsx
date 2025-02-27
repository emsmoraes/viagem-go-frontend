'use client'

import { GetServerSideProps } from 'next'
import { useTranslations } from 'next-intl'
import { getMessages } from '../utils/i18n'

export default function HomePage() {
  const t = useTranslations('common')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold">{t('greeting')}</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const selectedLocale = locale || 'en-US'
  const messages = await getMessages(selectedLocale)

  return {
    props: {
      messages,
      locale: selectedLocale,
    },
  }
}
