import React, { useState, useEffect } from "react";
import styles from "./ProfileSetup.module.css";
import { useUser } from "../../context/UserContext";
import Button from '../../Components/Button';


const ProfileSetup = () => {
    const { userId, saveProfile, profiles } = useUser();

    const [profileData, setProfileData] = useState({
        name: "",
        age: "",
        location: "",
        email: "",
        phone: "",
        website: "",
        github: "",
        linkedin: "",
        tagline: "",
        bio: "",
        about: "",
    });

    useEffect(() => {
        if (userId && profiles[userId]) {
            setProfileData(profiles[userId]);
        }
    }, [userId, profiles]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveProfile(userId, profileData);
        alert("Profile saved successfully!");
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Profile Setup</h1>

                <label>
                    User ID:
                    <input
                        name="userId"
                        value={userId}
                        disabled
                        placeholder="User ID"
                    />
                </label>

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
                        onChange={handleChange}
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
