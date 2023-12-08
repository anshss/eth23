"use client";
import web3modal from "web3modal";
import { ethers } from "ethers";
import { registryAddress, registryAbi, modelGenAbi, NftAbi } from "./config";
import axios from "axios";
import { Web3Storage } from "web3.storage";
import { init, fetchQuery } from "@airstack/node";
import Moralis from "moralis";

let allModels = [];

Moralis.start({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImRjOWNmODBkLTQwMzctNGNiNS04ZjQ4LTRhYTdjNGE0YmZhZiIsIm9yZ0lkIjoiMjQ4MTk0IiwidXNlcklkIjoiMjUxMzY2IiwidHlwZUlkIjoiMWJjNTA3Y2MtYTMxZC00MTliLWI0OGEtZTVkOGUzYmMwODFiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODQxODc2OTcsImV4cCI6NDgzOTk0NzY5N30.nh4cnHbpY8g9HhG-gZ3wNtsxaQAbLrv2QkMKUUz27rU",
});

export async function getRegistryContract(providerOrSigner) {
    const modal = new web3modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(
        registryAddress,
        registryAbi,
        provider
    );
    if (providerOrSigner == true) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            registryAddress,
            registryAbi,
            signer
        );
        return contract;
    }
    return contract;
}

export async function getModelGenContract(providerOrSigner, address) {
    const modal = new web3modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(address, modelGenAbi, provider);
    if (providerOrSigner == true) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, modelGenAbi, signer);
        return contract;
    }
    return contract;
}

export async function getNftContract() {
    const modelGenAddr = await getModelGenAddress();

    const modal = new web3modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(modelGenAddr, NftAbi, signer);
    return nftContract;
}

export async function getUserAddress() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    return accounts[0];
}

export async function getModelGenAddress() {
    const contract = await getRegistryContract();
    const data = await contract.modelGen();
    console.log("Fetched");
    return data;
}

export async function getModelMetadata(tokenId) {
    const modelGenAddress = await getModelGenAddress();
    const contract = await getModelGenContract(false, modelGenAddress);
    const data = await contract.tokenURI(tokenId);
    console.log("Fetched");
    return data;
}

export async function getPosterAdsByModelId(modelId) {
    const address = await getTBAFromModelId(modelId);
    const data = await fetch(address);
    console.log(data);
    return data;
}

export async function getTBAFromModelId(modelId) {
    const contract = await getRegistryContract();
    const data = await contract.idToModelAcc(modelId);
    console.log(data[0]);
    return data[0];
}

async function fetch(user) {
    const options = {
        method: "GET",
        url: `https://deep-index.moralis.io/api/v2/${user}/nft`,
        params: { chain: "mumbai", format: "hex", normalizeMetadata: "false" },
        headers: {
            accept: "application/json",
            "X-API-Key":
                "ECu9sgtiXTgwMKEoJCg0xkjXfwm2R3NhOAATMBiTNIQoIzd7cAmeBibctzQyLkvY",
        },
    };

    const data = await axios.request(options);
    const res = await data.data.result;
    console.log("res", res);
    return res;
}

async function callModelGenAPI(_prompt) {
    const apiUrl = "https://api.thecatapi.com/v1/images/search/";

    try {
        const response = await axios.get(apiUrl);
        return response.data[0].url;
    } catch (error) {
        console.error("Error fetching cat data:", error.message);
        return null;
    }
}

async function createURI(_name, _prompt) {
    const image = await callModelGenAPI(_prompt);
    // if (!_name || !_prompt || !image) return;
    console.log("img:", image);
    const data = JSON.stringify({ _name, _prompt, image });
    const files = [new File([data], "data.json")];
    const metaCID = await uploadToIPFS(files);
    const url = `https://ipfs.io/ipfs/${metaCID}/data.json`;
    console.log(url);
    return url;
}

export async function createModelGen(_name, _prompt) {
    const uri = await createURI(_name, _prompt);
    const contract = await getRegistryContract(true);
    const tx = await contract.createModel(uri);
    await tx.wait();
    console.log("Account Created successfully");
}

