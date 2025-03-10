import React, { useEffect, useState } from 'react';

interface ProfileData {
  name: string;
  title: string;
  description: string;
  skills: string[];
  interests: string[];
}
// React.FCはReact.FunctionComponentの略
// 記述しなくても自動的に型推論してくれる
const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/profile');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>{profile.name}</h1>
      <h2>{profile.title}</h2>
      <p>{profile.description}</p>
      
      <div className="section">
        <h3>スキル</h3>
        <ul>
          {profile.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      
      <div className="section">
        <h3>興味・関心</h3>
        <ul>
          {profile.interests.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
