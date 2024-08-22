import React from 'react'
import { BASE_URL } from '../../config';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import useFetchData from '../../hooks/useFetchData';
import { formateDate } from '../../utils/formateDate';
import { AiFillDelete } from 'react-icons/ai';
import { token } from '../../config';
import { toast } from 'react-toastify';



const MyBookings = () => {

    const {data:appointment, loading, error} = useFetchData(`${BASE_URL}/users/appiontments/my-appointments`)

    const handleDelete = async (id)=>{
        try{
        const res = await fetch(`${BASE_URL}/bookings/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }})

            const result = await res.json();
            if(!res.ok){
                throw new Error(result.message)
            }
            toast.success(result.message)
            
            setTimeout(location.reload(), 50000);
    }catch(err){
        toast.error(err.message)
    }
    }

    
    
  return (
    <div>
        {loading && !error && <Loading/>}

        {error && !loading && <Error errMsg={error}/>}

        {!loading && !error && (
                <table className="w-full text-left text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope='col' className='px-6 py-3'>
                    Doctor
                </th>
                <th scope='col' className='px-6 py-3'>
                    Date
                </th>
                <th scope='col' className='px-6 py-3'>
                    Time
                </th>
              
            </tr>
        </thead>


        <tbody>
        {appointment?.map(item => (
                <tr key={item._id} className=''>
                    <td className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'>
                    <Link to={`/doctors/${item.doctor._id}`}>
                        <img src={item.doctor.photo} className='w-10 h-10 rounded-full' alt="" />
                        </Link>
                        <div className="pl-3">
                            <div className="text-base font-semibold">{item.doctor.name}</div>
                            <div className="text-normal text-gray-500">{item.doctor.email}</div>
                        </div>
                    </td>
                    {item.book?.map((i,index)=>(
                    <td key={index}>
                        <div >
                            <div className="text-normal text-gray-500">{formateDate(i.date)}</div>
                        </div>
                    </td>
                     ))}
                      {item.book?.map((i,index)=>(
                    <td key={index}>
                        <div className="text-normal text-gray-500">{i.startingTime}</div>
                    </td>
                     ))}
                     <td>
                        <button onClick={() => handleDelete(item._id)}>
                            <AiFillDelete />
                        </button>
                     </td>
                </tr>
            ))}
           
        </tbody>
        
        </table>
            
        )}

        {!loading && !error&& appointment.length == 0  && (
            <h2 className='mt-5 text-center text-headingColor leading-7 text-[20px] font-semibold'>
                You did not book any doctor yet!
            </h2>
        )}
    </div>
  )
}

export default MyBookings
