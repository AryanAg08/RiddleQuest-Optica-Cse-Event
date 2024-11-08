import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Data from "./Riddles";

let currentRiddleNumber = null; // Global variable to store the current riddle number
const LOCK_DURATION = 6 * 60 * 1000; // 6 minutes in milliseconds

function getRiddleByNumber(riddleNumber) {
    const riddle = Data.find(item => item.riddle === riddleNumber);

    if (riddle) {
        currentRiddleNumber = riddleNumber;
        return riddle.question;
    } else {
        return "wrongAns";
    }
}

function checkRiddleAnswer(answer) {
    const riddle = Data.find(item => item.riddle === currentRiddleNumber);

    if (riddle && riddle.answer.toLowerCase() === answer.toLowerCase()) {
        return riddle.redirectLink;
    } else {
        return "wrongAns";
    }
}

const Home = () => {
    const [riddle, setRiddle] = useState("");
    const [riddleNum, setRiddleNum] = useState("");
    const [riddleAns, setRiddleAns] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [isLocked, setIsLocked] = useState(false);


    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };

        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useEffect(() => {
        const detectDevTools = () => {
            if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
                alert("Please close developer tools to continue.");
                return;
            }
        };

        window.addEventListener('resize', detectDevTools);
        return () => {
            window.removeEventListener('resize', detectDevTools);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 123 || (event.ctrlKey && event.shiftKey && [73, 74].includes(event.keyCode))) {
                event.preventDefault();

                toast.error("Developer tools are disabled.");
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);



    useEffect(() => {
        const lastAccessTime = localStorage.getItem("lastRiddleAccessTime");
        const riddleNum = localStorage.getItem("riddleNum");
        const riddleQuestion = localStorage.getItem("riddleQuestion");
        if (lastAccessTime) {
            const elapsedTime = Date.now() - parseInt(lastAccessTime, 10);
            if (elapsedTime < LOCK_DURATION) {
                setIsLocked(true);
                setRiddleNum(riddleNum);
                setTimeLeft(Math.ceil((LOCK_DURATION - elapsedTime) / 1000));
            }
        }
    }, []);

    useEffect(() => {
        let timer;
        if (isLocked && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsLocked(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isLocked, timeLeft]);

    const handleRiddleSubmit = () => {

        if (isLocked) {
            toast.error("You need to wait before entering another riddle.");
            return;
        }

        const riddleRegex = /^(?:[1-9]|1[0-9]|20)$/;
        let response = "";

        // Convert riddleNum to a number before passing to getRiddleByNumber
        if (riddleRegex.test(riddleNum)) {
            response = getRiddleByNumber(Number(riddleNum));
            if (response === "wrongAns") {
                toast.error("Please enter a valid riddle number (1-20).");
            } else {
                setRiddle(response);
                lockRiddleSubmission(response);
            }
        } else {
            toast.error("Please enter a valid riddle number (1-20).");
        }
    };

    const lockRiddleSubmission = (response) => {
        const lockTime = Date.now();
        localStorage.setItem("lastRiddleAccessTime", lockTime.toString());
        localStorage.setItem("riddleNum", riddleNum);
        localStorage.setItem("riddleQuestion", response);
        setIsLocked(true);
        setTimeLeft(LOCK_DURATION / 1000);
    };

    const submitans = () => {
        let finalResponse = checkRiddleAnswer(riddleAns);

        if (finalResponse === "wrongAns") {
            setRiddleAns("");
            toast.error("Wrong answer for the riddle.");
            return;
        }

        window.open(`https://${finalResponse}`, '_blank');
        window.location.reload();
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className='heading'>
                <h1>Codequest Riddle Fun</h1>
            </div>
            <div className='inputs'>
                <input
                    value={riddleNum}
                    onChange={(e) => setRiddleNum(e.target.value)}
                    type="text"
                    placeholder='Enter riddle number'
                    className='riddleNum'
                    style={{ padding: "20px 10px" }}
                    disabled={isLocked}
                />
                <button className='submit1' onClick={handleRiddleSubmit} disabled={isLocked}>Submit</button>
            </div>
            {isLocked && (
                <div style={{ color: 'red', marginTop: '20px', textAlign: 'center', fontSize: "1.5rem" }}>
                    Please wait {timeLeft} seconds before attempting another riddle.
                </div>
            )}
            {riddle && riddle !== "wrongAns" && (
                <>
                    <div
                        className='riddleInfo'
                        style={{
                            fontSize: "2rem",
                            padding: "20px 20px",
                            border: "5px solid black",
                            borderRadius: "20px",
                            margin: "30px 20px 10px 20px",
                            backgroundColor: "gray"
                        }}
                    >
                        {riddle}
                    </div>
                    <div className='ans'>
                        <input
                            type="text"
                            placeholder='Enter your answer here'
                            style={{ padding: "20px 10px" }}
                            value={riddleAns}
                            onChange={(e) => setRiddleAns(e.target.value)}
                        />
                        <button onClick={submitans}>Submit</button>
                    </div>
                </>
            )}
        </>
    );
}

export default Home;
