import React, {useEffect} from "react";
import { ethers } from "ethers";
import {getSigner} from "@/utils";
import { Client } from "@xmtp/xmtp-js";

const Messages = ({
    receiver
}) => {
    const [msgs, setMsgs] = React.useState(false);
    useEffect(()=> {
        getMessages()
    }, [])

    const getMessages = async () => {
        const signer = await getSigner();
        const sender = await signer.getAddress();
        const xmtp = await Client.create(signer, {env: "dev"})
        const conversation = await xmtp.conversations.newConversation(
            receiver
          );
        console.log('conversation', conversation)
    }
    return(<div>
        Messsages
    </div>)
}

export default Messages