import { useEffect } from "react";

export default function WebSocketClient() {
    let userId: string;
    
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8999//");
        ws.onmessage = (message: any) => {
            const response = JSON.parse(message.data);
            console.log("response: ", response);
            userId = response.userId;
        }
        console.log("ws: ", ws);
        
    })

    return <div>
        <button onClick={() => createMultiplayerGame(userId)}>Test</button>
    </div>;
}

const createMultiplayerGame = (userId: string) => {
    console.log("createMultiplayerGame");
    
    const payload = {
        "method": "createMultiplayerGame",
        "userId": userId,
    }

    console.log("payload: ", payload);
    
}