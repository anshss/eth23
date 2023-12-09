"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import {Client} from "@xmtp/xmtp-js"
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
import Messages from "@/components/Messages";
import { getSigner } from '@/utils';
import { Wallet } from 'ethers';

const ChatRoom = () => {

  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [postMessage, setPostMessage] = useState('')
  const [signer, setSigner] = useState(null)

  var evnt = ''

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const sndr = urlSearchParams.get('sender');
    const rcvr = urlSearchParams.get('receiver')
    setSender(sndr||'')
    setReceiver(rcvr||'')
    receiveSigner()
  }, []);

  const receiveSigner = async () => {
    const s: any = await getSigner();
    setSigner(s)
  }

  if (!sender || !receiver) {
    // Handle loading state or invalid token
    return <p>Loading...</p>;
  }

  const sendMessage = async () => {
    console.log('postMessage', postMessage)
    const xmtp = await Client.create(signer, { env: "dev" });
    const conversation =await xmtp.conversations.newConversation(receiver)
    await conversation.send(evnt);
  }


  return (
    <div>
        <NavBar />
        <div className="flex">
            <SideBar />
            <div className="p-4 sm:ml-64 pt-20 bg-gray-900 w-full min-h-screen">
              {/* Hi, {sender} <br/>Chat with {receiver} */}
              HI, {sender}<br/>
              Chat with {receiver}
              <Messages receiver={receiver}/>
              <input className="text-black" onChange={(e)=> {evnt = (e.target.value)}}></input>
              <button onClick={sendMessage}>Send!</button>
            </div>
        </div>
    </div>
  );
};

export default ChatRoom;
