import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { useAuth } from '../../contexts/AuthContext';
import PageLoader from '../shared/pageLoader/PageLoader';

export default function UserProfile() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        if (user) {
            if (localStorage.getItem(user.email)) {
                setProfileImage(localStorage.getItem(user.email));
            } else {
                setProfileImage('/src/assets/tv-1.png');
                localStorage.setItem(user.email, '/src/assets/tv-1.png');
            }
            setLoading(false);
        }
        // console.log(user);

        window.addEventListener('click', backdropCloseModal);
        return () => {
            window.removeEventListener('click', backdropCloseModal);
        };
    }, [])

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

    return (
        <div className="user-profile-ctr">
            <h1>User Profile</h1>
            {loading
                ? (<PageLoader />)
                : (
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
                                            <div>
                                                <img src="/src/assets/tv-1.png" alt="profile-img" data-src="/src/assets/tv-1.png"
                                                    onClick={chooseProfileImg} />
                                            </div>


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
                )}
        </div>
    )
}
