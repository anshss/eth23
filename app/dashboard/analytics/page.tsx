"use client";

import { createStaticContent } from "@/utils";
import NavBar from "@/components/NavBar";
import styled from "styled-components"
import SideBar from "@/components/SideBar";

const Analytics = () => {

    return (
        <div>
            <NavBar/>
                <SideBar/>
                <p>Analytics</p>
                {/* <input type="text" placeholder="product-image"/>
                <input type="file" placeholder="model id" />
                <input type="text" placeholder="prompt please" /> */}
        </div>
    );
};

export default Analytics;
