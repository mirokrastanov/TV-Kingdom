import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { useAuth } from '../../contexts/AuthContext';
import PageLoader from '../shared/pageLoader/PageLoader';

export default function UserProfile() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const stored = {
        account: JSON.parse(localStorage.getItem('TV-account')),
        session: JSON.parse(localStorage.getItem('TV-session')),
    };

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
        console.log(user);
        console.log(stored.account);
        console.log(stored.session);

    }, [])



    return (
        <div className="user-profile-ctr">
            <h1>User Profile</h1>
            {loading
                ? (<PageLoader />)
                : (
                    <article className="a-full">
                        <section>
                            <div className="inner-section">
                                <img src="/src/assets/tv-1.png" alt="profile-img" />
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
