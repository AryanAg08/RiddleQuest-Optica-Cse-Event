import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/OPTICA_O.png'

const Header = () => {
    return (
        <div style={{minWidth:"100%"}}>
            {/* Header container with gradient background and space between elements */}
            <div style={{
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                padding: "5px 30px", 
                background: "linear-gradient(90deg, #a2a2a4, #383737)", 
                color: "white"
            }}> 
                {/* Title section */}
                <div style={{
                    fontSize: "45px", 
                    fontWeight: "bold",
                    letterSpacing: "2px"
                }}>
                    <img src={logo} style={{height:'40px', marginTop:'2px', paddingTop:'10px'}}/>
                </div>
                
                {/* Links section */}
                <div style={{
                    display: "flex", 
                    gap: "30px", 
                    fontSize: "24px"
                }}>
                    <Link 
                        style={{
                            fontSize:'35px',
                            color: "white", 
                            textDecoration: "none", 
                            transition: "color 0.3s"
                        }} 
                        to="/home"
                        onMouseOver={(e) => e.target.style.color = "#a2a2a4"}
                        onMouseOut={(e) => e.target.style.color = "white"}
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
