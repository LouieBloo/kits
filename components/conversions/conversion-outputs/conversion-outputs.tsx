import { TtsJob } from "@/interfaces/voice-models";
import { getTtsJobs } from "@/services/api-service";
import { get } from "http";
import * as React from "react";
import { useEffect, useState } from "react";
import TtsJobResult from "../tts-job-result/tts-job-result";
import { subscribeToEvent } from "@/services/event-service";
import { IoMdRefresh } from "react-icons/io";
import LoadingSpinner from "@/components/ui/loading-spinner";


export default function ConversionOutputs() {

  const [jobs, setJobs] = useState<TtsJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  //initial load grab our jobs
  useEffect(() => {
    getJobs();
    subscribeToEvent("ttsJobCreated", getJobs);
  }, []);

  const getJobs = async () => {
    // setJobs(gettest().data);
    // setLoading(false);

    setLoading(true);
    setError("");

    await getTtsJobs().then((response) => {
      if (response && response.data) {
        setJobs(response.data);
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


const gettest = () => {
  return {
    "data": [
      {
        "id": 28483670,
        "createdAt": "2024-05-12T00:06:30.462+00:00",
        "type": "tts",
        "status": "success",
        "voiceModelId": 822496,
        "jobStartTime": "2024-05-12T00:06:51.554+00:00",
        "jobEndTime": "2024-05-12T00:07:09.712+00:00",
        "outputFileUrl": "https://arpeggi-prod-private.s3.us-west-2.amazonaws.com/rvc/output_audio/YZoxR21jbaYossJqUHnC1.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=1f4b4d07771b4ee42afd0fde3a8c9f0b86240e0ae241d434b03750392e6f74e4&X-Amz-SignedHeaders=host&x-id=GetObject",
        "lossyOutputFileUrl": "https://arpeggi-prod-private.s3.us-west-2.amazonaws.com/rvc/output_audio/YZoxR21jbaYossJqUHnC1.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=131803da93e0c58f4d088404df7cd5c981dc064bd96df477f68c05bb1165300c&X-Amz-SignedHeaders=host&x-id=GetObject",
        "recombinedAudioFileUrl": null,
        "model": {
          "id": 822496,
          "title": "Bright Pop",
          "tags": [
            "Pop",
            "Electronic",
            "Singing",
            "English",
            "Male"
          ],
          "twitterLink": null,
          "instagramLink": null,
          "tiktokLink": null,
          "spotifyLink": null,
          "youtubeLink": null,
          "imageUrl": "https://arpeggi-prod-public.s3.us-west-2.amazonaws.com/rvc/user_uploaded_images/clopzt1905vxl01mt0nca7fhf.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=5fb60fd720ae5b19915ef6037f0b0be7cbe4fa4c125d6edd2662adc338ae1092&X-Amz-SignedHeaders=host&x-id=GetObject",
          "demoUrl": "https://arpeggi-prod-public.s3.us-west-2.amazonaws.com/voice-models/demos/Bright_Pop_Demo.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=764f9ddbcd0ef4b0c7852f1f8d1d3fe66924549599e7bfaacea075c350cab03a&X-Amz-SignedHeaders=host&x-id=GetObject"
        }
      },
      {
        "id": 28483508,
        "createdAt": "2024-05-12T00:00:53.157+00:00",
        "type": "tts",
        "status": "running",
        "voiceModelId": 221129,
        "jobStartTime": "2024-05-12T00:00:54.050+00:00",
        "jobEndTime": null,
        "outputFileUrl": null,
        "lossyOutputFileUrl": "https://arpeggi-prod-private.s3.us-west-2.amazonaws.com/rvc/output_audio/UXVI2tdv0M7vRwDGVYs8b.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=cb995f6497b8fc087cc2adede25d86c48dbbb4cfa65ad83f1e84320808953413&X-Amz-SignedHeaders=host&x-id=GetObject",
        "recombinedAudioFileUrl": null,
        "model": {
          "id": 221129,
          "title": "Overdriven Guitar",
          "tags": [],
          "twitterLink": null,
          "instagramLink": null,
          "tiktokLink": null,
          "spotifyLink": null,
          "youtubeLink": null,
          "imageUrl": "https://arpeggi-prod-public.s3.us-west-2.amazonaws.com/rvc/user_uploaded_images/cllgunasjqzc601mlditz0rsi.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=50d16fa05b6f16d3e0dba62d12140aac1b0e836f8d5784d89d602755054b78d5&X-Amz-SignedHeaders=host&x-id=GetObject",
          "demoUrl": null
        }
      },
      {
        "id": 28448653,
        "createdAt": "2024-05-10T23:51:25.133+00:00",
        "type": "tts",
        "status": "success",
        "voiceModelId": 1049157,
        "jobStartTime": "2024-05-10T23:51:26.027+00:00",
        "jobEndTime": "2024-05-10T23:51:42.069+00:00",
        "outputFileUrl": "https://arpeggi-prod-private.s3.us-west-2.amazonaws.com/rvc/output_audio/zuI0vOUTplYwyRzMvvSx7.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=3ccb372f0df9bf1e0523059394f09072ff27fb3b71043b952d05d487e721a44e&X-Amz-SignedHeaders=host&x-id=GetObject",
        "lossyOutputFileUrl": "https://arpeggi-prod-private.s3.us-west-2.amazonaws.com/rvc/output_audio/zuI0vOUTplYwyRzMvvSx7.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=84e91c1f8beda839a5e42da8b4ab70c065dfd1ab794fb1bc5c48dd28a7b8b663&X-Amz-SignedHeaders=host&x-id=GetObject",
        "recombinedAudioFileUrl": null,
        "model": {
          "id": 1049157,
          "title": "Female RnB",
          "tags": [
            "Singing",
            "English",
            "R&B",
            "Pop",
            "Jazz",
            "Female"
          ],
          "twitterLink": null,
          "instagramLink": null,
          "tiktokLink": null,
          "spotifyLink": null,
          "youtubeLink": null,
          "imageUrl": "https://arpeggi-prod-public.s3.us-west-2.amazonaws.com/rvc/user_uploaded_images/clr8bjma21k8i01lc9ki163pn.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=2da7666a84d34c83818bb385ad226c5de67378ba7d7a4841bd5b922f6d346f98&X-Amz-SignedHeaders=host&x-id=GetObject",
          "demoUrl": "https://arpeggi-prod-public.s3.us-west-2.amazonaws.com/voice-models/demos/Female_Rnb_Demo.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=4b007262ba2d9bf9e58085edb059e945643efe9568456f9ced2e0d0550c75504&X-Amz-SignedHeaders=host&x-id=GetObject"
        }
      },
      {
        "id": 28406194,
        "createdAt": "2024-05-09T20:19:36.049+00:00",
        "type": "tts",
        "status": "success",
        "voiceModelId": 1119706,
        "jobStartTime": "2024-05-09T20:19:37.141+00:00",
        "jobEndTime": "2024-05-09T20:19:39.581+00:00",
        "outputFileUrl": "https://arpeggi-prod-private.s3.us-west-2.amazonaws.com/rvc/output_audio/4HWJRDqNgtBtheXMCDbfl.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=7dad3ca9b3f3db313f5ff4e4e7bf0941bb8953935d073ad0cf590b519e6b2f32&X-Amz-SignedHeaders=host&x-id=GetObject",
        "lossyOutputFileUrl": "https://arpeggi-prod-private.s3.us-west-2.amazonaws.com/rvc/output_audio/4HWJRDqNgtBtheXMCDbfl.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=fcc6e52acd0f426b5e51e50adbca210e5ec8290b9a350033b959e2ac77d70635&X-Amz-SignedHeaders=host&x-id=GetObject",
        "recombinedAudioFileUrl": null,
        "model": {
          "id": 1119706,
          "title": "90s Pop Punk",
          "tags": [
            "Pop",
            "Rock",
            "Singing",
            "English",
            "Male"
          ],
          "twitterLink": null,
          "instagramLink": null,
          "tiktokLink": null,
          "spotifyLink": null,
          "youtubeLink": null,
          "imageUrl": "https://arpeggi-prod-public.s3.us-west-2.amazonaws.com/voice-models/images/clt94t6m41fa501mm4nz12iqc.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=2f70aada63d6dcd78fc415c744a11da72b511df87fff1b706eed47fe41328ebd&X-Amz-SignedHeaders=host&x-id=GetObject",
          "demoUrl": null
        }
      },
      {
        "id": 28406108,
        "createdAt": "2024-05-09T20:17:11.864+00:00",
        "type": "tts",
        "status": "success",
        "voiceModelId": 1049157,
        "jobStartTime": "2024-05-09T20:17:13.056+00:00",
        "jobEndTime": "2024-05-09T20:17:15.934+00:00",
        "outputFileUrl": "https://arpeggi-prod-private.s3.us-west-2.amazonaws.com/rvc/output_audio/fVhUS4mca8rw2kpgqMIcl.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=020fac0ba9d04a3abe68dd87cb1a2f31db128ffab02b133d4a6f196818eef4bb&X-Amz-SignedHeaders=host&x-id=GetObject",
        "lossyOutputFileUrl": "https://arpeggi-prod-private.s3.us-west-2.amazonaws.com/rvc/output_audio/fVhUS4mca8rw2kpgqMIcl.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=d279570e970d8444db82f14fdcc20dbe44586fff27d0371abd397f3fba53bcbc&X-Amz-SignedHeaders=host&x-id=GetObject",
        "recombinedAudioFileUrl": null,
        "model": {
          "id": 1049157,
          "title": "Female RnB",
          "tags": [
            "Singing",
            "English",
            "R&B",
            "Pop",
            "Jazz",
            "Female"
          ],
          "twitterLink": null,
          "instagramLink": null,
          "tiktokLink": null,
          "spotifyLink": null,
          "youtubeLink": null,
          "imageUrl": "https://arpeggi-prod-public.s3.us-west-2.amazonaws.com/rvc/user_uploaded_images/clr8bjma21k8i01lc9ki163pn.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=2da7666a84d34c83818bb385ad226c5de67378ba7d7a4841bd5b922f6d346f98&X-Amz-SignedHeaders=host&x-id=GetObject",
          "demoUrl": "https://arpeggi-prod-public.s3.us-west-2.amazonaws.com/voice-models/demos/Female_Rnb_Demo.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXSSI5BUEYLH6XOKV%2F20240512%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240512T000900Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDuzIDblQexJCUzGhBuXUYVtzG2g9RqcnuYL38To%2FfjYAiEA2b7f5Uj6boqjd0L%2BuJy7ELeyBXy38vqTh1ltUfeaGAYq8wMIUBACGgw1MjA5MTc2ODM0NjUiDKsdvjvb%2FF2q8t3DGCrQAzNvlywbw9Rxr8m%2F8G3Jf4zlGrCXWg%2Bexhz0ZVXPU0vwzQIIOpNVLTEMldJDjx6Tx7uB0MI5VRr7HhQmtLncbTuK6xU%2F4lcp7o50MWoVNT1Mo%2FIVQyOAPyOdEsDTmActLa2uyQx66ucnvLowkYtddAwInwNbK3WZfLzQ1enZ2RH8oiporjfsjLYCBLCxHcxbt394gLd78vWTLEjaSjppd0XvvD95wYJE5zrjzAqGiItz9ROHzZVtor%2Bdc307mPcuJXkRyaZ%2FxBJEy%2BoQQu0NMakQajap3ftVq4moYrDziHUgompHaseZlH3RvcEWpgk1e4v3syjf1lwtmj50%2FAN2LaXBhhYEFrqG9qa1ouCWu8i7%2BWQ%2FailKDs14%2FTUSv4e%2BGUWiglvu4b4Bgha%2Bd5fGBnw7jjuXPscciJ6P%2BXIzqyOlVMfwuwJcUqcnZC%2F5PTbVtnbfhy1ze8u7iN5jVt4s9alsFxPm%2Fjb6WYXi65yIVOdyxeQwYNBiRFuMMpsiEbp7Gdlp2KhdJoPOvcxKKvIa1pPurfvmpzh5qRx7wTa96vG9er4Rz4Xpg%2BUy7lCv08%2BYc32V%2F5hREolTgL7D7xeRlpYkK72Z%2BHHkdOjqFSsNSzxXMNH2%2F7EGOqUBKW6LYaFMcbn6j0FAaJyU%2Fuod8jPmBIZE%2Bnl%2FQ8aN1iS2SkH78fDrpKk33EQBTbOJY6tdwvz0nsRJFoJSnWKGQFBRbljqjjhXaJGw9Vb8QUxK5prZCV4lCEW8BvFsqx%2FlJH0ZRrMJNYmhF3jTp%2FMKPRS3vrD5SdLyQm37b7XHASR3S5tcybByt4mSFENjT4WzIi0349%2FKuHgnz048pfAnU2cnsmPV&X-Amz-Signature=4b007262ba2d9bf9e58085edb059e945643efe9568456f9ced2e0d0550c75504&X-Amz-SignedHeaders=host&x-id=GetObject"
        }
      }
    ],
    "meta": {
      "total": 228,
      "perPage": 5,
      "currentPage": 1,
      "lastPage": 46,
      "firstPage": 1,
      "firstPageUrl": "/?page=1",
      "lastPageUrl": "/?page=46",
      "nextPageUrl": "/?page=2",
      "previousPageUrl": null
    }
  }
}