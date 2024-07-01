import React, { useEffect, useState } from 'react';
import '../styles/initButton.css'
import instance from "../hooks/api";

const InitButton = () => {
    const handleInit = async () => {
        const {
            data: { msg },
        } = await instance.post("/initData");
        
        console.log("Init data successfully!");
    };

    return (
        <div className='InitButtonWrapper'>
            <button className='InitButton' onClick={handleInit}>Init</button>
        </div>
    );
}

export { InitButton };