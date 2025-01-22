import * as dotenv from "dotenv";
// Load the environment-specific variables
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });
console.log('which environment: ', env);

interface IJWT {
    secret: string;
    issuer: string;
    expires: number;
    subject: string;
    algorithm: string;
}
interface IDATABASE {
   url: string
   urlSample: string
}

interface PRODATABASE {
    database: string
}

interface Cloudinary {
    cloud_name: string;
    cloud_api_key: string;
    cloud_api_secret: string;
}

interface Redis {
    redis_host: string;
    redis_password: string;
    redis_port: string;
    redis_user: string;
}

interface Nodemailer {
    nodemailer_user: string,
    nodemailer_password: string
}

interface IConfig {
    serverPort: string
    saltFactor: number
    JWT: IJWT
    Database: IDATABASE
    Production: PRODATABASE
    cloudinary_setup: Cloudinary;
    redis_setup: Redis;
    nodemailer: Nodemailer;
    verification_link: string;
    login_link: string;
}


const Configuration: IConfig = {
    serverPort: process.env.PORT as string,
    saltFactor: Number(process.env.SALT_FACTOR),
    verification_link: process.env.VERIFICATION_LINK as string,
    login_link: process.env.LOGIN_LINK as string,
    JWT: {
        secret: process.env.JWT_SECRET as string,
        issuer: process.env.JWT_ISSUER as string,
        subject: process.env.JWT_SUBJECT as string,
        algorithm: process.env.JWT_ALGORITHM as string,
        expires: Number(process.env.JWT_EXPIRES)
    },
    Database: {
        url: process.env.MONGO_URL as string,
        urlSample: process.env.MONGO_URL_SAMPLE as string,
    },
    Production: {
        database: process.env.PRODUCTION_DATABASE as string,
    },
    cloudinary_setup: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
        cloud_api_key: process.env.CLOUDINARY_API_KEY as string,
        cloud_api_secret: process.env.CLOUDINARY_API_SECRET as string,
    },
    redis_setup: {
        redis_host: process.env.REDIS_HOST as string,
        redis_password: process.env.REDIS_PASSWORD as string,
        redis_port: process.env.REDIS_PORT as string,
        redis_user: process.env.REDIS_USER as string
    },
    nodemailer: {
        nodemailer_user: process.env.NODEMAILER_USER as string,
        nodemailer_password: process.env.NODEMAILER_PASSWORD as string
    }
}

export default Configuration;
