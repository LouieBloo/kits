import Cookies from 'js-cookie';

// usually this is in a config file set by ENV vars
const baseUrl = "https://arpeggi.io/api/kits/v1"


export const getVoiceModels = async () => {
    return await httpRequest('GET', '/voice-models').then((response) => { response = response.json(); return response; });
}

export const createTextToSpeechJob = async (voiceModelId: number, text: string) => {
    const formData  = new FormData();
      
    formData.append("voiceModelId", voiceModelId.toString());
    formData.append("inputTtsText", text);

    return await httpRequest('POST', '/tts', formData, true).then((response) => { response = response.json(); return response; });
}

const httpRequest = async (verb: string, url: string, payload?: any, multipart: boolean = false) => {

    const token = Cookies.get('userToken');

    const headers = multipart ? {} : {
        'Content-Type': 'application/json'
    }

    return await fetch(`${baseUrl}${url}`, {
        method: verb,
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
        },
        body: multipart ? payload : JSON.stringify(payload)
    }).catch((error) => {
        console.error("Http error for " + url + " endpoint:", error);
        //dont swallow the error as our components should handle any messaging
        throw error;
    })
};