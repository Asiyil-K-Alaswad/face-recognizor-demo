import React from 'react';

const TitleMessage = ({userName,userEntries}) =>{
    return (
        <div>
            <div className='white f3'> {`${userName}, your entries reached...`} </div>
            <div className='white f1'> {`${userEntries}!`} </div>
        </div>
    )
}

export default TitleMessage;