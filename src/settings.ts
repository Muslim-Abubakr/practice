import { config } from "dotenv";
config()

export const SETTINGS = {
    PORT: process.env.PORT || 1234,
    PATH: {
        VIDEOS: '/videos'
    }
}