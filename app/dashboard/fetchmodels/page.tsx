/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { fetchAllModels } from "@/utils";
import { useEffect, useState } from "react";
import styled from "styled-components"
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";

const Models = styled.div`
    
`

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
                <img src={image} width="200px"/>
            </div>
        );
    };

    return (
        <div>
            <NavBar/>
                <SideBar/>
                <Models>
                <p>All Models</p>
                {data.map((e: any, i: number) => {
                    return (
                        <Card key={i} tba={e.tba} owner={e.owner} image={e.modelImg} />
                    );
                })}
                </Models>
        </div>
    );
};

export default FetchModels;
