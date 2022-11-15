import { StarIcon, ArrowPathIcon, ArrowsUpDownIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'

const AdminControl = () => {

    const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)

    const { data: totalCommision } = useContractRead(contract, "operatorTotalCommission")

    const { mutateAsync: DrawWinnerTicket } = useContractWrite(contract, "DrawWinnerTicket")

    const { mutateAsync: restartDraw } = useContractWrite(contract, "restartDraw")

    const { mutateAsync: WithdrawCommission } = useContractWrite(contract, "WithdrawCommission")

    const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll")


    const drawWinner = async () => {
        const notification = toast.loading('Picking Lucky Winner')

        try {
            const data = await DrawWinnerTicket([{}])

            toast.success('A Winner has been selected', {
                id: notification
            })
            console.log('All contract', data)

        } catch (err) {
            toast.error('Whoops something went wrong', {
                id: notification
            })
            console.log(err)
        }
    }

    const onWithDrawCommision = async () => {
        const notification = toast.loading('WithDraw Commision...')

        try {
            const data = await WithdrawCommission([{}])

            toast.success('Your commision has been withdraw succesfully', {
                id: notification
            })
            console.log('All contract', data)

        } catch (err) {
            toast.error('Whoops something went wrong', {
                id: notification
            })
            console.log(err)
        }
    }

    const onRestartDraw = async () => {
        const notification = toast.loading('Restarting draw...')

        try {
            const data = await restartDraw([{}])

            toast.success('Draw restarted succesfully', {
                id: notification
            })
            console.log('All contract', data)

        } catch (err) {
            toast.error('Whoops something went wrong', {
                id: notification
            })
            console.log(err)
        }
    }

    const onRefundAll = async () => {
        const notification = toast.loading('Refunding...')

        try {
            const data = await RefundAll([{}])

            toast.success('All refunded succesfully', {
                id: notification
            })
            console.log('All contract', data)

        } catch (err) {
            toast.error('Whoops something went wrong', {
                id: notification
            })
            console.log(err)
        }
    }

    return (
        <div className='text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border'>
            <h2 className='font-bold'>Admin Controls</h2>
            <p className='mb-5'>Total Commission to be withdraw: {totalCommision && ethers.utils.formatEther(totalCommision?.toString())} MATIC</p>

            <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
                <button onClick={drawWinner} className='admin_button'>
                    <StarIcon className='h-6 mx-auto mb-2' />
                    Draw Winner
                </button>

                <button onClick={onWithDrawCommision} className='admin_button'>
                    <CurrencyDollarIcon className='h-6 mx-auto mb-2' />
                    WithDraw Commision
                </button>

                <button onClick={onRestartDraw} className='admin_button'>
                    <ArrowPathIcon className='h-6 mx-auto mb-2' />
                    Restart Draw
                </button>

                <button onClick={onRefundAll} className='admin_button'>
                    <ArrowsUpDownIcon className='h-6 mx-auto mb-2' />
                    Reefund All
                </button>
            </div>
        </div>
    )
}

export default AdminControl