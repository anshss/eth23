"use client";
import { createModelGen } from "@/utils";
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


const CreateModel = () => {

    async function createModelGenCall() {
        await createModelGen("test", "test-prompt")
    }

    return (
        <div>
            <NavBar/>
            <StyledHome>
                <SideBar/>
                <p>Create Model</p>
                {/* <input placeholder="prompt please" /> */}
                <button onClick={createModelGenCall}>gen</button>
            </StyledHome>
        </div>
    );
};

export default CreateModel;
