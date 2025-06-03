import React, { useEffect, useState } from "react";
import styles from "./ProfileSetup.module.css";
import Button from '../../Components/Button';
import { useFirebase } from "../../context/firebase";
import { useNavigate } from "react-router-dom";


const ProfileSetup = () => {

    const firebase = useFirebase();
    const [email, setEmail] = useState('');
    const [userId1, setUserId] = useState('');
    console.log("🚀 ~ ProfileSetup ~ userId:", userId1)
    const [userProfile, setUserProfile] = useState(null)
    console.log("🚀 ~ ProfileSetup ~ userProfile:", userProfile)
    const navigate = useNavigate()

    useEffect(() => {
        if (firebase.user) {
            const userEmail = firebase.user.email;
            const userId = firebase.user.uid;
            setEmail(userEmail);
            setUserId(userId);
            setProfileData((prev) => ({
                ...prev,
                userId: userId1,
                email: userEmail
            }));

            firebase.getUserProfile().then(userProfiles => {
                const matchedProfile = userProfiles.docs.find((profile) => {
                    return profile.data().userId === firebase.user.uid
                })
                console.log("🚀 ~ matchedProfile ~ matchedProfile:", matchedProfile)
                setUserProfile(matchedProfile.data())
            }
            )

        } else {
            navigate('/login')
        }
    }, [firebase.user]);

    useEffect(() => {
        if (userProfile) {
            setProfileData(userProfile)
        }

    }, [userProfile])

    const [profileData, setProfileData] = useState({
        userId: userId1,
        name: "",
        age: "",
        location: "",
        email: email,
        phone: "",
        website: "",
        github: "",
        linkedin: "",
        tagline: "",
        bio: "",
        about: "",
    });
    console.log("🚀 ~ ProfileSetup ~ profileData:", profileData)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userProfile) {
            alert("Profile updated successfully!");
            firebase.updateUserProfile(profileData.userId,
                profileData.name,
                profileData.age,
                profileData.location,
                profileData.email,
                profileData.phone,
                profileData.website,
                profileData.github,
                profileData.linkedin,
                profileData.tagline,
                profileData.bio,
                profileData.about)
        } else {
            alert("Profile saved successfully!");
            firebase.handleCreateNewProfile(
                profileData.userId,
                profileData.name,
                profileData.age,
                profileData.location,
                profileData.email,
                profileData.phone,
                profileData.website,
                profileData.github,
                profileData.linkedin,
                profileData.tagline,
                profileData.bio,
                profileData.about)
        };
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Profile Setup</h1>

                <label>
                    Name:
                    <input
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                    />
                </label>

                <label>
                    Age:
                    <input
                        name="age"
                        type="number"
                        value={profileData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        required
                    />
                </label>

                <label>
                    Location:
                    <input
                        name="location"
                        value={profileData.location}
                        onChange={handleChange}
                        placeholder="City, Country"
                        required
                    />
                </label>

                <label>
                    Email:
                    <input
                        name="email"
                        type="email"
                        value={profileData.email}
                        disabled
                        placeholder="Email address"
                        required
                    />
                </label>

                <label>
                    Phone:
                    <input
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        required
                    />
                </label>

                <label>
                    Website:
                    <input
                        name="website"
                        value={profileData.website}
                        onChange={handleChange}
                        placeholder="Portfolio website (optional)"
                    />
                </label>

                <label>
                    GitHub:
                    <input
                        name="github"
                        value={profileData.github}
                        onChange={handleChange}
                        placeholder="GitHub profile URL"
                    />
                </label>

                <label>
                    LinkedIn:
                    <input
                        name="linkedin"
                        value={profileData.linkedin}
                        onChange={handleChange}
                        placeholder="LinkedIn profile URL"
                    />
                </label>

                <label>
                    Tagline:
                    <input
                        name="tagline"
                        value={profileData.tagline}
                        onChange={handleChange}
                        placeholder="e.g. Front-end Developer, React Enthusiast"
                    />
                </label>

                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        placeholder="Short professional bio"
                    />
                </label>

                <label>
                    About:
                    <textarea
                        name="about"
                        value={profileData.about}
                        onChange={handleChange}
                        placeholder="Tell us more about yourself..."
                    />
                </label>


                <Button type="submit" className={styles.saveBtn}>
                    Save Profile
                </Button>
            </form>
        </div>
    );
};

export default ProfileSetup;
