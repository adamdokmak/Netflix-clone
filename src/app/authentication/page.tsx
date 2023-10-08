import {Metadata} from "next";
import {ImSpinner2} from "react-icons/im";

export const metadata: Metadata = {
    title: 'Authtenticating...'
}

export default function Page() {
    return (<div className='flex items-center justify-center w-screen h-screen bg-[#181818]'>
        <ImSpinner2 className='w-[100px] h-[100px] text-red-500 animate-spin'/>
    </div>)
}