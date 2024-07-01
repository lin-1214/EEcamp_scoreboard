import React, { useEffect } from 'react';
import { useData } from '../hooks/useData';
import TextField from '@mui/material/TextField';
import '../styles/footer.css'


const Footer = () => {
    const { delta, setDelta } = useData();


    return (
        <div className='FooterWrapper'>
            <div className='TextContainer'>
                <TextField
                    id="filled-value"
                    label="Value"
                    type="search"
                    value={delta}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDelta(event.target.value);
                    }} 
                    fullWidth
                />
            </div>
        </div>
    );
}

export { Footer };