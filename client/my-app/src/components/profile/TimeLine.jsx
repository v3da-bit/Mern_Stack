import React from 'react'

function TimeLine() {
    return (
        <div className='grid grid-flow-col'>
            <div className="grid grid-flow-row">
                <div className="text-white">January</div>
                <div className="text-white">February</div>
                <div className="text-white">March</div>
                <div className="text-white">April</div>
                <div className="text-white">May</div>
                <div className="text-white">June</div>
            </div>
            <div className="grid grid-flow-row">
                <div className="text-white">Nodejs</div>
                <div className="text-white">ReactJs</div>
                <div className="text-white">NextJs</div>
                <div className="text-white">TailwindCSS</div>
                <div className="text-white">ExpressJs</div>
                <div className="text-white">MERN Stack</div>

            </div>
        </div>
    )
}

export default TimeLine