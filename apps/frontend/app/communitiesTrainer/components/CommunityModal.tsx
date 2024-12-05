import { CreateCommunity } from '@/app/utils/Connections/connectionsCommunity';
import { FaEdit } from 'react-icons/fa';
import Image from 'next/image';

type CommunityModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: CreateCommunity;
  setFormData: React.Dispatch<React.SetStateAction<CreateCommunity>>;
  handleConfirm: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  imageUrl: string;
};

const CommunityModal = ({
  isModalOpen,
  setIsModalOpen,
  formData,
  setFormData,
  handleConfirm,
  handleImageUpload,
  isEditing,
  imageUrl,
}: CommunityModalProps) => {
  if (!isModalOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'cost') {
      setFormData({
        ...formData,
        [name]: value ? parseFloat(value) : 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded shadow-lg w-96 space-y-4 relative">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full p-2"
        >
          X
        </button>

        <div className="flex flex-col items-center relative">
          <Image
            src={imageUrl || 'defaultImageUrl'}
            alt="Community Profile"
            width={600}
             height={600}
            className="w-60 h-60 rounded-full object-cover"
          />
          <label
            htmlFor="upload-image"
            className="absolute bottom-2 right-6 bg-gray-700 text-white p-2 rounded-full cursor-pointer hover:bg-gray-600"
          >
            <FaEdit className="h-5 w-5" />
          </label>
          <input
            type="file"
            id="upload-image"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <h2 className="text-lg font-semibold mt-2">{formData.name || 'Community Name'}</h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name Community:</label>
            <input
              type="text"
              name="name"
              placeholder="Community Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Details Community:</label>
            <textarea
              name="description"
              placeholder="Details Community"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white resize-none"
              maxLength={300}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type of Community:</label>
            <select
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
            >
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
            <label className="block text-sm font-medium mb-1">Cost:</label>
            <input
              type="text"
              name="cost"
              placeholder="Community Cost"
              value={formData.cost}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div className="flex justify-center space-x-3">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleConfirm}
            >
              {isEditing ? 'Update Community' : 'Create Community'}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityModal;
