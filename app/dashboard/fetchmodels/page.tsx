/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { fetchAllModels } from "@/utils";
import { useEffect, useState } from "react";
import styled from "styled-components"
import SideBar from "@/app/components/SideBar";
import NavBar from "@/app/components/NavBar";

const Models = styled.div`
    
`

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

const FetchModels = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        fetchAllModelsData();
    }, []);

    async function fetchAllModelsData() {
        const results = await fetchAllModels();
        setData(results);
    }

    const Card = ({
        tba,
        owner,
        image,
    }: {
        tba: any;
        owner: any;
        image: any;
    }) => {
        return (
            <div className="mb-4 cursor: pointer" onClick={()=> console.log('clicked')}>
                <p>tba: {tba}</p>
                <p>owner: {owner}</p>
                <img src={image} width="400px"/>
            </div>
        );
    };

    return (
        <div>
            <NavBar/>
            <StyledHome>
                <SideBar/>
                <Models>
                <p>All Models</p>
                {data.map((e: any, i: number) => {
                    return (
                        <Card key={i} tba={e.tba} owner={e.owner} image={e.modelImg} />
                    );
                })}
                </Models>
            </StyledHome>
        </div>
    );
};

export default FetchModels;
