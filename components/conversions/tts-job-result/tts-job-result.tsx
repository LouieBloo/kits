import { getTtsJobs } from "@/services/api-service";
import { get } from "http";
import * as React from "react";
import { useEffect } from "react";
import { cn } from '@/lib/utils';
import { TtsJob } from "@/interfaces/tts-jobs";
import { dateHowLongAgoParser, statusParser } from "@/services/parsing-service";
import AudioPlayer from "@/components/audio/audio-player";
import { publishEvent } from "@/services/event-service";
import { IoMdRefresh } from "react-icons/io";



interface TtsJobResultProps {
    ttsJob: TtsJob;
}

const TtsJobResult: React.FC<TtsJobResultProps> = ({ ttsJob }) => {

    const refresh = () => {
        publishEvent('ttsJobCreated', null);
    }

    return (
        <div>
            <div className="flex items-center ml-2 mb-2">
                <div><StatusCircle status={ttsJob.status} /></div>
                <div className="ml-2"><span className="capitalize">{statusParser(ttsJob.status)}</span></div>
                <span className="mx-1">•</span>
                <div><span className="">{dateHowLongAgoParser(ttsJob.jobEndTime || ttsJob.createdAt)}</span></div>
                <span className="mx-1">•</span>
                <div><span className="underline text-black">{ttsJob?.model?.title}</span></div>

            </div>

            {ttsJob.outputFileUrl && (
                <div>
                    <AudioPlayer url={ttsJob.outputFileUrl} />
                </div>
            )}

            {ttsJob.status == 'running' && (
                <div className="flex items-center ml-1">
                    <IoMdRefresh className="text-cyan-400"/>
                    <button type="button" className="ml-1 text-cyan-400" onClick={refresh}>Refresh</button>
                    
                </div>
            )}

        </div>

    )
}

// I could move this to a separate file if we want to reuse it, ok here for now.
const StatusCircle = ({ status }: { status: string }) => {
    const circleClass = cn(
        'h-2 w-2 rounded-full',
        {
            'bg-yellow-500': status === 'running',
            'bg-cyan-400': status === 'success',
            'bg-red-600': status === 'error',
            'bg-rose-200': status === 'cancelled'
        }
    );

    return (
        <div className={circleClass}></div>
    );
}



export default TtsJobResult;