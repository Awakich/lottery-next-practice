import type { NextPage } from 'next'
import { useContract, useAddress, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Head from 'next/head'
import Header from '../components/Header'
import Login from '../components/Login'
import Loading from '../components/Loading'
import CountTimer from '../components/CountTimer'
import toast from 'react-hot-toast'
import Marquee from 'react-fast-marquee'
import AdminControl from '../components/AdminControl'

const Home: NextPage = () => {

  const address = useAddress()

  const [userTickets, setUserTickets] = useState(0)

  const [quantity, setQuantity] = useState<number>(1)

  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)

  const { data: remainingTickets } = useContractRead(contract, "RemainingTickets")

  const { data: currentWiningReward } = useContractRead(contract, "CurrentWinningReward")

  const { data: ticketPrice } = useContractRead(contract, "ticketPrice")

  const { data: ticketCommision } = useContractRead(contract, "ticketCommission")

  const { data: expirarion } = useContractRead(contract, "expiration")

  const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets")

  const { data: getTickets } = useContractRead(contract, "getTickets")

  const { data: winings } = useContractRead(contract, "getWinningsForAddress", address)

  const { mutateAsync: WithdrawWinnings } = useContractWrite(contract, "WithdrawWinnings")

  const { data: lastWinner } = useContractRead(contract, "lastWinner")

  const { data: lastWinnerAmount } = useContractRead(contract, "lastWinnerAmount")

  const { data: lotteryOperator } = useContractRead(contract, "lotteryOperator")

  const onWithDrawWiningsHandler = async () => {
    const notification = toast.loading('Withdrawing winings...')

    try {
      const data = await WithdrawWinnings([{}]);

      toast.success('Winings withdraw succesfully!', {
        id: notification
      })
    } catch (err) {
      toast.error('Whoops something went wrong', {
        id: notification
      })
      console.log(err)
    }
  }

  useEffect(() => {
    if (!getTickets) return

    const totalTickets: string[] = getTickets

    const noOfUserTickets = totalTickets.reduce((total, ticketAddress) => (ticketAddress === address ? total + 1 : total), 0)

    setUserTickets(noOfUserTickets)

  }, [getTickets, address])



  const handlerClick = async () => {
    if (!ticketPrice) return

    const notification = toast.loading('Buying your tickets...')

    try {
      const data = await BuyTickets(
        [
          {
            value: ethers.utils.parseEther(
              (Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString()
            ),
          },
        ])

      toast.success('Tickets purchased successfully', {
        id: notification
      })

    } catch (err) {
      toast.error('Whoops something went wrong', {
        id: notification
      })
      console.log(err)
    }
  }

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
        <Marquee className='bg-[#0a1f1c] p-5 mb-5' gradient={false} speed={100}>
          <div className='flex space-x-2 mx-10'>
            <h4 className='font-bold text-white'>Last Winner {lastWinner?.toString()}</h4>
            <h4 className='font-bold text-white'>Previous winings: {lastWinnerAmount && ethers.utils.formatEther(lastWinnerAmount?.toString())} MATIC</h4>
          </div>
        </Marquee>

        {lotteryOperator === address && (
          <div className='flex justify-center'>
            <AdminControl/>
          </div>
        )}

        {winings > 0 && (
          <div className='max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5'>
            <button onClick={onWithDrawWiningsHandler} className='p-5 bg-green-900 text-white text-center rounded-xl w-full'>
              <p className='font-bold'>Winneeeer!</p>
              <p>Total Winings: {ethers.utils.formatEther(winings.toString())} MATIC</p>
              <br />
              <p className='font-semibold'>Click here to withdraw</p>
            </button>
          </div>
        )}

        <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5  '>
          <div className='stats-container'>
            <h1 className='text-5xl text-white font-semibold text-center'>The Next Draw</h1>

            <div className='flex justify-between items-center p-2 space-x-2'>
              <div className='stats'>
                <h2 className='text-sm'>Total Pool</h2>
                <p className='text-xl'>{currentWiningReward && ethers.utils.formatEther(currentWiningReward.toString())} MATIC</p>
              </div>
              <div className='stats'>
                <h2 className='text-sm'>Tickets Remaining</h2>
                <p className='text-xl'>{remainingTickets?.toNumber()}</p>
              </div>
            </div>

            <div className="mb-3 mt-5">
              <CountTimer />
            </div>

          </div>

          <div className='stats-container space-y-2'>
            <div className='stats-container'>
              <div className='flex justify-between items-center pb-2 text-white'>
                <h2>Price per ticket</h2>
                <p>{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())} MATIC</p>
              </div>

              <div className='flex text-white items-center space-x-2 bg-[#091b18] border-[#004337] border p-4'>
                <p>TICKETS</p>
                <input className='flex w-full bg-transparent text-right outline-none' type="number"
                  min={1} max={10} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
              </div>

              <div className='space-y-2 mt-5'>
                <div className='flex items-center justify-between text-emerald-300 text-sm italic font-extrabold'>
                  <p>Total cost of tickets</p>
                  <p>{ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString()) * quantity)} MATIC</p>
                </div>

                <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
                  <p>Service fees</p>
                  <p>{ticketCommision && ethers.utils.formatEther(ticketCommision.toString())} MATIC</p>
                </div>

                <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
                  <p>+ Metwork Fees</p>
                  <p>TBC</p>
                </div>
              </div>

              <button onClick={handlerClick}
                disabled={expirarion?.toString() < Date.now().toString() || remainingTickets?.toNumber() === 0}
                className='mt-5 w-full bg-[#222] text-white shadow-xl disabled:bg-gray-600 disabled:cursor-not-allowed text-xl px-10 py-5 rounded-md'>
                Buy {quantity} tickets for {ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity} MATIC
              </button>
            </div>

            {userTickets > 0 && <div className='stats'>
              <p className='text-lg mb-2'>{userTickets} Tickets in this draw</p>
              <div className='flex max-w-sm flex-wrap gap-x-2 gap-y-2'>
                {Array(userTickets).fill("").map((_, index) => (
                  <p className='text-emerald-300 h-20 w-12 flex flex-col items-center justify-center text-xs italic' key={index}>{index + 1}</p>
                ))}
              </div>
            </div>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home