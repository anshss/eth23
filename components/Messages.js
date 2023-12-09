import React, {useEffect} from "react";
import { ethers } from "ethers";
import {getSigner} from "@/utils";
import { Client } from "@xmtp/xmtp-js";

const Messages = ({
    receiver
}) => {
    const [msgs, setMsgs] = React.useState([]);
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
        const messages = await conversation.messages();
        console.log('msgs', messages,  'values of messages', Object.values(messages))
        setMsgs(Object.values(messages))
        // console.log('conversations existing', conversation)
    }
    console.log('msgs', msgs)
    return(<div>
        {msgs.map(e=>(<div>
            {console.log('e', e)}
            <p>{e.senderAddress}: {e.content}</p>
            </div>))}

            asdasd
    </div>)
}

export default Messages