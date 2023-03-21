import fetchData from "@/hooks/fetchData";
import { useRouter } from "next/router";
import { MdArrowBackIos, MdExitToApp } from "react-icons/md";

export default function Navbar({ noBack, text }) {

    const router = useRouter();

    const handleLogout = async() => {
      const { status } = await fetchData('/api/logout');

      if(status === 2){
        localStorage.setItem('luvo_user', '');
        router.push('/login');
      }
    }

    return (
      <div className='flex justify-between items-center p-3'>
        <MdArrowBackIos 
          className={`${noBack ? "invisible" : "visible" } text-neutral-800 text-xl`}
          onClick={() => router.back()} 
        />

        <p className='text-center font-bold capitalize'>{text}</p>

        <MdExitToApp
          className="text-neutral-800 text-xl"
          onClick={handleLogout} 
        />
      </div>
    )
}