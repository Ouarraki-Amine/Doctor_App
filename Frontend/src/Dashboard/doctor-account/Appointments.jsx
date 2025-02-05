import React from 'react'
import { formateDate } from '../../utils/formateDate'

const Appointments = ({appointment}) => {
    

  return (
    <table className="w-full text-left text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope='col' className='px-6 py-3'>
                    Patient
                </th>
                <th scope='col' className='px-6 py-3'>
                    Gender
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
                        <img src={item.user.photo} className='w-10 h-10 rounded-full' alt="" />
                        <div className="pl-3">
                            <div className="text-base font-semibold">{item.user.name}</div>
                            <div className="text-normal text-gray-500">{item.user.email}</div>
                        </div>
                    </td>
                    <td> {item.user.gender}</td>
                    {item.book?.map((i,index)=>(
                    <td key={index}>
                        <div >
                            <div className="text-normal text-gray-500">{formateDate(i.date)}</div>
                        </div>
                    </td>
                     ))}

                    {item.book?.map((i,index)=>(
                    <td key={index}>
                        <div >
                            <div className="text-normal text-gray-500">{i.startingTime} - {i.endingTime}</div>
                        </div>
                    </td>
                     ))}
                    
                </tr>
            ))}
        </tbody>

        

    </table>
  )
}

export default Appointments
