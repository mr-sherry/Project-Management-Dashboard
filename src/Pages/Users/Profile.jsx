import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { NavLink } from "react-router-dom";
import Button from '../../Components/Button';
import { useFirebase } from "../../context/firebase";


const Profile = () => {
    const firebase = useFirebase();

    const [userProfile, setUserProfile] = useState([])
    console.log("🚀 ~ Profile ~ userProfile:", userProfile)

    useEffect(() => {
        firebase.getUserProfile().then(userProfiles => {
            const matchedProfile = userProfiles.docs.find((profile) => {
                return profile.data().userId === firebase.user.uid
            })
            console.log("🚀 ~ matchedProfile ~ matchedProfile:", matchedProfile)
            setUserProfile(matchedProfile.data())
        }

        )
    }, [firebase.user])



    return (
        <div className={styles.container}>

            {/* Sidebar Card */}
            <div className={styles.card}>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQg-lr5__zRqY3mRg6erzAD9n4BGp3G8VfA&s' alt="Profile" className={styles.profileImage} />
                <h2>Hello, I'm <span>{userProfile.name}</span></h2>
                <p>{userProfile.bio}</p>
                <div className={styles.socialIcons}>
                    <a href={userProfile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href={`mailto:${userProfile.email}`}>Email</a>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.content}>
                <h1 className={styles.title}>Profile</h1>
                <NavLink to={'/profile-setup'}>
                    <Button>Edit Profile</Button>
                </NavLink>
                <p className={styles.subtitle}>{userProfile.tagline}</p>

                <div className={styles.sections}>
                    <div className={styles.details}>
                        <h3>Details</h3>
                        <p><strong>Name:</strong> {userProfile.name}</p>
                        <p><strong>Age:</strong> {userProfile.age}</p>
                        <p><strong>Location:</strong> {userProfile.location}</p>
                        <p><strong>Email:</strong> {userProfile.email}</p>
                        <p><strong>Phone:</strong> {userProfile.phone}</p>
                        <p><strong>Website:</strong> <a href={`https://${userProfile.website}`} target='_blank'>{userProfile.website}</a></p>
                    </div>

                    <div className={styles.about}>
                        <h3>About Me</h3>
                        <p>
                            {userProfile.about}
                        </p>
                        <button className={styles.contactBtn}>Contact Me</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
