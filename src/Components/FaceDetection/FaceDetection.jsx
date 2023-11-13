import React from 'react';

const FaceDetection = ({imageUrl}) => {
    return (
        <div className='center ma'>
            <div className=' mt2'>
                <img src={imageUrl} width='500px' height='auto' />
            </div>
            
        </div>
    )
}

export default FaceDetection;