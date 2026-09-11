import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'eynbrzze',
  api_key: process.env.CLOUDINARY_API_KEY || '327868584553656',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'JHhBo-9XH-rgcoMW7UgHBoF9h1E',
  secure: true,
});

export default cloudinary;

export interface UploadResult {
  url: string;
  public_id: string;
  format: string;
  bytes: number;
}

export async function uploadToCloudinary(
  fileBuffer: Buffer | string,
  folder = 'source-by-zahid'
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    if (typeof fileBuffer === 'string' && fileBuffer.startsWith('http')) {
      // Direct remote URL upload
      cloudinary.uploader.upload(
        fileBuffer,
        { folder, resource_type: 'auto' },
        (error, result) => {
          if (error || !result) return reject(error || new Error('Upload failed'));
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            bytes: result.bytes,
          });
        }
      );
    } else if (typeof fileBuffer === 'string' && fileBuffer.startsWith('data:')) {
      // Base64 string upload
      cloudinary.uploader.upload(
        fileBuffer,
        { folder, resource_type: 'auto' },
        (error, result) => {
          if (error || !result) return reject(error || new Error('Upload failed'));
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            bytes: result.bytes,
          });
        }
      );
    } else {
      // Buffer stream upload
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'auto' },
        (error, result) => {
          if (error || !result) return reject(error || new Error('Upload failed'));
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            bytes: result.bytes,
          });
        }
      );
      uploadStream.end(fileBuffer as Buffer);
    }
  });
}
