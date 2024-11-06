export const uploadImage = async (data: File): Promise<string|null> => {
  const formData = new FormData();
  formData.append("file", data);
  formData.append("upload_preset", "body_boost");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dnfdovmde/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );
    const result = await response.json();

    if (response.ok) {
      return result.secure_url;
    } 

  } catch (error) {
    console.error(error);
  }
  return null
};
