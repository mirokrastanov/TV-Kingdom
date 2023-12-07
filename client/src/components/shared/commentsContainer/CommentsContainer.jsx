import React, { useState, useEffect } from 'react';
import './CommentsContainer.css';
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../../../config/appwriteConfig';
import { useAuth } from '../../../contexts/AuthContext';


export default function CommentsContainer() {
    const [messageBody, setMessageBody] = useState('');
    const [messages, setMessages] = useState([]);
    const { user } = useAuth();


    useEffect(() => {
        getMessages();

    }, []);


    const getMessages = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
        );
        console.log(response.documents);
        setMessages(response.documents);
    }


    return (
        <main className="container">
            <div className="room--container">
                <form id="message--form">
                    <div>
                        <textarea
                            required
                            maxLength="250"
                            placeholder="Say something..."
                        ></textarea>
                    </div>

                    <div className="send-btn--wrapper">
                        <input className="btn btn--secondary" type="submit" value="send" />
                    </div>
                </form>

                <div>
                    {/* TODO: map here when all is done */}
                </div>
            </div>
        </main>
    )
}
