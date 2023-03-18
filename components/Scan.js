import {useState, useEffect} from 'react';
import QrReader from 'react-qr-scanner';
import {isMobile} from 'react-device-detect';

import { AiFillCloseCircle } from 'react-icons/ai'

const Scan = ({setTransTag, setLoadScanner}) => {

    const [camera, setCamera] = useState(null);

    const handleScan = (data) => {
      console.log(data);

      if(!data) return;
      setTransTag(data.text);
      setLoadScanner(false);
    }

    useEffect(() => {
      navigator?.mediaDevices?.enumerateDevices()
          .then((devices) => {
              let videoSelect = [];
  
              devices.forEach((device) => {
                  if (device.kind === 'videoinput') {
                      videoSelect.push(device)
                  }
              })
  
              return videoSelect;
          })
          .then((devices) => {
              setCamera({
                  cameraId: devices[devices.length - 1].deviceId,
                  devices,
                  loading: false,
              })
          })
          .catch(err => console.error(err));

        return;
        //eslint-disable-next-line
    }, [])

        return(
          
            <div className='fixed top-0 left-0 w-full h-full bg-[#000b]'>
                <div className="flex flex-col justify-center items-center py-4 relative z-[10]">
                    <select
                        className="block w-2/3 mx-2 p-2 text-xs focus:boder-0 focus:outline-none bg-app-main font-bold rounded-md"
                        onChange={(e) => setCamera({...camera, cameraId: e.target.value })}
                        >
                        <option value="">Choose Cameras</option>
                        {camera?.devices && camera?.devices?.map(({deviceId, label}, index) => 
                            <option value={deviceId} key={deviceId}>
                                {label || `camera ${index}`}
                            </option>
                        )}
                    </select>
                    {/* <label className="mx-2 font-bold text-xs text-app-main py-2 text-purple-600 text-[.625rem]">Select Camera: </label> */}
                </div>

                
                {camera && <QrReader
                    delay={300}
                    onError={(err) => console.log(err)}
                    onScan={handleScan}
                    className="fixed top-0 bottom-0 left-0 right-0 w-auto h-screen flex justify-center items-center object-cover object-center"
                    style={{ transform: isMobile ? 'rotateY(0deg)' : 'rotateY(180deg)' }}
                    constraints={ camera?.cameraId && { 
                      audio: false, 
                      video: { 
                        deviceId: camera?.cameraId
                      }
                    }}
                />}

                <div className='fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center'>

                    <svg xmlns="http://www.w3.org/2000/svg" className='w-full' viewBox="0 0 977.254 977.254">
                      <g className="relative" id="Group_2" data-name="Group 2" style={{isolation: 'isolate'}}>
                        <path id="Path_4" data-name="Path 4" d="M0,0H977.254V977.254H0Z" fill="none"/>
                        <path id="Path_5" data-name="Path 5" d="M4,126.157V85.438A81.438,81.438,0,0,1,85.438,4h81.438" transform="translate(158.876 158.876)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6"/>
                        <path id="Path_6" data-name="Path 6" d="M4,17V57.719a81.438,81.438,0,0,0,81.438,81.438h81.438" transform="translate(158.876 675.222)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6"/>
                        <path id="Path_7" data-name="Path 7" d="M16,4H97.438a81.438,81.438,0,0,1,81.438,81.438v40.719" transform="translate(635.503 158.876)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6"/>
                        <path id="Path_8" data-name="Path 8" d="M16,139.157H97.438a81.438,81.438,0,0,0,81.438-81.438V17" transform="translate(635.503 675.222)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6"/>
                        <path className="updown" id="Path_9" data-name="Path 9" d="M5,12H575.065" transform="translate(198.595 476.627)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6"/>
                      </g>
                    </svg>

                    <div onClick={() => setLoadScanner(false)} className='inline-flex gap-2 place-items-center font-bold bg-white py-1 px-4 rounded-full'>
                      <AiFillCloseCircle className="" />
                      <span className='text-xs'>Close</span>
                    </div>


                </div>
            </div>
        );

}

export default Scan;