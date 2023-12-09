"use client";

import { createStaticContent } from "@/utils";
import NavBar from "@/app/components/NavBar";
import styled from "styled-components"
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


const Analytics = () => {

    return (
        <div>
            <NavBar/>
            <StyledHome className="styledhome">
                <SideBar/>
                <p>Analytics</p>
                {/* <input type="text" placeholder="product-image"/>
                <input type="file" placeholder="model id" />
                <input type="text" placeholder="prompt please" /> */}
            </StyledHome>
        </div>
    );
};

export default Analytics;
