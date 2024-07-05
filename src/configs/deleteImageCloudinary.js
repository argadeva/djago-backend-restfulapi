require("dotenv").config();
const { extractPublicId } = require("cloudinary-build-url");
const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function deleteImageCloudinary(oldPublicId) {
  const publicId = extractPublicId(oldPublicId);
  try {
    await cloudinary.api.delete_resources(publicId);
    return;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = deleteImageCloudinary;