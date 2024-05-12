import { ApiResponse } from '@/interfaces/voice-models';
import Cookies from 'js-cookie';

// usually this is in a config file set by ENV vars
const baseUrl = "https://arpeggi.io/api/kits/v1"


export const getVoiceModels = async (): Promise<ApiResponse> => {
    return await httpRequest('GET', '/voice-models').then((response) => { response = response.json(); return response; });
}

export const getTtsJobs = async (): Promise<ApiResponse> => {
    return await httpRequest('GET', '/tts', {perPage: 5}).then((response) => { response = response.json(); return response; });
}

export const createTextToSpeechJob = async (voiceModelId: number, text: string) => {
    const formData  = new FormData();
      
    formData.append("voiceModelId", voiceModelId.toString());
    formData.append("inputTtsText", text);

    return await httpRequest('POST', '/tts', formData, true).then((response) => { response = response.json(); return response; });
}

const httpRequest = async (verb: string, url: string, payload?: any, multipart: boolean = false): Promise<any> => {

    const token = Cookies.get('userToken');

    const headers = multipart ? {} : {
        'Content-Type': 'application/json'
    };

    let fullUrl = `${baseUrl}${url}`;

    // Serialize payload into query parameters if it's a GET request
    if (verb === 'GET' && payload) {
        const queryParams = new URLSearchParams(payload).toString();
        fullUrl += '?' + queryParams;
    }

    return await fetch(fullUrl, {
        method: verb,
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
        } as HeadersInit, // Explicitly define the type of headers
        body: verb !== 'GET' ? (multipart ? payload : JSON.stringify(payload)) : undefined
    }).catch((error) => {
        console.error("Http error for " + url + " endpoint:", error);
        // Don't swallow the error as our components should handle any messaging
        throw error;
    });
};