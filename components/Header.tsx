import Image from "next/image"
import Avatar from '../assets/images/avatar.jpg'
import NavButton from "./NavButton"
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid'
import { useAddress, useDisconnect } from "@thirdweb-dev/react"

const Header = () => {

    const address = useAddress()
    const disconnect = useDisconnect()

    return (
        <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-5">
            <div className="flex items-center space-x-2">
                <Image src={Avatar} alt="" className="rounded-full h-20 w-20" />
                <div>
                    <h1 className="text-lg text-white font-bold">Artem Draw</h1>
                    <p className="text-xs text-green-500 truncate">User: {address?.substring(0, 5)}...{address?.substring(address.length, address.length - 5)}</p>
                </div>
            </div>


            <div className="md:col-span-3 md:flex hidden items-center justify-center rounded-md">
                <div className="bg-[#0a1f1c] space-x-5">
                    <NavButton isActive title='Buy Ticket' />
                    <NavButton OnClick={disconnect} title='Logout' />
                </div>
            </div>

            <div className="flex flex-col ml-auto text-right">
                <Bars3BottomRightIcon className="h-8 text-white mx-auto cursor-pointer" />
                <span className="md:hidden">
                    <NavButton OnClick={disconnect} title="Logout" />
                </span>
            </div>


        </header>
    )
}

export default Header