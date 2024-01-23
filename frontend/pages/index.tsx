import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Maincomponent } from '@/components/Maincomponent'
import BaseLayout from '@/components/ui/layout/BaseLayout'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <BaseLayout>
      <Maincomponent />
    </BaseLayout>
  )
}
