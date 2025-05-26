import React, { useState } from "react";
import { FaThumbsUp } from 'react-icons/fa';

function ProfileComp(props) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(78);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showDonateModal, setShowDonateModal] = useState(false);
    const [donationAmount, setDonationAmount] = useState("");
    const [copiedLink, setCopiedLink] = useState(false);

    const follow = () => {
        fetch(`http://localhost:8080/api/follow/users/1/target/${props.userid}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(data => data?.json())
            .then(data => {
                console.log('Follow response:', data);
                setIsFollowing(true);
            })
            .catch(error => console.error('Error during follow:', error));
    };

    const toggleLike = () => {
        setLiked(!liked);
        setLikeCount(prev => liked ? prev - 1 : prev + 1);
    };

    const toggleDonateModal = () => {
        setShowDonateModal(!showDonateModal);
        setDonationAmount("");
    };

    const handleDonate = () => {
        if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        alert(`Thank you for donating $${donationAmount}!`);
        setDonationAmount("");
        setShowDonateModal(false);
    };

    const handleShare = () => {
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
            })
            .catch(err => console.error("Failed to copy:", err));
    };

    return (
        <>
            <div className="flex justify-between items-center p-[50px] px-[70px] pb-[60px]">
                {/* Left side */}
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 overflow-hidden rounded-full"><img className="w-[100%]" src="/static/icons/Account.png"></img></div>
                    <div>
                        <h1 className="text-2xl font-semibold">{props.title}</h1>
                        <p className="text-gray-400 text-sm">{props.users} · {props.followers}</p>
                    </div>
                    <button
                        onClick={follow}
                        disabled={isFollowing}
                        className={`px-4 py-1 ${isFollowing ? 'bg-gray-400' : 'bg-green-400'} text-black rounded`}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button
                        onClick={handleShare}
                        className="px-4 py-1 border border-gray-600 text-gray-300 rounded"
                    >
                        Share
                    </button>
                    {copiedLink && <span className="text-sm text-green-400 ml-2">Link copied!</span>}
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-6">
                    <button
                        onClick={toggleDonateModal}
                        className="px-6 py-2 bg-green-400 text-black rounded"
                    >
                        Donate
                    </button>
                    <button
                        onClick={toggleLike}
                        className={`flex items-center space-x-1 ${liked ? 'text-blue-500' : 'text-gray-400'}`}
                    >
                        <FaThumbsUp />
                        <span>{likeCount}</span>
                    </button>
                </div>
            </div>

            {/* Donation Modal */}
            {showDonateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-center">Donate</h2>
                        <input
                            type="number"
                            className="w-full border border-gray-300 p-2 rounded mb-4"
                            placeholder="Amount (USD)"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                        />
                        <div className="text-center mb-4">
                            <span className="text-lg text-green-600 font-semibold">
                                ${donationAmount || 0}
                            </span>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 text-black rounded"
                                onClick={toggleDonateModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded"
                                onClick={handleDonate}
                            >
                                Donate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileComp;
