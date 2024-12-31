import React from 'react';

// Object Array
const profiles = [
    {
        email: 'johndoe123',
        name: 'John Doe',
        imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        designation: 'Alumni',
    },
    {
        email: 'janesmith456',
        name: 'Jane Smith',
        imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        designation: 'Student',
    },
    {
        email: 'jameslee789',
        name: 'James Lee',
        imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
        designation: 'Alumni',
    },
    {
        email: 'emilyclark012',
        name: 'Emily Clark',
        imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
        designation: 'Student',
    },
];

export const getProfiles = () => profiles;

export const ProfileCard = ({ profile }) => {
    return (
        <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
            <div className="flex items-center space-x-4">
                <img
                    src={profile.imageUrl}
                    alt={`${profile.name}'s profile`}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h4 className="text-lg font-semibold">{profile.name}</h4>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
            </div>
            <div>
                <span className="text-sm font-bold text-gray-700 py-1 px-3">
                    {profile.designation}
                </span>
            </div>
        </div>
    );
};

