import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";

const URL = "http://localhost:3000"

export const Room = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get("name");
    const [socket, setSocket] = useState<null | Socket>(null)
        

    useEffect(() => {
        const socket = io(URL);

          setSocket(socket)
          socket.on('send-offer', (roomId) => {
            alert("Send offer please!!")
            socket.emit("offer", {
                sdp: "",
                roomId
            })
          });

          socket.on("offer", ({roomId, offer}) => {
            alert("send answer please")
            socket.emit("answer", {
                roomId,
                sdp: ""
            })
          })

          socket.on("answer", ({roomId, answer}) => {
            alert("connection done")
          
          })
    }, [name])

    return <div> 
        Hi, {name}
    </div>
}