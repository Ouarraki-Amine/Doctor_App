import React, { useState } from 'react'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'
import { BASE_URL, token } from '../../config'
import { useParams } from 'react-router-dom'
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'




const Booking = ({ timeSlots }) => {

  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const {id} = useParams()
  const navigate = useNavigate();
  
  

  const handleSubmit = (index,item) => {
    setBook(item)
    setActiveIndex(index)
  }


  const handleSubmitBooking = async e => {
    e.preventDefault();
    setLoading(true);
    

    try{
        if(!book){
            setLoading(false)
            return toast.error("chosing date")
        }
            const res = await fetch(`${BASE_URL}/doctors/${id}/booking`,{
                method:'post',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body: JSON.stringify({book})
            })
            const result = await res.json();
            
            if(!res.ok){
                throw new Error(result.message)
            }

            setLoading(false)
            toast.success(result.message)
            navigate(`/doctors/`)
    } catch(err){
        setLoading(false)
        toast.error(err.message)
    }
}


const isDateExpired = (date) => {
    const today = new Date().setHours(0, 0, 0, 0); // Current date with time set to 00:00
    const slotDate = new Date(date).setHours(0, 0, 0, 0);
    return slotDate < today;
  }

  return (
    <div>
      <div className="mt-3">
        

{ timeSlots?.filter(item => item.status == false )?.filter(item => !isDateExpired(item.date)).map((item,index) => 
        <div key={index}>
          <div>
             <div className="grid grid-cols-4 mb-[30px] gap-5">
              
              <div>
              <p className="form__label">date*</p>
                <input 
                    disabled
                    type="date" 
                    name='date' 
                    value={item.date}
                    className='form__input'
                    
                />
              </div>
              <div>
                <p className="form__label">Starting Time*</p>
                <input 
                    disabled
                    type="time" 
                    name='startingTime' 
                    value={item.startingTime}
                    className='form__input'
                />
              </div>
              <div>
                <p className="form__label">Ending Time*</p>
                <input 
                    disabled
                    type="time" 
                    name='endingTime' 
                    value={item.endingTime}
                    className='form__input'
                />
              </div>
             

           <div className="flex items-center">
              <button onClick={() => handleSubmit(index,item)}  className={`${activeIndex === index ? "bg-blue-600" : "bg-gray-600"} p-2 rounded-full text-white text-[18px] cursor-pointer mt-6`}>
                   <AiOutlineCheck/>
              </button>
           </div>
           </div>
          </div>
        </div>
      )}


        <button className='btn' onClick={handleSubmitBooking}>
        {loading ? <HashLoader size={25} color='#fff'/> : "booking"}
        </button>
        
      </div>
    </div>
  )
}

export default Booking
