"use client";

import { useState } from "react";
import { FaSearch, FaFilter, FaTimes, FaCheck } from "react-icons/fa";
import { useCoachRequestGet } from "./hooks/useCoachRequestGet";
import { useCoachRequestUpdate } from "./hooks/useCoachRequestUpdate";
import Popup from "./popUp";
import ConfirmationPopup from "./CommentPopup";
import { TrainerRequest } from "../types";

export default function Search() {
    const { data: trainerRequests } = useCoachRequestGet();
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [popupData, setPopupData] = useState<TrainerRequest | null>(null);
    const { updateTrainerRequest, isLoading, error } = useCoachRequestUpdate();
    const [confirmationPopup, setConfirmationPopup] = useState<{
        type: "Accept" | "Reject";
        request: TrainerRequest | null;
    } | null>(null);

    const filterOptions = [
        "Weightlifting",
        "Resistance Training",
        "Cardio",
        "Yoga",
        "Pilates",
        "Crossfit",
        "HIIT",
        "Functional Training",
        "Boxing",
        "Martial Arts",
    ];

    const handleFilterSelect = (filter: string) => {
        setSelectedFilter(filter);
        setShowFilterMenu(false);
    };

    const removeFilter = () => {
        setSelectedFilter(null);
    };

    const handleConfirmAction = async (comments: string | null) => {
        if (!confirmationPopup?.request) return;
    
        const updatedRequest = {
            ...confirmationPopup.request,
            status: confirmationPopup.type === "Accept" ? "Accepted" : "Rejected",
            comments,
        };
        

        try {
            await updateTrainerRequest(confirmationPopup.request.TrainerRequestId, updatedRequest);
        } catch (error) {
            console.error("Error updating request:", error);
        } finally {
            setConfirmationPopup(null);
        }
    };

    const openConfirmationPopup = (type: "Accept" | "Reject", request: TrainerRequest) => {
        setConfirmationPopup({ type, request });
    };

    const filteredRequests = trainerRequests.filter((request) => {
        const matchesFilter = selectedFilter
            ? request.specialization === selectedFilter
            : true;
        const matchesSearch = searchQuery
            ? request.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
              request.specialization.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="flex flex-col items-center h-screen w-screen bg-[#1E1E1E] px-4 py-6 relative">
            <h1 className="text-white text-2xl font-semibold mb-6 text-center">
                Admin Coach Request
            </h1>

            <div className="flex items-center gap-2 w-full max-w-[90%] md:max-w-2xl mb-4 relative">
                <div className="flex items-center flex-1 bg-[#3A3B43] rounded-lg overflow-hidden">
                    <FaSearch className="text-[#FFFFFFB3] ml-3" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-[#FFFFFFB3] placeholder-[#FFFFFFB3] focus:outline-none flex-1 px-3 py-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    className="bg-[#3A3B43] text-[#FFFFFFB3] p-2 rounded-lg flex-shrink-0 relative"
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                    <FaFilter />
                </button>

                {showFilterMenu && (
                    <div className="absolute z-10 bg-[#3A3B43] text-white rounded-lg shadow-lg w-60 max-h-[150px] overflow-y-scroll top-[calc(100%+10px)] right-0 p-2">
                        {filterOptions.map((filter) => (
                            <div
                                key={filter}
                                className="px-3 py-2 cursor-pointer hover:bg-[#BA474A] rounded"
                                onClick={() => handleFilterSelect(filter)}
                            >
                                {filter}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedFilter && (
                <div className="flex items-center bg-[#3A3B43] text-white rounded-lg px-3 py-2 w-auto">
                    <span className="mr-2">{selectedFilter}</span>
                    <FaTimes
                        className="cursor-pointer text-[#FFFFFFB3] hover:text-[#BA474A]"
                        onClick={removeFilter}
                    />
                </div>
            )}

            <div className="w-full max-w-[90%] md:max-w-2xl bg-[#3A3B43] text-white rounded-lg mt-6 p-4 overflow-y-scroll max-h-[400px]">
                <h2 className="text-xl font-semibold mb-4">Trainer Requests</h2>
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                        <div
                            key={request.userId}
                            className="flex items-center justify-between bg-[#2E2E33] p-4 rounded-lg mb-4 shadow hover:shadow-lg transition cursor-pointer"
                            onClick={() => setPopupData(request)}
                        >
                            <p className="truncate max-w-[100px] md:max-w-[150px] text-sm">
                                {request.userId.slice(0, 6)}...
                            </p>

                            <p className="text-sm text-center flex-1 md:truncate">
                                {request.specialization}
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    className="bg-[#4CAF50] hover:bg-[#43a047] text-white p-2 rounded-md"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openConfirmationPopup("Accept", request);
                                    }}
                                    title="Accept"
                                >
                                    <FaCheck size={14} />
                                </button>
                                <button
                                    className="bg-[#F44336] hover:bg-[#e53935] text-white p-2 rounded-md"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openConfirmationPopup("Reject", request);
                                    }}
                                    title="Reject"
                                >
                                    <FaTimes size={14} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No trainer requests available.</p>
                )}
            </div>

            {popupData && (
                <Popup
                    data={popupData}
                    onClose={() => setPopupData(null)}
                    onAccept={(id) => {
                        openConfirmationPopup("Accept", popupData);
                        setPopupData(null);
                    }}
                    onReject={(id) => {
                        openConfirmationPopup("Reject", popupData);
                        setPopupData(null);
                    }}
                />
            )}

            {confirmationPopup && (
                <ConfirmationPopup
                    type={confirmationPopup.type}
                    request={confirmationPopup.request}
                    onClose={() => setConfirmationPopup(null)}
                    onConfirm={handleConfirmAction}
                />
            )}
        </div>
    );
}
