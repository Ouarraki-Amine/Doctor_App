import React , {useState, useEffect} from 'react'
import { token, BASE_URL } from '../../config'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'

const TimeSlot = ({doctorData}) => {

    const [formData, setFormData] = useState({timeSlots:[]})

    const isExpired = (date) => {
        const today = new Date().setHours(0, 0, 0, 0); // Current date with time set to 00:00
        const slotDate = new Date(date).setHours(0, 0, 0, 0);
        return slotDate < today;
    }
    

      useEffect(()=>{
        const filteredTimeSlots = doctorData?.timeSlots?.filter(slot => !isExpired(slot.date));
        setFormData({  timeSlots: filteredTimeSlots  })
      },[doctorData])


      const updateProfileHandler = async e =>{
        e.preventDefault();
    
        try {
          
          const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
            method:"PUT",
            headers:{
              'content-type':'application/json',
              Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(formData)
          })
    
          const result = await res.json();
          if(!res.ok){
            throw Error(result.message)
          }
          toast.success(result.message)
          window.location.reload();
    
        } catch (err){
            toast.error(err.message)
        }
      }


      const handleTimeSlotChange = (event,index) => {

        handleReusableInputChangeFunc('timeSlots',index,event)
      }

      const deleteTimeSlot = (e,index) => {
        e.preventDefault()
        deleteItem('timeSlots',index)
      }

      
      const addTimeSlot  = e =>{
        e.preventDefault();
        addItem('timeSlots', {
          status:false,  
          startingTime:"", 
          endingTime:""
        })
      };



      const deleteItem = (key,index) => {
        setFormData(prevFormData => ({...prevFormData, [key]:prevFormData[key]?.filter((_,i) => i != index)}))
      }


  
    
    //function pour ajouter item
    const addItem = (key,item) => {
      setFormData(prevFormData => ({...prevFormData, [key]:[...prevFormData[key], item]}))
    }
  
    //
    const handleReusableInputChangeFunc = (key,index,event) => {
      const {name, value} = event.target
      setFormData(prevFormData => {
        const updateItems = [...prevFormData[key]]
        updateItems[index][name] = value
        return {...prevFormData,[key]:updateItems}
      })
    }
  return (
    <div className="mb-5">
    <p className="form__label">Time Slots*</p>
      { formData.timeSlots?.map((item,index) => 
        <div key={index}>
          <div>
             <div className="grid grid-cols-4 mb-[30px] gap-5">
              <div>
              <p className="form__label">date*</p>
                <input 
                    type="date" 
                    name='date' 
                    value={item.date}
                    className='form__input'
                    onChange={e => handleTimeSlotChange(e,index)}
                />
              </div>
              <div>
                <p className="form__label">Starting Time*</p>
                <input 
                    type="time" 
                    name='startingTime' 
                    value={item.startingTime}
                    className='form__input'
                    onChange={e => handleTimeSlotChange(e,index)}
                />
              </div>
              <div>
                <p className="form__label">Ending Time*</p>
                <input 
                    type="time" 
                    name='endingTime' 
                    value={item.endingTime}
                    className='form__input'
                    onChange={e => handleTimeSlotChange(e,index)}
                />
              </div>
             

           <div className="flex items-center">
              <button onClick={e => deleteTimeSlot(e,index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer mt-6'>
                    <AiOutlineDelete />
              </button>
           </div>
           </div>
          </div>
        </div>
      )}

      <button onClick={addTimeSlot} className="bg-[#000] py-2 px-5 rounded text-white">
        Add TimeSlot
      </button>

      <div className="mt-7">
          <button type='submit' onClick={updateProfileHandler} className='bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 
            rounded-lg'>
                Add Time
          </button>
        </div>
  </div>

  )
}

export default TimeSlot
