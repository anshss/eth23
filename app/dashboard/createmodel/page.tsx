"use client";
import { createModelGen } from "@/utils";

const CreateModel = () => {

    async function createModelGenCall() {
        await createModelGen("test", "test-prompt")
    }

    return (
        <div>
            <p>Create Model</p>
            {/* <input placeholder="prompt please" /> */}
            <button onClick={createModelGenCall}>gen</button>
        </div>
    );
};

export default CreateModel;
