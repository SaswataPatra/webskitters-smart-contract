
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { useContract } from "./hooks"
import { useWeb3 } from "./providers/web3"
import { ethers } from "ethers"
import { BigNumber } from 'bignumber.js';
import { error } from "console"
import { checkWindow } from "@/lib/utils"


export function Maincomponent() {
  const [goldPrice, setGoldPrice] = useState<string | null>(null)
  const { provider } = useWeb3()
  const { contract } = useContract();
  // console.log("SIGNER ")
  const handleSubmit = async (type: "BUY" | "SELL") => {
    try {
      // console.log( contract?.data)

      const amountElement: any = document.querySelector('#amount');
      const amount = ethers.parseEther(amountElement.value);
      // console.log("This is the amount", amount)


      // console.log(window.global)
      switch (type) {
        case 'BUY':
          try {

            if (contract && contract.data) {

              const tx_purchase = await contract.data.buyGoldTokens({ value: amount })
              // console.log( tx_purchase);

            }
          } catch (err) {
            console.error('Failed to buy:', err);
          }
          break;
        case 'SELL':
          try {
            if (contract && contract.data){
              const tx_sale = await contract.data.sellGoldToken(amount);
            // console.log(tx_sale);
            }
            
          } catch (err) {
            console.error('Failed to sell:', err);
          }
          break;
      }



    }
    catch (error) {
      console.warn("Some error has occured")
    }
  }
  //API TO FETCH GOLD PRICE 
  // useEffect(() => {
  //   const fetchGoldPrice = async () => {
  //     try {
  //       const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
  //         method: 'GET',
  //         headers: {
  //           'x-access-token': 'goldapi-5qygorlrq0ywfk-io'
  //         }
  //       });

  //       const jsonData = await response.json();
  //       setGoldPrice(jsonData.price);
  //     } catch (err) {
  //       console.warn("Error fetching gold price", err);
  //     }
  //   }
  //   fetchGoldPrice();
  // }, [goldPrice]);

  useEffect(() => {
    const fetchLatestGoldPrice = async () => {
      if (contract && contract.data) {
        try {

          const signer = await provider!.getSigner()

          // console.log("SIGNER :", signer)
          const fetchedPrice = await contract.data.getLatestGoldUsdPrice().then((res: { toString: () => any }) => res.toString());
          var finalPrice = new BigNumber(fetchedPrice).multipliedBy(Math.pow(10, -8))
          // console.log("This is the finalPrice", finalPrice.toString())
          setGoldPrice(finalPrice.toString());
        } catch (err) {
          console.warn("Error fetching latest gold price", err);
        }
      }
    }

    fetchLatestGoldPrice();
  }, [contract]);

  return (
    <main className="min-h-screen py-10 px-4 md:px-6">

      <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Buy/Sell</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" >
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" placeholder="Enter amount" />
              </div>
              <div className="space-y-2">
                <Label>Live Price of Gold in USD</Label>
                <p className="text-gray-900">{goldPrice}</p>
              </div>
              <div className="space-y-2">
                <Label>Wallet Balance</Label>
                <p className="text-gray-900">10,000.00 USD</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="range">Investment Range (0% - 100%)</Label>
                <Input className="w-full" id="range" max="100" min="0" type="range" />
              </div>
              <div className="flex gap-4">
                <Button type="button" className="flex-1 bg-amber-500 text-white" onClick={() => handleSubmit('BUY')}>Buy</Button>
                <Button type="button" className="flex-1 border-amber-500 text-amber-500" onClick={() => handleSubmit('SELL')} variant="outline">
                  Sell
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
      <section className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio & Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-01-10</TableCell>
                  <TableCell>Buy</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>$1,200.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-01-09</TableCell>
                  <TableCell>Sell</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>$1,199.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-01-08</TableCell>
                  <TableCell>Buy</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>$1,198.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
