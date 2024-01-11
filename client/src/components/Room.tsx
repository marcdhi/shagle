import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";

const URL = "http://localhost:4000"

export const Room = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get("name");
    // const [socket, setSocket] = useState<null | Socket>(null)
    const [lobby, setLobby] = useState(true)
        

    useEffect(() => {
        const socket = io(URL);

          // setSocket(socket)
          socket.on('send-offer', (roomId) => {
            alert("Send offer please!!")
            socket.emit("offer", {
              roomId,
              sdp: ""
            })
            setLobby(false)
          });

          socket.on("offer", ({roomId, offer}) => {
            alert("send answer please")
            setLobby(false)
            socket.emit("answer", {
              roomId,
              sdp: ""
            })
          })
          
          socket.on("answer", ({roomId, answer}) => {
            alert("connection done")
            setLobby(false)
          
          })

          socket.on("lobby", () => {
            setLobby(true)
          })
    }, [name])

    if (lobby) {
      return <div> 
        Waiting to join shagle rooms.......
    </div>
    }

    return <div>
      Hi {name} welcome to shagle

      <video width={400} height={400} ></video>
      <video width={400} height={400} ></video>
    </div>
}