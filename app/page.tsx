// Add "use client" directive
"use client"

import styled from "styled-components";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";

const StyledHome = styled.div`
  background-image: linear-gradient(to bottom, #a663de, #a333c8, #7346e5, #2962ff);
  color: white;
  display: flex;
  flex-direction: row;
  /* Set width to 100% */
  width: 100vw;
  align-items: flex-start
  /* Ensure child components fill the remaining space */
`;



export default function Home() {
<<<<<<< Updated upstream
  return (
    <div>
      <NavBar/>
      <StyledHome className="styledhome">
        <SideBar/>
        <Dashboard/>
    </StyledHome>
    </div>
    
  );
=======

    return (
        <div>
            <p>Home</p>
            <Link href="/dashboard/createmodel">
                <p>createmodel</p>
            </Link>
            <Link href="/dashboard/fetchmodels">
                <p>fetchmodel</p>
            </Link>
            <Link href="/dashboard/createcontent">
                <p>createcontent</p>
            </Link>
            <Link href="/dashboard/fetchcontentbyId">
                <p>fetchcontentbyId</p>
            </Link>
            <Link href="/notification">
                <p>push testing</p>
            </Link>
        </div>
    );
>>>>>>> Stashed changes
}
