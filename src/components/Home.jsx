import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { getRiddleByNumber, checkRiddleAnswer } from './HandleData';

const Home = () => {

    const [riddle, setRiddle] = useState("");
    const [riddleNum, setRiddleNum] = useState("");
    const [riddleAns, setRiddleAns] = useState("");

    const navigate = useNavigate();


    const handleRiddleSubmit = () => {

        const riddleRegex = /^(?:[1-9]|1[0-9]|20)$/;
        let response = "";
        if (riddleRegex.test(riddleNum)) {
            response = getRiddleByNumber(riddleNum);
            if (response == "wrongAns") {
                toast.error("Please enter a valid riddle number (1-20).");
            }
            setRiddle(response);
        } else {
            toast.error("Please enter a valid riddle number (1-20).");
        }
    };

    const submitans = () => {
        let finalResponse = "";

        finalResponse = checkRiddleAnswer(riddleAns);

        if (finalResponse == "wrongAns") {
            setRiddleAns("");
            toast.error("Wrong ans for the riddle.");

            return;
        }

        navigate(finalResponse);
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className='heading'>
                <h1>Codequest Riddle Fun</h1>
            </div>
            <div className='inputs'>
                <input value={riddleNum} onChange={(e) => setRiddleNum(e.target.value)} type="text" placeholder='Enter riddle number' className='riddleNum' style={{ padding: "20px 10px" }} />
                <button className='submit1' onClick={handleRiddleSubmit}>submit</button>
            </div>
            {riddle && riddle != "wrongAns" && riddle != "" ? <div className='riddleInfo' style={{ fontSize: "2rem", padding: "20px 20px", border: "5px solid black", borderRadius: "20px", margin: "30px 20px 10px 20px", backgroundColor: "gray" }}>
                {riddle}
            </div> : ""}
            <div className='ans'>
                <input type="text" placeholder='Enter your answer here' style={{ padding: "20px 10px" }} value={riddleAns} onChange={(e) => setRiddleAns(e.target.value)} />

                <button onClick={submitans}>submit</button>
            </div>
        </>
    )
}

export default Home
