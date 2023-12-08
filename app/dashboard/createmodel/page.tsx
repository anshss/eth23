"use client";
import { createModelGen } from "@/utils";

const Dashboard = () => {

    async function createModelGenCall() {
        await createModelGen("test", "test-prompt")
    }
    return (
        <div>
            <p>Dashboard</p>
            <input placeholder="prompt please" />
            <button onClick={createModelGenCall}>gen</button>
        </div>
    );
};

export default Dashboard;
