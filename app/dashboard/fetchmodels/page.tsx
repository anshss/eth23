/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { fetchAllModels } from "@/utils";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";

const FetchModels = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        fetchAllModelsData();
    }, []);

    async function fetchAllModelsData() {
        const results = await fetchAllModels();
        setData(results);
        console.log("length", results.length)
    }

    function LinkoCard({
        name,
        tba,
        image,
        owner
    }: {
        name: any;
        tba: any;
        image: any;
        owner: any;
    }) {
        return (
            <div className="mt-10 relative">
                <div className="flex gap-5 block w-3/4 relative p-6 mx-auto cursor-pointer bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <img src={image} width="100px" />
                    {/* <p>Model Id: {prop.modelId}</p> */}
                    <div className="w-[80%]">
                        <div className="flex">
                            <div>
                                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Model Name: {name}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">
                                TBA Address: {tba}
                            </p>
                            <button
                                // onClick={}
                                className="h-[40px] inline-flex items-center px-[6%] py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Chat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <div className="flex">
                <SideBar />
                <div className="p-4 sm:ml-64 pt-20 bg-gray-900 w-full min-h-screen">
                    {/* <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">
                    Model Gen Address: {modelGenAddress}
                </p> */}
                    {data.map((item: any, i: any) => (
                        <LinkoCard
                            key={i}
                            owner={item.owner}
                            name={item.name}
                            tba={item.tba}
                            image={item.modelImg}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FetchModels;
