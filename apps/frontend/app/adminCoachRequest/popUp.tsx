import { FaTimes, FaCheck, FaTimesCircle } from "react-icons/fa";
import { TrainerRequest } from "../types";

interface PopupProps {
    data: TrainerRequest;
    onClose: () => void;
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
}

export default function Popup({ data, onClose, onAccept, onReject }: PopupProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#1E1E1E] rounded-lg shadow-lg w-[90%] max-w-[500px] text-white relative">
                <div className="flex justify-between items-center bg-[#2E2E33] px-4 py-3 rounded-t-lg border-b border-[#3A3B43]">
                    <h2 className="text-lg font-semibold">Trainer Request Details</h2>
                    <button
                        className="text-[#FFFFFFB3] hover:text-[#BA474A] transition"
                        onClick={onClose}
                        aria-label="Close popup"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div className="flex flex-col">
                        <span className="font-semibold text-[#FFFFFFB3]">User ID:</span>
                        <span className="truncate">{data.userId}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold text-[#FFFFFFB3]">Specialization:</span>
                        <span>{data.specialization}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold text-[#FFFFFFB3]">Experience:</span>
                        <span>{data.experience}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold text-[#FFFFFFB3]">Availability:</span>
                        <span>{data.availability}</span>
                    </div>

                    {data.certifications.length > 0 && (
                        <div className="flex flex-col">
                            <span className="font-semibold text-[#FFFFFFB3]">Certifications:</span>
                            <ul className="list-disc list-inside text-sm">
                                {data.certifications.map((cert, index) => (
                                    <li key={index}>
                                        {cert.name} - Issued by {cert.issuedBy} on {cert.issueDate}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center px-4 py-3 bg-[#2E2E33] rounded-b-lg border-t border-[#3A3B43]">
                    <button
                        className="flex items-center gap-2 bg-[#4CAF50] hover:bg-[#43a047] text-white font-medium px-4 py-2 rounded-lg"
                        onClick={() => onAccept(data.userId)}
                    >
                        <FaCheck />
                        Accept
                    </button>
                    <button
                        className="flex items-center gap-2 bg-[#F44336] hover:bg-[#e53935] text-white font-medium px-4 py-2 rounded-lg"
                        onClick={() => onReject(data.userId)}
                    >
                        <FaTimesCircle />
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}
