import { useEffect, useState } from "react";

export default function WebSocketClient() {
    const [userId, setUserId] = useState<string>();
    const [ws, setWebSocket] = useState();

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8999//");
        ws.onmessage = (message: any) => {
            const response = JSON.parse(message.data);
            console.log("response: ", response);

            setUserId(response.userId);
        }
        setWebSocket(ws as any);


    }, [])


    const createMultiplayerGame = () => {
        const payload = {
            "method": "createMultiplayerGame",
            "userId": userId,
        }
        ws.send(JSON.stringify(payload));

    }


    return <div>
        <button onClick={() => createMultiplayerGame()}>CreateGame</button>
    </div>;
}



