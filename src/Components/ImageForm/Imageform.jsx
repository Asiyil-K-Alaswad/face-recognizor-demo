import React from 'react';
import './imageform.css';


const Imageform = ({ OnInputChange, OnButtonSubmit }) =>{
    return (
        <div className='ma3'>
            <p>
                {'This Image detector will detect human faces 👁👤'}
            </p>
            <div className='center'>
                <div className='form center'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={OnInputChange}/>
                    <button className='w-30 grow f4 link pv2 ph3 pv2 dib white'
                        onClick={OnButtonSubmit}
                        >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default Imageform;