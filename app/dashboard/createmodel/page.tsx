"use client";
import { createModelGen } from "@/utils";
import styled from "styled-components";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

const StyledHome = styled.div`
    background-image: linear-gradient(
        to bottom,
        #a663de,
        #a333c8,
        #7346e5,
        #2962ff
    );
    color: white;
    display: flex;
    flex-direction: row;
    width: 100vw;
    /* Set width to 100% */
    /* Ensure child components fill the remaining space */
    /* align-items: center; */
`;

const CreateModel = () => {
    async function createModelGenCall() {
        await createModelGen("test", "test-prompt");
    }

    return (
        <div>
            <NavBar />
            <StyledHome>
                <SideBar />
                <div>
                    <p>Create Model</p>
                    {/* <input placeholder="prompt please" /> */}
                    <button onClick={createModelGenCall}>gen</button>
                </div>
            </StyledHome>
        </div>
    );
};

export default CreateModel;
