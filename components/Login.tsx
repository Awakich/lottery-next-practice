import Image from "next/image"
import Avatar from '../assets/images/avatar.jpg'
import { useMetamask } from '@thirdweb-dev/react'

const Login = () => {

    const connectMetamask = useMetamask()

    return (
        <div className="min-h-screen bg-[#091b18] flex flex-col justify-center items-center text-center">
            <div className="flex flex-col items-center mb-10">
                <Image src={Avatar} alt="" className="rounded-full h-56 w-56 mb-10" />
                <h1 className="text-6xl text-white font-bold">Artem Draw</h1>
                <button className="bg-white px-6 py-3 rounded-lg font-bold mt-10" onClick={connectMetamask}>Login with Metamask</button>
            </div>
        </div>
    )
}

export default Login