import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import { useMetamask, useContract, useDisconnect, useAddress, useContractMetadata } from '@thirdweb-dev/react'
import Login from '../components/Login'
import Loading from '../components/Loading'
import { useState } from 'react'

const Home: NextPage = () => {

  const address = useAddress()
  const [quantity, setQuantity] = useState<number>()
  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)

  if (isLoading) return <Loading />

  if (!address) return <Login />

  return (
    <div className="min-h-screen flex flex-col bg-[#091b18]">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex-1'>
        <Header />

        <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5 max-w-6xl'>
          <div className='stats-container'>
            <h1 className='text-5xl text-white font-semibold text-center'>The Next Draw</h1>

            <div className='flex justify-between items-center p-2 space-x-2'>
              <div className='stats'>
                <h2 className='text-sm'>Total Pool</h2>
                <p className='text-xl'>0.1 MATIC</p>
              </div>
              <div className='stats'>
                <h2 className='text-sm'>Tickets Remaining</h2>
                <p className='text-xl'>100</p>
              </div>
            </div>

          </div>

          <div className='stats-container space-y-2'>
            <div className='stats-container'>
              <div className='flex justify-between items-center pb-2 text-white'>
                <h2>Price per ticket</h2>
                <p>0.01 MATIC</p>
              </div>

              <div className='flex text-white items-center space-x-2 bg-[#091b18] border-[#004337] border p-4'>
                <p>TICKETS</p>
                <input className='flex w-full bg-transparent text-right outline-none' type="number" min={1} max={10} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
              </div>

              <div className='space-y-2 mt-5' ж>
                <div className='flex items-center justify-between text-emerald-300 text-sm italic font-extrabold'>
                  <p>Total cost of tickets</p>
                  <p>0.999</p>
                </div>

                <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
                  <p>Service fees</p>
                  <p>0.001 MATIC</p>
                </div>

                <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
                  <p>+ Metwork Fees</p>
                  <p>TBC</p>
                </div>
              </div>

              <button className='mt-5 w-full bg-[#222] text-white shadow-xl disabled:bg-gray-600 disabled:cursor-not-allowed text-xl px-10 py-5 rounded-md'>Buy Tickets</button>

            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  )
}

export default Home