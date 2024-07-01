import React, { useEffect, useState } from 'react';
import { useData } from '../hooks/useData.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import { setupSerialConnection } from 'simple-web-serial';
import instance from "../hooks/api";
import '../styles/content.css'

declare global {
    interface WindowEventMap {
        keydown: React.KeyboardEvent<HTMLInputElement>
    }
}

const connection = setupSerialConnection({ requestAccessOnPageLoad: true });

const Content = () => {
    const { team, money, delta, setTeam, setMoney, setDelta } = useData();
    const [ loading, setLoading ] = useState(false);

    const findMoney = async () => {
        const {
            data: { msg, money },
        } = await instance.get("/getTeam", {params: {
            team: team,
        }});
        setMoney(money);
    }

    const updateMoney = async (val: number) => {
        const {
            data: { msg, money },
        } =await instance.post("/updateMoney", {
          team: team,
          money: val,
        });

        if (msg === "fail") {
            alert("Be sure you've got enough money!");
            setTeam(0);
            return;
        }

        setMoney(money);
    };

    const handleUserKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        if (key === "Enter") {
            setLoading(false)
            setTeam(0)
            setDelta("")
        }
    }

    // Set up the serial connection
    useEffect(() => {
        // React to incoming events
        connection.on("check", function(data: number) {
            setTeam(data);
            // console.log(data)
        });

        window.addEventListener('keydown', handleUserKeyPress)
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress)
        }
    })

    useEffect(() => {
        setLoading(true);
        // console.log(delta)

        if (delta !== "") {
            updateMoney(parseInt(delta));
            setDelta("");
        } else {
            findMoney();
        }

        if (team !== 0) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 3000)

            return () => clearTimeout(timer);
        }

        setLoading(false);
    }, [team])

    return (
        <div className='ContentWrapper'>
            <div className='ContentMain'>
                {
                    loading ? <CircularProgress /> 
                    :team === 0?
                        <>
                            <div className='Hint'>Tap the card to get your information!</div>
                            <div className='Card'></div>
                        </>
                        :
                        <>
                            <div className='Result'>Hello team {team}</div>
                            <div className='Result'>You've owned {money} dollars</div>  
                        </>
                }
                
            </div>
        </div>
    );
}

export { Content };