"use client";

import React from "react";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import web3modal from "web3modal";
import styled from "styled-components";
import NavBar from "@/app/components/NavBar";
import SideBar from "@/app/components/SideBar";

const StyledHome = styled.div`
  background-image: linear-gradient(to bottom, #a663de, #a333c8, #7346e5, #2962ff);
  color: white;
  display: flex;
  flex-direction: row;
  /* Set width to 100% */
  width: 100vw;
  /* Ensure child components fill the remaining space */
  align-items: center;
`;


const Logout = () => {
    
    const logout = async () => {
        console.log("logout")
    }

    return (
        <div>
            <NavBar/>
            <StyledHome className="styledhome">
                <SideBar/>
                <p>Logout</p><br/>
                <button onClick={logout}>Become Boring</button>
            </StyledHome>
        </div>
    );
};

export default Logout;
