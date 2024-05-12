import { ApiResponse, TtsJob } from "@/interfaces/voice-models";
import { getTtsJobs } from "@/services/api-service";
import { get } from "http";
import * as React from "react";
import { useEffect, useState } from "react";
import TtsJobResult from "../tts-job-result/tts-job-result";
import { subscribeToEvent } from "@/services/event-service";
import { IoMdRefresh } from "react-icons/io";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useTimer } from "react-timer-hook";


export default function ConversionOutputs() {

  const [jobs, setJobs] = useState<TtsJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // timer to auto refresh if we have any jobs that are converting
  const { seconds, start, pause, restart } = useTimer({ expiryTimestamp: new Date(), onExpire: () => getJobs(), autoStart: false });

  //initial load grab our jobs
  useEffect(() => {
    getJobs();
    subscribeToEvent("ttsJobCreated", getJobs);
  }, []);

  const getJobs = async () => {
    setLoading(true);
    setError("");

    await getTtsJobs().then((response: ApiResponse) => {
      if (response && response.data) {
        setJobs(response.data);
        //if we have a running job, refresh in 30s to auto update our list
        if (response.data.filter(job => job.status === "running").length > 0) {
          let time = new Date();
          time.setSeconds(time.getSeconds() + 20);
          restart(time, true)
        }
      }
    }).catch(error => {
      setError("Failed to load jobs: " + error);
    }).finally(() => {
      setLoading(false)
    });

  }

  return (
    <div className="">
      <div className="flex">
        <h2 className="text-xl font-bold mb-2">Outputs</h2>
      </div>

      <p className="mb-3">This section will show you your last 5 conversions</p>

      {seconds > 0 && <p className="mb-2 text-cyan-400">Auto refresh in {seconds} seconds</p>}

      <hr className="hr-negative"></hr>

      {loading && <div className="mt-4"><LoadingSpinner></LoadingSpinner></div>}

      {!loading && jobs.length === 0 && <p className="mt-4">No jobs found</p>}

      {!loading && jobs.length > 0 && jobs.map((job, index) => {
        return (
          <div key={job.id}>
            <div className="my-5">
              <TtsJobResult ttsJob={job} />
            </div>


            {index != jobs.length - 1 && (
              <hr className="hr-negative"></hr>
            )}
          </div>)
      })}

      {/* Ideally we would have a dedicated error component */}
      {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</p>}
    </div>
  )
}