import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';


const LandingPage = () => {

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


    const handleFullScreen = () => {
        // Request fullscreen mode
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Safari compatibility
          document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE11 compatibility
          document.documentElement.msRequestFullscreen();
        }
      };

    

    return (
        <div style={{justifyItems:'center', marginBottom:'30px'}}>
            <h1 style={{marginBottom:'30px', marginTop:'30px', color:'white '}}>WELCOME TO CODEQUEST RIDDLE FUN</h1>
            {/* The following is the div for rules */}
            <div >
                <h1 style={{marginLeft:"30px", marginRight:"30px"}}>
                    <h2>Rules:</h2>
                    <div style={{marginLeft:'50px', marginRight:'50px'}}>
                        <ul style={{textAlign:'left', lineHeight:"52px"}}>
                            <li><span style={{fontWeight:'1000'}}>Participation Format</span> <span style={{}}>: Participants may join as solo competitors or form groups to participate.</span></li>
                            <li><span style={{fontWeight:'1000'}}>New Riddle Selection </span>: You may proceed to pick the next riddle only when you’ve either solved the first riddle given and the contest it leads to, or 6 minutes has elapsed since the current riddle was given to you</li>
                            <li><span style={{fontWeight:'1000'}}>No AI Assistance Allowed </span>: Use of AI tools (e.g., ChatGPT) is strictly prohibited during the contest.</li>
                            <li><span style={{fontWeight:'1000'}}>Determining the Winner </span>: The winner will be the participant or team with the highest number of points at the end of the contest.</li>
                            <li><span style={{fontWeight:'1000'}}>Point Allocation </span>: Each riddle will have a specific point value, which will be displayed within the contest.</li>
                            <li><span style={{fontWeight:'1000'}}>Prize Money </span>: A prize of ₹2000 will be awarded to the winner at the top of the leaderboard.</li>
                            <li><span style={{fontWeight:'1000'}}>Tie-Breaker </span>: In the event of a tie, an additional tie-breaker riddle will be given to determine the winner.</li>
                            <li><span style={{fontWeight:'1000'}}>Avoid refreshing </span>: Try not to refresh the riddle page because it might cause the timer to reset and the riddle to go away</li>
                        </ul>
                        
                    </div>
                    <div>
                    <Link to="/event">
                        <button onClick={handleFullScreen} style={{paddingLeft:'30px', paddingRight:'30px'}}>
                        Start
                        </button>
                    </Link>
                    </div>
                </h1>

            </div>
        </div>
    )
}

export default LandingPage
