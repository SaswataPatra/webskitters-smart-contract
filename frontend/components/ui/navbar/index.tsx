import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAccount, useContract, useNetwork } from '@/components/hooks'
import Link from 'next/link'
import Walletbar from './WalletBar'



const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

  export default function Navbar() {
    const { account } = useAccount();
    const {network} = useNetwork()
    
    const { contract } = useContract();
    // console.log("THIS IS CONTRACT",contract!.data?.getLatestGoldPrice().then((res: { toString: () => any })=>res.toString()))  

    useEffect(() => {
      const fetchLatestGoldPrice = async() => {
        try {
          if (contract !=undefined && contract.data!=undefined){
            console.log("Start fetching");
            console.log("THIS IS DATA", await contract.data.getLatestGoldPrice().then((res: { toString: () => any }) => res.toString()));
            console.log("End fetching");  
          }
         
        } catch (err) {
          console.warn("Error fetching latest gold price", err);
        }
      }
    
      console.log("Calling fetch function");
      fetchLatestGoldPrice();
      console.log("Finished calling fetch function");
    }, [contract.data]);

  // console.log("HELOOOOOO ", network)
  // console.log("Is Loading: ", account.isLoading);  
  // console.log("Is Installed: ", account.isInstalled);
  // console.log("ACCOUNT DETAILS", account.data)
  if (!account.isLoading && !account.isInstalled) {
    console.error("Need to install metamask")
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name}
                        href={item.href}


                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}

                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="text-gray-300 self-center mr-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-purple-800">
                    <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                    { network.isLoading ?
                      "Loading..." :
                      account.isInstalled ?
                      network.data :
                      "Install Web3 Wallet"
                    }
                  </span>
                </div>
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Walletbar isLoading={account.isLoading} isInstalled={account.isInstalled} account={account.data} connect={account.connect} />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

