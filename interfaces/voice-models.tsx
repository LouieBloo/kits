export interface VoiceModel {
    id?: number;
    title?: string;
    tags?: string[];
    imageUrl?: string;
    demoUrl?: string;
    twitterLink?: string;
    instagramLink?: string;
    tiktokLink?: string;
    spotifyLink?: string;
    youtubeLink?: string;
}

export interface TtsJob {
    id?: number;
    createdAt?: Date;
    type?: string;
    status: string;
    voiceModelId?: number;
    jobStartTime?: Date;
    jobEndTime?: Date;
    outputFileUrl?: string;
    lossyOutputFileUrl?: string;
    recombinedAudioFileUrl?: string | null;
    model?: VoiceModel;
}

export interface ApiResponse{
    data?: any;
    meta?:any;
}