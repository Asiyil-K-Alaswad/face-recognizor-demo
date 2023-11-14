import React from 'react';
import './FaceRecognition.css'

const FaceDetection = ({imageUrl , box}) => {
    return (
        <div className='center ma'>
            <div className='relative mt2'>
                <img id='inputimage' src={imageUrl} width='500px' height='auto' />
                <div className='bounding-box'
                        style={{
                            top:box.topB,
                            right:box.rightB,
                            bottom:box.bottomB,
                            left:box.leftB
                        }}></div>
            </div>
            
        </div>
    )
}

export default FaceDetection;