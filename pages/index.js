import {useContext} from "react";
import { Context } from "../context"
import { useRouter } from "next/router"
import axios from "axios"

export default function Auth() {
  const {username, secret, setUsername, setSecret } = useContext(Context)
  const router = useRouter()

  function onSubmit(e){
    e.preventDefault()

    if(username.length === 0 || secret.length === 0)return //return nothing
    axios.put(
      "https://api.chatengine.io/users/",
      {username: username, secret: secret},
      {headers: {"Private-Key": "449e2530-229b-4d6b-8e00-8f4ed3520b0b"}}
    ).then(r => router.push('/chats'))
  }
  return (
      <div className="background">
        <div className="auth-container">
          <form className="auth-form" onSubmit={e => onSubmit(e)}>
            <div className="auth-title">Mavic Chat</div>
            <div className="input-container">
              <input 
                placeholder="Email"
                className="text-input"
                onChange={e => setUsername(e.target.value)}
              />
              <input 
                type="password"
                placeholder="Password"
                className="text-input"
                onChange={e => setSecret(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">Login | Sign Up</button>
          </form>
        </div>
      </div>
  )
}
