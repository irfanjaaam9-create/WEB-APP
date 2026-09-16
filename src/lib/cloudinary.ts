import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  public_id: string;
}

/**
 * Upload a file buffer to Cloudinary.
 * @param buffer - The file data as a Buffer or base64 string
 * @param folder - Target Cloudinary folder (e.g. 'products', 'cases')
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string = 'zoytech'
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Cloudinary upload failed'));
          return;
        }
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Delete an asset from Cloudinary by its public_id.
 * Called whenever a product/case image is removed in the admin.
 */
export async function deleteFromCloudinary(public_id: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    console.error(`[Cloudinary] Failed to delete ${public_id}:`, err);
    // Don't throw — deletion failure should not block DB operation
  }
}

export default cloudinary;
