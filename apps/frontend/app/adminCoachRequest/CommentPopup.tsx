import React, { useState } from "react";
import { CommentPopupProps } from "../types";

const ConfirmationPopup: React.FC<CommentPopupProps> = ({
    type,
    request,
    onClose,
    onConfirm,
}) => {
    const [comment, setComment] = useState("");

    const handleSend = () => {
        if (!request) return;

        const updatedRequest = {
            ...request,
            status: type === "Accept" ? "Accepted" : "Rejected",
            comments: comment || null,
        };

        console.log("Updated request:", updatedRequest);

        onConfirm(comment || null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-[#3A3B43] text-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">
                    {type === "Accept" ? "Confirm Accept" : "Confirm Rejection"}
                </h3>

                <div className="mb-4">
                    <textarea
                        className="w-full bg-[#2E2E33] rounded-lg p-2 text-sm focus:outline-none"
                        rows={3}
                        placeholder="Write your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-[#4CAF50] hover:bg-[#43a047] text-white px-4 py-2 rounded-lg"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
