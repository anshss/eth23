/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { fetchAllModels } from "@/utils";
import { useEffect, useState } from "react";

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
            <div className="mb-4">
                <p>tba: {tba}</p>
                <p>owner: {owner}</p>
                <img src={image} width="400px"/>
            </div>
        );
    };

    return (
        <div>
            <p>All Models</p>
            {data.map((e: any, i: number) => {
                return (
                    <Card key={i} tba={e.tba} owner={e.owner} image={e.modelImg} />
                );
            })}
        </div>
    );
};

export default FetchModels;
