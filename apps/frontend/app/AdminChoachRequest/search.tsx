"use client";
import { useState } from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import {useCoachRequestGet} from './hooks/useCoachRequestGet';

export default function Search() {
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

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

    interface FilterOption {
        filter: string;
    }

    const handleFilterSelect = (filter: FilterOption['filter']): void => {
        setSelectedFilter(filter);
        setShowFilterMenu(false);
    };

    const removeFilter = () => {
        setSelectedFilter(null);
    };

    return (
        <div className="flex flex-col items-center h-screen w-screen px-4 py-6 relative">
            {/* Título */}
            <h1 className="text-white text-2xl font-semibold mb-6 text-center">
                Admin Coach Request
            </h1>

            {/* Barra de búsqueda */}
            <div className="flex items-center gap-2 w-full max-w-[90%] md:max-w-2xl mb-4 relative">
                <div className="flex items-center flex-1 bg-[#3A3B43] rounded-lg overflow-hidden">
                    <FaSearch className="text-[#FFFFFFB3] ml-3" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-[#FFFFFFB3] placeholder-[#FFFFFFB3] focus:outline-none flex-1 px-3 py-2"
                    />
                </div>
                <button className="bg-[#BA474A] text-white font-medium px-4 py-2 rounded-lg flex-shrink-0">
                    Search
                </button>
                <button
                    className="bg-[#3A3B43] text-[#FFFFFFB3] p-2 rounded-lg flex-shrink-0 relative"
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                    <FaFilter />
                </button>

                {/* Menú de filtros */}
                {showFilterMenu && (
                    <div
                        className="absolute z-10 bg-[#3A3B43] text-white rounded-lg shadow-lg w-60 max-h-[150px] overflow-y-scroll top-[calc(100%+10px)] right-0 p-2"
                        style={{ maxHeight: "150px" }}
                    >
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

            {/* Filtro seleccionado */}
            {selectedFilter && (
                <div className="flex bg-[#3A3B43] text-white rounded-lg px-3 py-2 max-w-[90%] md:max-w-2xl">
                    <span className="mr-2">{selectedFilter}</span>
                    <FaTimes
                        className="cursor-pointer text-[#FFFFFFB3] hover:text-[#BA474A]"
                        onClick={removeFilter}
                    />
                </div>
            )}
            
        </div>
    );
}
