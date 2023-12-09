"use client";

import { getContentByModelId, getTokensURI } from "@/utils";
import { useDebugValue, useEffect, useState } from "react";
import axios from "axios";

const FetchContentById = () => {
    const [data, setData] = useState<any>([])

    async function fetchDataCall() {
        const results = await getContentByModelId("1");
        setData(results);
    }

    const Card = ({
        address,
        id,
        image,
    }: {
        address: any;
        id: any;
        image: any;
    }) => {

        const [fetchedURI, setFetchedURI] = useState<any>({})

        useEffect(() => {
            fetchUri()
        }, [])

        async function fetchUri() {
            const res1 = await getTokensURI(address, id);
            const res2 = await axios.get(res1);
            setFetchedURI(res2.data)
        }

        console.log(fetchedURI)

        return (
            <div className="mb-4">
                <p>nft address: {address}</p>
                <p>prompt used: {fetchedURI._prompt}</p>
                <img src={fetchedURI.image} width="200px"/>
            </div>
        );
    };

    return (
        <div>
            <p>Fetch Content By Id</p>
            <button onClick={fetchDataCall}>fetch</button>
            <p>All Models</p>
            {data.map((e: any, i: number) => {
                return (
                    <Card key={i} address={e.token_address} id={e.token_id} image={e.modelImg} />
                );
            })}
        </div>
    );
};

export default FetchContentById;
