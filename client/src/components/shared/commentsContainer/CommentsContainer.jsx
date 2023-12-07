import React, { useState, useEffect } from 'react';
import './CommentsContainer.css';
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../../../config/appwriteConfig';
import { ID, Query, Permission, Role } from 'appwrite';
import { useAuth } from '../../../contexts/AuthContext';


export default function CommentsContainer() {
    const [messageBody, setMessageBody] = useState('');
    const [messages, setMessages] = useState([]);
    const { user } = useAuth();


    useEffect(() => {
        getMessages();

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('MESSAGE:', messageBody);

        const payload = {
            body: messageBody
        };

        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
        );

        console.log('RESPONSE:', response);

        setMessages(prevState => [response, ...prevState]);

        setMessageBody('');

    }

    const getMessages = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(100),
            ]
        );
        console.log(response.documents);
        setMessages(response.documents);
    }


    return (
        <div className="container">
            <div className="room--container">
                <form id="message--form" onSubmit={handleSubmit}>
                    <div>
                        <textarea
                            required
                            maxLength="250"
                            placeholder="Type a comment..."
                            onChange={(e) => { setMessageBody(e.target.value) }}
                            value={messageBody}
                        ></textarea>
                    </div>

                    <div className="send-btn--wrapper">
                        <input className="btn btn--secondary" type="submit" value="send" />
                    </div>
                </form>

                <div>
                    {messages.map(message => (
                        <div key={message.$id} className={"message--wrapper"}>
                            <div className="message--header">
                                <p>
                                    {message?.username ? (
                                        <span> {message?.username}</span>
                                    ) : (
                                        'Anonymous user'
                                    )}
                                    <small className="message-timestamp"> {new Date(message.$createdAt).toLocaleString()}</small>
                                </p>

                                {/* TODO: Add delete and edit buttons here */}
                            </div>
                            <div className={"message--body" + (message.user_id === user.$id ? ' message--body--owner' : '')}>
                                <span>{message.body}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
