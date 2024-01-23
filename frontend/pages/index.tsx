import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Maincomponent } from '@/components/Maincomponent'
import BaseLayout from '@/components/ui/layout/BaseLayout'
import { useweb3 } from '@/components/providers/web3'
import { useEffect } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // const { provider, ethereum, isLoading, contract } = useweb3();
  // useEffect(() => {

  //   const fetchAccounts = async () => {
  //     if (provider) {
  //       const res: string[] = await provider!.send("eth_requestAccounts", []);
  //       const signer = await provider.getSigner()
  //       // console.log("RESULT", res)
  //       // console.log("signer", signer)
  //       // console.log("ADDRESS -", signer.address)
  //     }
  //   }
  //   fetchAccounts();
  // }, [provider])


  // // console.log("ETHEREUM", ethereum)
  // // console.log("Contract", contract)

  // const getInfo = async () => {
  //   return await contract!.getAddress()
  // }
  // if (contract) console.log(getInfo())

  return (
    <BaseLayout>
      <Maincomponent />
    </BaseLayout>
  )
}
