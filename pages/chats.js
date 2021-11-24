import {useState, useEffect, useContext} from "react";
import { Context } from "../context"
import { useRouter } from "next/router"
import axios from "axios"
import dynamic from "next/dynamic"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ChatEngine = dynamic(() => 
  import("react-chat-engine").then((module) => module.ChatEngine)
)
const MessageFormSocial = dynamic (() => 
  import("react-chat-engine").then((module) => module.MessageFormSocial)
)

export default function Chats() {
  const {username, secret} = useContext(Context)
  const [showChat, setShowChat] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof document !== null){
      setShowChat(true)
    }
  })

  useEffect(() => {
    if (username.length === 0 || secret.length === 0) router.push("/")
  })

  if(!showChat) return <div />

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine 
          height="calc(100vh - 200px)"
          projectID="9607859b-d394-47a8-b653-b7062ee313b4"
          userName={username}
          userSecret={secret}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
    );
}
