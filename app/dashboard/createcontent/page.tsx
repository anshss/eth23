"use client";

import { createStaticContent } from "@/utils";

const CreateContent = () => {
    async function createContentGenCall() {
        const productImage = await uploadProductImageToIPFS()
        await createStaticContent(productImage, "test-prompt", "2");
    }

    async function uploadProductImageToIPFS() {}

    return (
        <div>
            <p>Create Content</p>
            {/* <input type="text" placeholder="product-image"/>
            <input type="file" placeholder="model id" />
            <input type="text" placeholder="prompt please" /> */}
            <button onClick={createContentGenCall}>gen</button>
        </div>
    );
};

export default CreateContent;
