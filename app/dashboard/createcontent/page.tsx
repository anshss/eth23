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


const CreateContent = () => {
    async function createContentGenCall() {
        const productImage = await uploadProductImageToIPFS()
        await createStaticContent(productImage, "test-prompt", "2");
    }

    async function uploadProductImageToIPFS() {}

    return (
        <div>
            <NavBar/>
            <StyledHome className="styledhome">
                <SideBar/>
                <p>Create Content</p>
                {/* <input type="text" placeholder="product-image"/>
                <input type="file" placeholder="model id" />
                <input type="text" placeholder="prompt please" /> */}
                <button onClick={createContentGenCall}>gen</button>
            </StyledHome>
        </div>
    );
};

export default CreateContent;
