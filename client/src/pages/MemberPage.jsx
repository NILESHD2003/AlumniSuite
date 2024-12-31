import React, { useState } from 'react';
import {ProfileCard, getProfiles } from '../components/layout/ProfileCard';

const MemberPage = () => {
    const [searchQuery, setSearchQuery] = useState(''); // useState for searchquery
    const profiles = getProfiles(); // profiles directly from ProfileCard

    // function to search by name and by email
    const filteredProfiles = profiles.filter((profile) =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // temporary 
    const clickHandler = () => {
        console.log("Alert Button Clicked!");
    };

    return (
        <div className="relative bg-white p-6 rounded-lg max-w-4xl mx-auto flex flex-col h-[90vh]">
            <h3 className="text-left text-2xl font-semibold mb-2">Members</h3>
            <p className="text-left text-lg text-gray-500 mb-6">Manage your members and add them</p>

            {/* search bar */}
            <div className="w-full mb-4 p-2 rounded">
                <input
                    type="text"
                    placeholder="Search for members by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            {/* profile card */}
            <div className="flex flex-col space-y-4 mb-4 overflow-y-auto flex-grow">
                {filteredProfiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                ))}
            </div>

            <div className="flex justify-end bottom-10 right-4">
                <button className="bg-[#0e3e7b] text-white py-2 px-6 rounded-full shadow-lg hover:bg-[#E5E5E5] hover:text-[#0e3e7b] transition duration-200 font-bold" onClick={clickHandler}>
                    + Add Member
                </button>
            </div>
        </div>
    );
};

export default MemberPage;
