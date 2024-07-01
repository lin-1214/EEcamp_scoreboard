import React, { FC, createContext, useState, useContext} from "react";

interface DataProps {
    start: boolean;
    team: number;
    money: number;
    delta: string;
    setStart: (start: boolean) => void;
    setTeam: (team: number) => void;
    setMoney: (money: number) => void;
    setDelta: (delta: string) => void;
}

const Data = createContext<DataProps>({
    start: false,
    team: 0,
    money: 0,
    delta: "",
    setStart: () => {},
    setTeam: () => {},
    setMoney: () => {},
    setDelta: () => {},
});

interface UserDataProviderProps {
    children: React.ReactNode;
}

const DataProvider: FC<UserDataProviderProps> = (props) => {
    const [start, setStart] = useState(false);
    const [team, setTeam] = useState(0);
    const [money, setMoney] = useState(0);
    const [delta, setDelta] = useState("");
    return (
        <Data.Provider
            value={{
                start,
                team,
                money,
                delta,
                setStart,
                setTeam,
                setMoney,
                setDelta,
            }}
            {...props}
        ></Data.Provider>
    );
}

const useData = () => {
    return useContext(Data);
};

export {DataProvider, useData}