
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
 const avatarAPI = "https://res.cloudinary.com/dooxbo8sg/image/upload/v1741110728/ModernMobiles/Others/zoeAvatar_vmcfep.png"

// Demo user data
const userData = {
    id: 1,
    name: "Alex Johnson",
    username: "@alexj_creative",
    profilePicture: avatarAPI,
    coverImage: "/api/placeholder/800/200",
    bio: "Content Creator | Video Editor | Designer",
    followers: 15420,
    following: 892,
    posts: 147,
    joinedDate: "March 2023",
    verified: true,
    credits: 45,
    location: "San Francisco, CA",
    website: "alexjcreative.com"
};

export default function Profile() {
    const { purchasedItems, coins, cartItems } = useSelector((state) => state.cart)
    const [activeTab, setActiveTab] = useState('templates');


    // Get preview styles for templates
    const getPreviewStyles = (name) => {
        switch (name) {
            case "Backdrop":
                return "bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white";
            case "Glow":
                return "text-cyan-300 bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30";
            case "Highlight":
                return "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 text-black";
            case "Mono":
                return "font-mono text-emerald-700 bg-gray-50 border border-emerald-200";
            case "Classic":
            default:
                return "text-slate-700 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100";
        }
    };

    const getCategoryColor = (type) => {
        switch (type) {
            case 'Premium': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Basic': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Free': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            {/* Main Container */}
            <div className="w-11/12 mx-auto py-6">

                {/* Profile Header Section */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
                    {/* Cover Image */}
                    <div className="relative h-48 sm:h-64 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
                        <div className="absolute inset-0 bg-black/20"></div>

                        {/* Profile Picture */}
                        <div className="absolute -bottom-16 left-6 sm:left-8">
                            <div className="relative">
                                <img
                                    src={userData.profilePicture}
                                    alt={userData.name}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white"
                                />
                                {userData.verified && (
                                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Edit Profile Button */}
                        <div className="absolute bottom-4 right-6">
                            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 border border-white/20">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20 pb-8 px-6 sm:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                                    {userData.name}
                                </h1>
                                <p className="text-purple-600 font-medium text-lg mb-2">{userData.username}</p>
                                <p className="text-gray-600 mb-3">{userData.bio}</p>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {userData.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Joined {userData.joinedDate}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        {userData.website}
                                    </div>
                                </div>
                            </div>

                            {/* Credits Display */}
                            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4 text-center min-w-[120px]">
                                <div className="text-2xl font-bold text-purple-600">{coins}</div>
                                <div className="text-sm text-purple-600 font-medium">Credits</div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">{userData.posts}</div>
                                <div className="text-sm text-gray-600 font-medium">Posts</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">{userData.followers.toLocaleString()}</div>
                                <div className="text-sm text-gray-600 font-medium">Followers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">{userData.following}</div>
                                <div className="text-sm text-gray-600 font-medium">Following</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        {[
                            { key: 'templates', label: 'My Templates', icon: '🎨', count: purchasedItems?.length },
                            { key: 'analytics', label: 'Analytics', icon: '📊' },
                            { key: 'settings', label: 'Settings', icon: '⚙️' }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex-1 px-4 py-4 text-center font-medium transition-all duration-300 relative ${activeTab === tab.key
                                        ? 'text-purple-600 bg-purple-50'
                                        : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="text-lg">{tab.icon}</span>
                                    <span className="hidden sm:inline">{tab.label}</span>
                                    {tab.count && (
                                        <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                                            {tab.count}
                                        </span>
                                    )}
                                </span>
                                {activeTab === tab.key && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                {activeTab === 'templates' && (
                    <div className="space-y-6">
                        {/* Templates Header & Controls */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">My Templates</h2>
                                    <p className="text-gray-600">
                                        {purchasedItems?.length} templates • Total spent: {purchasedItems?.reduce((sum, t) => sum + t.cost, 0)} credits
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="name">Name A-Z</option>
                    <option value="rating">Highest Rated</option>
                    <option value="downloads">Most Downloaded</option>
                  </select> */}

                                    <button onClick={() => window.location.href = '/'} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105">
                                        + Add New
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Templates Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {purchasedItems?.map((template, index) => (
                                <div
                                    key={template.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Template Preview */}
                                    <div className={`h-32 flex items-center justify-center text-sm font-medium relative overflow-hidden ${getPreviewStyles(template.name)}`}>
                                        <span className="relative z-10">{template.name}</span>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="flex gap-2">
                                                <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </button>
                                                <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Template Info */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">
                                                {template.name}
                                            </h3>
                                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(template.type)}`}>
                                                {template.type}
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.text}</p>

                                        {/* Template Stats */}
                                        <div className="space-y-2 text-xs text-gray-500">
                                            <div className="flex justify-between">
                                                <span>Cost:</span>
                                                <span className={`font-medium ${template.cost === 0 ? 'text-emerald-600' : 'text-purple-600'}`}>
                                                    {template.cost === 0 ? 'FREE' : `${template.cost} credits`}
                                                </span>
                                            </div>
                                        
                                            {template?.downloads && (
                                                <div className="flex justify-between">
                                                    <span>Downloads:</span>
                                                    <span className="font-medium">{template?.downloads}x</span>
                                                </div>
                                            )}
                                            {template?.lastUsed && (
                                                <div className="flex justify-between">
                                                    <span>Last used:</span>
                                                    <span className="font-medium">{formatDate(template.lastUsed)}</span>
                                                </div>
                                            )}
                                          
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 mt-4">
                                            <button className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-2 px-3 rounded-lg transition-colors text-sm">
                                                Download
                                            </button>
                                            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg transition-colors text-sm">
                                                Preview
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📊</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Analytics Coming Soon</h3>
                        <p className="text-gray-600">Track your template usage, downloads, and performance metrics.</p>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">⚙️</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Settings</h3>
                        <p className="text-gray-600">Manage your account preferences, notifications, and privacy settings.</p>
                    </div>
                )}
            </div>
        </div>
    </>
    );
}