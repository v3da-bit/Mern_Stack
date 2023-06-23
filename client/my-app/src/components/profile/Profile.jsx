import React from 'react'

function Profile({id,name,email,phone,work}) {
    return (
        <div className='grid grid-flow-col'>
            <div className="grid grid-flow-row">
                <div className="text-white"><a href='https://github.com/v3da-bit'>GitHub</a></div>
                <div className="text-white"><a href='https://www.linkedin.com/in/vedant-khamar-292544231/'>LinkedIn</a></div>
                <div className="text-white">NodeJs</div>
                <div className="text-white">ReactJs</div>
                <div className="text-white">TailWindCSS</div>
                <div className="text-white">NextJs</div>
            </div>
            <div className="grid grid-flow-row">
                <div className="text-white">User Id</div>
                <div className="text-white">Name</div>
                <div className="text-white">Email</div>
                <div className="text-white">Mo. No.</div>
                <div className="text-white">Work</div>
                
            </div>
            <div className="grid grid-flow-row">
                <div className="text-white">{id}</div>
                <div className="text-white">{name}</div>
                <div className="text-white">{email}</div>
                <div className="text-white">{phone}</div>
                <div className="text-white">{work}</div>
                
            </div>
        </div>
    )
}

export default Profile