import React, { useState, useEffect } from 'react';
import './CommentsContainer.css';
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../../../config/appwriteConfig';
import { ID, Query, Permission, Role } from 'appwrite';
import { useAuth } from '../../../contexts/AuthContext';
import { Trash2 } from 'react-feather';
import { useParams } from 'react-router-dom';


export default function CommentsContainer() {
    const [messageBody, setMessageBody] = useState('');
    const [messages, setMessages] = useState([]);
    const { user } = useAuth();
    const { showId, actorId, episodeId } = useParams();
    const subscribeQuery = `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`;

    useEffect(() => {
        getMessages();
        // console.log(showId, actorId, episodeId);
        // console.log(showId ? [showId, 'show'] : (actorId ? [actorId, 'actor'] : [episodeId, 'ep']));

        const unsubscribe = client.subscribe(subscribeQuery, response => {
            // console.log('REAL TIME: ', response);
            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                // console.log('A MESSAGE WAS CREATED');
                setMessages(prevState => [response.payload, ...prevState]);
            }
            if (response.events.includes("databases.*.collections.*.documents.*.update")) {
                // add edit logic later
            }
            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                // console.log('A MESSAGE WAS DELETED!!!');
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id));
            }
        });
        // console.log('unsubscribe:', unsubscribe);

        return () => { unsubscribe() };
    }, []);

    const getMessages = async () => {
        let asset = showId ? [showId, 'show'] : (actorId ? [actorId, 'actor'] : [episodeId, 'ep']);
        let assetId = `${asset[1]}--${asset[0]}`;

        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(100),
            ]
        );
        // console.log('TOTAL: ', response.documents);
        const currentPageComments = response.documents.filter(x => x.asset_id == assetId);
        console.log('PAGE: ', currentPageComments);
        setMessages(currentPageComments);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('MESSAGE:', messageBody);

        const permissions = [
            Permission.write(Role.user(user.$id)), // inc create, update, delete permissions
        ];

        let asset = showId ? [showId, 'show'] : (actorId ? [actorId, 'actor'] : [episodeId, 'ep']);
        const payload = {
            user_id: user.$id,
            username: user.name,
            asset_id: `${asset[1]}--${asset[0]}`,
            body: messageBody
        };

        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            permissions
        );

        // console.log('RESPONSE:', response);

        // setMessages(prevState => [response, ...prevState]);

        setMessageBody('');
    }

    const deleteMessage = async (id) => {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, id);
        // for unsubscribed view
        // setMessages(prevState => prevState.filter(message => message.$id !== id)); 
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
                                {/* same as below for update/edit */}
                                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                    <Trash2 className="delete--btn" onClick={() => { deleteMessage(message.$id) }} />
                                )}
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