export async function createPosterAd(modelId) {
    const contract = await getRegistryContract(true);
    const tx = await contract.callImageAdGen(modelId);
    await tx.wait();
    console.log("Created successfully");
}

// export async function getPosterAds(modelId) {

//     init("YOUR_AIRSTACK_API_KEY");

//     const query = `YOUR_QUERY`; // Replace with GraphQL Query

//     const { data, error } = await fetchQuery(query);

//     console.log("data:", data);
//     console.log("error:", error);
// }

export async function listForSale(modelId, _price) {
    const nftContract = await getNftContract();
    const approve = await nftContract.approve(registryAddress, modelId);
    console.log("_price", _price);
    const price = ethers.utils.parseEther(_price);
    const contract = await getRegistryContract(true);
    const tx = await contract.listModelForSale(modelId, price);
    await approve.wait();
    await tx.wait();
    console.log("Listed successfully");
}

export async function buyModel(modelId, _price) {
    const weiPrice = ethers.utils.parseUnits(_price.toString(), "ether");
    const contract = await getRegistryContract(true);
    const tx = await contract.buyModel(modelId, {
        value: weiPrice,
        gasLimit: 1000000,
    });
    await tx.wait();
    console.log("Listed successfully");
}

export async function fetchAllModels() {
    const contract = await getRegistryContract();

    const modelGenAddress = await getModelGenAddress();
    const modelGenContract = await getModelGenContract(false, modelGenAddress);

    const data = await contract.fetchAllModel();
    // console.log("data", data)
    const items = await Promise.all(
        data.map(async (i) => {
            const metadataUrl = await modelGenContract.tokenURI(i.modelId.toNumber());
            const metadata = await axios.get(metadataUrl);
            let price = ethers.utils.formatEther(i.price);
            let item = {
                name: metadata.data._name,
                prompt: metadata.data._prompt,
                modelImg: metadata.data.image,
                tba: i.tba.toString(),
                imgAdGen: i.imgAdGen.toString(),
                modelId: i.modelId.toNumber(),
                creator: i.creator.toString(),
                owner: i.owner.toString(),
                price,
                sale: i.sale,
                // metadata,
            };
            return item;
        })
    );
    allModels = items;
    console.log("All Models", items);
    return items;
}

export async function fetchMarketplaceModels() {
    if (allModels.length > 0) {
        const filteredArray = allModels.filter(
            (subarray) => subarray.sale == true
        );
        return filteredArray;
    } else {
        const data = await fetchAllModels();
        const filteredArray = data.filter((subarray) => subarray.sale == true);
        return filteredArray;
    }
}

export async function fetchMyModels() {
    const data = await fetchAllModels();
    return data;

    // const me = await getUserAddress();
    // me.toString().toLowerCase();
    // const data = await fetchAllModels();
    // const filteredArray = data.filter((subarray) => {
    //     subarray.owner.toLowerCase();
    //     console.log("me", me);
    //     console.log("val", subarray.owner)
    //     subarray.owner === me;
    // });

    // return filteredArray

    // if (allModels.length > 0) {
    //     const filteredArray = allModels.filter((subarray) => {
    //         subarray.owner.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    //         subarray.owner === me.toString();
    //     });
    //     return filteredArray;
    // } else {
    //     const data = await fetchAllModels();
    //     const filteredArray = data.filter((subarray) => {
    //         let val = subarray.owner
    //         val.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    //         console.log("val", val)
    //         val.toString() === me.toString();
    //     });
    //     return filteredArray;
    // }
}

function getAccessToken() {
    // return process.env.NEXT_PUBLIC_Web3StorageID
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkyMjkyQjQ5YzFjN2ExMzhERWQxQzQ3NGNlNmEyNmM1NURFNWQ0REQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjUyMzg2MDc1NDEsIm5hbWUiOiJNZXRhRmkifQ.cwyjEIx8vXtTnn8Y3vctroo_rooHV4ww_2xKY-MT0rs";
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
}

export const uploadToIPFS = async (files) => {
    const client = makeStorageClient();
    const cid = await client.put(files);
    return cid;
};
