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

const connection = setupSerialConnection({ requestAccessOnPageLoad: true});

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
        if (team !== 0) connection.send("check", { money: money, delta: 0});
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

        if (team !== 0) connection.send("check", { money: money, delta: parseInt(delta)});
    };

    const handleUserKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        console.log(key)
        if (key === "Enter") {
            
            // debug
            // connection.send("check", { money: 0, delta: 0}).then(() => {
            //     console.log('check sent')
            // }).catch((err: any) => {
            //     console.error(err);
            // });

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
            console.log(data)
        });


        window.addEventListener('keydown', handleUserKeyPress)
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress)
        }
    })

    useEffect(() => {
        setLoading(true);
        if (delta !== "") {
            updateMoney(parseInt(delta));
            setDelta("");
        } else {
            findMoney();
        }

        if (team !== 0) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 500)

            return () => clearTimeout(timer);
        }

        setLoading(false);
    }, [team])

    // useEffect(() => {
    //     if (admin) {
    //         getAllTeams();
    //     }
    // }, [admin])

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