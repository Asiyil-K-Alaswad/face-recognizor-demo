import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import mainLogo from './mainLogo.png';

const Logo = () => {
    return (
        <div className="center">
            <Tilt className="Tilt br2 shadow-2 ma4 mt0" 
                scale={1.2}
                style={{height:'150px', width:'150px' , display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div className="f1">
                    <img src={mainLogo} alt="" />
                </div>
            </Tilt>
        </div>


    )
}

export default Logo;