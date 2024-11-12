import React, { useState, useEffect } from 'react';
import { FaUser, FaBook, FaComments, FaDollarSign, FaStar, FaUserFriends, FaQuestionCircle, FaChevronDown } from 'react-icons/fa';

const Dashboard = ({ user }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

//   useEffect(() => {
//     // Fetch user profile data
//     const fetchProfileData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3005/api/auth/user/${user.id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch profile data');
//         }
//         const data = await response.json();
//         setProfileData(data);
//         setEditedData(data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//       }
//     };

//     fetchProfileData();
//   }, [user.id]);

//   const handleEditProfile = async () => {
//     try {
//       const response = await fetch(`http://localhost:3005/api/auth/user/${user.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(editedData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }

//       const updatedData = await response.json();
//       setProfileData(updatedData);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setEditedData({ ...editedData, [e.target.name]: e.target.value });
//   };

  const sidebarItems = [
    { icon: <FaUser />, text: 'Dashboard' },
    { icon: <FaBook />, text: '1:1 Tutoring' },
    { icon: <FaBook />, text: 'Learning Material' },
    { icon: <FaComments />, text: 'Messages' },
    { icon: <FaDollarSign />, text: 'Transactions' },
    { icon: <FaStar />, text: 'Reviews' },
    { icon: <FaUserFriends />, text: 'Refer Your Friends' },
    { icon: <FaQuestionCircle />, text: 'Support' },
  ];

  const gameTopics = [
    { name: 'Linked List', subtopics: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List'] },
    { name: 'Stack', subtopics: ['Array Implementation', 'Linked List Implementation', 'Applications'] },
    { name: 'Queues', subtopics: ['Array Implementation', 'Linked List Implementation', 'Priority Queue'] },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <img src="/logo.png" alt="Logo" className="w-32 mx-auto" />
        </div>
        <nav>
          {sidebarItems.map((item, index) => (
            <a key={index} href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
              <span className="mr-2">{item.icon}</span>
              {item.text}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center">
              <span className="mr-2">{profileData?.FirstName} {profileData?.LastName}</span>
              <img src={profileData?.profileImage || '/default-avatar.png'} alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" onClick={() => setActiveSection('profile')} />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {activeSection === 'profile' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                {isEditing ? (
                  <form className="space-y-4 p-4">
                    {Object.entries(editedData).map(([key, value]) => (
                      <div key={key}>
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key}</label>
                        <input
                          type="text"
                          name={key}
                          id={key}
                          value={value}
                          //onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    ))}
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        //onClick={() => setIsEditing(false)}
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <dl className="sm:divide-y sm:divide-gray-200">
                    {profileData && Object.entries(profileData).map(([key, value]) => (
                      <div key={key} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{key}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          )}

          {/* Game section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Structify: Data Structures Game</h3>
            </div>
            <div className="border-t border-gray-200">
              {gameTopics.map((topic, index) => (
                <div key={index} className="px-4 py-5 sm:p-6">
                  <button
                    onClick={() => setActiveSection(topic.name)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h4 className="text-md font-medium text-gray-900">{topic.name}</h4>
                    <FaChevronDown className={`transform ${activeSection === topic.name ? 'rotate-180' : ''} transition-transform`} />
                  </button>
                  {activeSection === topic.name && (
                    <ul className="mt-2 space-y-2">
                      {topic.subtopics.map((subtopic, subIndex) => (
                        <li key={subIndex}>
                          <button
                            onClick={() => {/* Open game for this subtopic */}}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            {subtopic}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;