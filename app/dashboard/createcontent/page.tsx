"use client";

import { createStaticContent } from "@/utils";
import NavBar from "@/components/NavBar";
import styled from "styled-components";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import { saveAs } from "file-saver";

const CreateContent = () => {
    const [loading, setLoading] = useState(false);
    const [formInput, setFormInput] = useState({
        productDescription: "",
        productImage: "",
        modelId: "",
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
            <div className="flex">
                {/* <div className="flex"> */}
                <SideBar />

                <div className="p-4 sm:ml-64 pt-20 bg-gray-900 w-full h-screen">
                    <div className="text-white">
                        <div className="mt-10">
                            <h1 className="font-bold text-3xl text-center">
                                Generate an Image Ad
                            </h1>
                        </div>

                        <div className="mt-8 w-3/4 mx-auto">
                            <div className="flex flex-col gap-4">
                                <label className="flex gap-2 justify-center py-12 mb-4 w-full mx-auto mt-4 border-2 bg-[#1E1E1E] bg-opacity-75 border-[#E0E0E0] border-opacity-40 border-dashed  rounded-md  cursor-pointer ">
                                    <span className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-gray"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                    </span>
                                    {imgLoading ? (
                                        <div>Uploading to IPFS..</div>
                                    ) : formInput.productImage == "" ? (
                                        <div>
                                            <span className="mb-2 text-lg text-center text-gray-500 dark:text-gray-400">
                                                Product Image
                                            </span>
                                            {/* <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">
                                                    Click to upload
                                                </span>{" "}
                                                or drag and drop
                                            </p> */}
                                            {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX.
                                                800x400px)
                                            </p> */}
                                        </div>
                                    ) : (
                                        <div>We got your image</div>
                                    )}
                                    <input
                                        type="file"
                                        name="file_upload"
                                        className="hidden"
                                        onChange={changeImage}
                                        disabled={imgLoading}
                                    />
                                </label>

                                <div className="flex">
                                    <div className="w-[12%] justify-center flex-shrink-0 cursor-default z-10 inline-flex items-center py-4 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700  dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600">
                                        <p>Description</p>
                                    </div>
                                    <div className="relative w-full">
                                        <input
                                            type="search"
                                            className="block p-4 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                            placeholder="A male skinny brown boy.."
                                            required
                                            value={formInput.productDescription}
                                            onChange={(e) => {
                                                setFormInput({
                                                    ...formInput,
                                                    productDescription:
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-[12%] justify-center flex-shrink-0 cursor-default z-10 inline-flex items-center py-4 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700  dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600">
                                        <p>ModelId</p>
                                    </div>
                                    <div className="relative w-full">
                                        <input
                                            type="search"
                                            className="block p-4 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                            placeholder="Enter your model's id"
                                            required
                                            value={formInput.modelId}
                                            onChange={(e) => {
                                                setFormInput({
                                                    ...formInput,
                                                    modelId: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        className="flex w-[14%] justify-center py-4 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={createContentGenCall}
                                    >
                                        {/* <span className="sr-only">Search</span> */}

                                        {!loading ? (
                                            // <svg
                                            //     className="w-5 h-5"
                                            //     fill="currentColor"
                                            //     xmlns="http://www.w3.org/2000/svg"
                                            //     height="40"
                                            //     viewBox="0 96 960 960"
                                            //     width="40s"
                                            // >
                                            //     <path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z" />
                                            // </svg>
                                            <span>Generate</span>
                                        ) : (
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                className="inline w-4 h-4 text-white animate-spin"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="#E5E7EB"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateContent;
