import { useState } from "react";
import { CgSpinnerTwo } from 'react-icons/cg'

export default function Button({ loading, text, icon: Icon, ...props }) {

    const [ input, setInput ] = useState();
    
    return (
        <div className=''>
            <button 
              className='bg-black border border-black active:ring-neutral-800 flex justify-center items-center w-full p-4 gap-2 rounded-md'
              type="submit"
              disabled={ loading ? true : false }
              {...props}
            >

              {!loading && <>
                {Icon && <div className='rounded-md'>
                  <Icon className="text-lg font-bold text-white"/>
                </div>}

                <span className="text-white text-sm font-bold">{text}</span>
              </>}

              {loading && <CgSpinnerTwo className="text-white animate-spin" />}         

            </button>
        </div>
    );
}