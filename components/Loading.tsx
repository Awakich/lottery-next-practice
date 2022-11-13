import Avatar from '../assets/images/avatar.jpg'
import BarLoader from 'react-spinners/BarLoader'
import Image from 'next/image'
const Loading = () => {
  return (
      <div className='bg-[#091b18] min-h-screen flex flex-col items-center justify-center'>
          <div className='flex items-center space-x-2 mb-10'>
              <Image alt="" src={Avatar} className="rounded-full h-20 w-20" />
              <h1 className='text-lg text-white font-bold'>Loading the Artem Draw</h1>
          </div>
          <BarLoader color='white' />
      </div>
  )
}

export default Loading