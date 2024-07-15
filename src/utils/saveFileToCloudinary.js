import cloudinary from 'cloudinary';
import checkEnvFor from './env.js';
import { CLOUDINARY } from '../contacts/index.js';

cloudinary.v2.config({
    secure: true,
    cloud_name: checkEnvFor(CLOUDINARY.CLOUD_NAME),
    api_key: checkEnvFor(CLOUDINARY.API_KEY),
    api_secret: checkEnvFor(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
    const resp = await cloudinary.v2.uploader.upload(file.path);
    return resp.secure_url;
};
