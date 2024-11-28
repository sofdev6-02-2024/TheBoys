"use client";

import React, { useState, useEffect } from 'react';
import { useKeycloakProfile } from "@/app/Profile/hooks/useUserProfile";

export default function CommunitiesPage() {
  const { user } = useKeycloakProfile();
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    cost: '',
  });

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    console.log({
      ...formData,
      cost: Number(formData.cost.replace('$', '').trim()),
      trainerId: userId,
    });
    setIsModalOpen(false); // Cierra el modal después de confirmar
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen pt-10">
      {/* Título "Communities" */}
      <h1 className="text-3xl font-bold mb-4">Communities</h1>

      {/* Botón para abrir el modal */}
      <div className="w-full flex justify-end pr-10">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => setIsModalOpen(true)}
        >
          New Community
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded shadow-lg w-96 space-y-4">
            {/* Imagen de perfil */}
            <div className="flex flex-col items-center">
              <img
                src="https://image.cdn2.seaart.me/2024-01-13/cmh2vode878c73d6137g/f962d4474adced8aa8e6d547f2634fef5ca0a115_high.webp" // Puedes reemplazar con la URL real de la imagen
                alt="Community Profile"
                className="w-60 h-60 rounded-full"
              />
              <h2 className="text-lg font-semibold mt-2">{formData.name || "Community Name"}</h2>
            </div>

            {/* Formulario */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Name Community:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Community Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Details Community:</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Details Community"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type of Community:</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
                >
                  <option value="">Select Type</option>
                  <option value="Weightlifting">Weightlifting</option>
                  <option value="Resistance Training">Resistance Training</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Pilates">Pilates</option>
                  <option value="Crossfit">Crossfit</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Functional Training">Functional Training</option>
                  <option value="Boxing">Boxing</option>
                  <option value="Martial Arts">Martial Arts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cost of your Community:</label>
                <input
                  type="text"
                  name="cost"
                  placeholder="$20"
                  value={formData.cost}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            {/* Botón de confirmación */}
            <div className="flex justify-center">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
