import React from 'react'

const SidePanel = ({setTab, ticketPrice}) => {
  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
        <div className="flex items-center justify-between">
            <p className="text__para mt-0 font-semibold">Ticket Price</p>
            <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                {ticketPrice} €
            </span>
        </div>

        

        <button onClick={e=>setTab("booking")}  className='btn px-2 w-full rounded-md'>Available Time Slots</button>
    </div>
  )
}

export default SidePanel
