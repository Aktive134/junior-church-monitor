import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.config';
// import admin from '../firebase.config';
import errors from '../common/error-handler';

const { BadRequestError } = errors;

interface UploadResponse {
    public_id: string;
    url: string;
    [key: string]: any;
}

export async function uploadImage (imageBuffer: Buffer, folder?: string): Promise<UploadResponse> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folder || 'default_folder',
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve({
                    public_id: result?.public_id as string,
                    url: result?.secure_url as string,
                    ...result,
                });
            }
        );

        // Convert Buffer to Readable Stream
        const readableStream = new Readable();
        readableStream._read = () => {}; // _read is a no-op
        readableStream.push(imageBuffer);
        readableStream.push(null);

        readableStream.pipe(stream);
    });
};

export function generateRandomString(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*%$#@&*)(!';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }
    
    return result;
}

// export const sendOtp = async (phoneNumber: string): Promise<string> => {
//     if (!phoneNumber) {
//       throw new Error('Phone number is required');
//     }
  
//     // Generate a custom session cookie for OTP purposes
//     const session = await admin.auth().createSessionCookie(phoneNumber, {
//       expiresIn: 10 * 60 * 1000, // 10 minutes
//     });
  
//     return session;
// };

// export const verifyOtp = async (otp: string, phoneNumber: string): Promise<void> => {
//     if (!otp || !phoneNumber) {
//       throw new BadRequestError('OTP and phone number are required');
//     }
  
//     const decodedToken = await admin.auth().verifyIdToken(otp);
  
//     if (decodedToken.phone_number !== phoneNumber) {
//       throw new BadRequestError('Invalid OTP for this phone number');
//     }
// };