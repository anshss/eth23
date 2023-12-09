"use client";

import { createStaticContent } from "@/utils";
import NavBar from "@/components/NavBar";
import styled from "styled-components";
import SideBar from "@/components/SideBar";
import {useState} from "react";
import { saveAs } from "file-saver";

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
`;

const CreateContent = () => {

    const [loading, setLoading] = useState(false);
    const [formInput, setFormInput] = useState({
        productDescription: "",
        productImage: "",
        modelId: ""
    });
    const [imgLoading, setImgLoading] = useState(false);

    const [linkos, setLinkos] = useState([]);

    async function createContentGenCall() {
        const productImage = await uploadProductImageToIPFS();
        await createStaticContent(productImage, "test-prompt", "2");
    }

    async function uploadProductImageToIPFS() {}


    async function Download(_fileName: any, _fileUrl: string) {
        const name = _fileName;
        const fileUrl = _fileUrl;
        saveAs(fileUrl, name);
    }

    async function changeImage() {}

    return (
        <div>
            <NavBar />
            <StyledHome className="styledhome">
                {/* <div className="flex"> */}
                <SideBar />
                <div className="flex flex-col">
                    <p>Create Content</p>
                    <button onClick={createContentGenCall}>gen</button>
                    {/* </div> */}
                </div>
            </StyledHome>
        </div>
    );
};

export default CreateContent;
