import React, { useState, useEffect } from 'react'
import { db } from '../services/firebase'

export default function Chat(): JSX.Element {
    const [chats, setChats] = useState([]);
    const [content, setContent] = useState();
    const [readError, setReadError] = useState();
    const [writeError, setWriteError] = useState();

    type ChatData = {
        content?: string
        timestamp?: string
        uid?: string
    }

    useEffect(() => {
        const getChatData = async () => {
            try {
                const chatData = await db.ref('chats/').on('value', snapshot => {
                    let chatsArr: ChatData[] = []
                    snapshot.forEach((snap) => {
                        chatsArr.push(snap.val())
                    })
                    setChats(chatsArr);
                })
            } catch (error) {
                setReadError(error)
            } finally {
                console.log("done")
            }
        }

        getChatData();
    }, [])

    console.log(chats)

    return (
        <h1>Chat page</h1>
    )
}