import fetchData from "@/hooks/fetchData";
import { useState } from "react";
import { BiQrScan } from "react-icons/bi";
import Scan from "./Scan";

export default function Input({ 
    validateExists,
    validateBalance,
    validate,
    label,
    name,
    type,
    placeholder,
    allowScan,
    onChange,
    setTransTag,
    error,
    success,
    ...props 
}) {

    let controller;
    const [ loadScanner, setLoadScanner ] = useState(false);
    const [error2, setError] = useState("");
    const [success2, setSuccess] = useState("");

    const searchTag = async( value ) => {
    
        controller?.abort();
        if(value === "@" || !value) {
            setError(`${name} is not available`);
            setSuccess(false);
            return;
        }; 
        
        controller = new AbortController();
        let signal = controller.signal;
    
        const options = {
          method: 'POST',
          body: { [name]: value },
          signal
        }
    
        const { status, data } = await fetchData('/api/validate', options);
    
        if(status === 2){
          if(data){
            setError(`${name} is not available`);
            setSuccess(false);
            return;
          }
    
          setError(false);
          setSuccess(`${name} available`);
          return;
        }
    
        
    }
    
    const handleChange = (e) => {
        if(validateExists) searchTag(e.target.value);
        onChange(e);
    }
    
    return (
        <div className='space-y-1'>
            {label && <label className='font-bold text-xs'>{label}</label>}

            <div className={`${error2 && 'border-red-600'} ${success2 && '!border-green-600'} ${ props.disabled && 'bg-neutral-200' } bg-white border-2 border-neutral-200 flex gap-2 p-1 rounded-md`}>
              <input 
                className='block w-full p-3 text-sm !outline-none'
                placeholder={placeholder}
                name={name}
                type={type || "text"}
                {...props}
                onChange={handleChange}
              />

              {allowScan && 
                <>
                    <div onClick={() => setLoadScanner(true)} className='p-2 px-3 bg-purple-600 from-purple-600 to-emerald-400 grid place-content-center rounded-md'>
                        <BiQrScan
                            className="text-xl font-bold text-white"
                           
                        />
                    </div>
                    {loadScanner && 
                        <Scan 
                            setLoadScanner={setLoadScanner}
                            setTransTag={setTransTag}
                    />}
                </>
              }
            </div>

            {(error2 || error) && <p className="text-red-600 text-[.625rem] font-bold lowercase">{error2 || error}</p>}
            {(success2 || success) && <p className="text-green-600 text-[.625rem] font-bold lowercase">{success2 || success}</p>}
        </div>
    );
}