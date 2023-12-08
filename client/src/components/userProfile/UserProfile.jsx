import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { useAuth } from '../../contexts/AuthContext';
import PageLoader from '../shared/pageLoader/PageLoader';
import { profileImages } from '../../utilities/profileImages';
import { Link, useNavigate } from 'react-router-dom';
import { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../../config/appwriteConfig';
import { Query } from 'appwrite';

export default function UserProfile() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (localStorage.getItem(user.email)) {
                setProfileImage(localStorage.getItem(user.email));
            } else {
                setProfileImage('/tv-1.png');
                localStorage.setItem(user.email, '/tv-1.png');
            }
            setLoading(false);
        } else {
            navigate('/user/sign-in');
        }
        // console.log(user);
        getMessages();

        window.addEventListener('click', backdropCloseModal);
        return () => {
            window.removeEventListener('click', backdropCloseModal);
        };
    }, [])

    async function getMessages() {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$updatedAt'),
                Query.limit(100),
            ]
        );
        // console.log('TOTAL: ', response.documents);
        const currentPageComments = response.documents.filter(x => x.user_id == user.$id);
        // console.log('PAGE: ', currentPageComments);
        setMessages(currentPageComments.slice(0, 10));
    }

    function openModal(e) {
        setModalOpen(true);
    }

    function closeModal(e) {
        setModalOpen(false);
    }

    function backdropCloseModal(e) {
        if (e.target.classList.contains('modal')) {
            setModalOpen(false);
        }
    }

    function chooseProfileImg(e) {
        const target = e.currentTarget.dataset.src;
        setProfileImage(target);
        localStorage.setItem(user.email, target);
        setModalOpen(false);
    }

    function parseAsset(assetKey) {
        // asset--id
        const [asset, id] = assetKey.split('--');

        switch (asset) {
            case 'show': return [`/shows/${id}/details`, 'show'];
            case 'actor': return [`/actors/${id}/details`, 'actor'];
            case 'ep': return [`/episodes/${id}`, 'episode'];
        }
    }

    return (
        <div className="user-profile-ctr">
            <h1>User Profile</h1>
            {loading
                ? (<PageLoader />)
                : (<>
                    <article className="a-full">
                        <section>
                            <div className="inner-section">
                                <img src={profileImage} alt="profile-img" onClick={openModal} />
                                <div id="profile-modal" className={`modal${modalOpen ? ' modal-open' : ''}`}>
                                    <div className="modal-content">
                                        <div className='tooltip-anchor'>
                                            <span className="material-symbols-outlined close"
                                                id="closeModalBtn" onClick={closeModal}>close</span>
                                            <div className='tooltip'>Close</div>
                                        </div>
                                        <h3>Choose a profile image</h3>
                                        <div className="modal-images">
                                            {profileImages.map(x => (
                                                <div key={x[0] + 'i-m-g'}>
                                                    <img src={`/p-img/${x[0]}.${x[1]}`} alt="profile-img"
                                                        data-src={`/p-img/${x[0]}.${x[1]}`} onClick={chooseProfileImg} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="inner-section">
                                <div>
                                    <p>Username:</p>
                                    <p><b>{user.name}</b></p>
                                </div>
                                <div>
                                    <p>Email:</p>
                                    <p><b>{user.email}</b></p>
                                </div>
                                <div>
                                    <p>Created:</p>
                                    <p><b>{new Date(user.$createdAt).toLocaleString()}</b></p>
                                </div>
                                <div>
                                    <p>Status:</p>
                                    <p><b>{user.status ? 'Active' : 'Limited'}</b></p>
                                </div>
                            </div>
                        </section>
                    </article>

                    <div className="comments-cage">
                        <div className="container">
                            <div className="room--container">
                                <h2 style={{ marginBottom: '20px' }}>Latest comments</h2>
                                <div className='com-ctr'>
                                    {messages.length == 0 && (<h3>You haven't posted any comments yet.</h3>)}
                                    {messages.map(message => (
                                        <div key={message.$id} className={"message--wrapper"}>
                                            <div className="message--header">
                                                <p>
                                                    <span> {user.name}</span>
                                                    <small className="message-timestamp"> {new Date(message.$updatedAt).toLocaleString()}</small>
                                                    <Link className='btn btn-sm' to={parseAsset(message.asset_id)[0]}
                                                    >Go to {parseAsset(message.asset_id)[1]} page</Link>
                                                </p>
                                            </div>
                                            <div className="message--body message--body--owner">
                                                <span>{message.body}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>)}
        </div>
    )
}
