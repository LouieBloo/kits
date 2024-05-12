import VoiceModelPicker from "@/components/pickers/voice-model-picker";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Panel from "@/components/ui/panel/panel";
import { createTextToSpeechJob, getVoiceModels } from "@/services/api-service";
import { publishEvent } from "@/services/event-service";
import * as React from "react";
import { useEffect } from "react";

export default function TextToSpeechConverter() {

  const [errors, setErrors] = React.useState<string>("")
  const [selectedVoiceModelId, setSelectedVoiceModelId] = React.useState<number>()
  const [inputText, setInputText] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>("")
  const [status, setStatus] = React.useState<string>("")

  useEffect(() => {
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setStatus("");

    if (selectedVoiceModelId !== undefined) {
      await createTextToSpeechJob(selectedVoiceModelId, inputText).then((response) => {
        publishEvent("ttsJobCreated", response.data);
        setStatus("TTS job created successfully");
      }).catch(error=>{
        setError("Error creating tts job: " + error);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setError("Please select a voice model");
      setLoading(false);
    }
  }

  return (
    <div>

      <h2 className="text-xl font-bold mb-2">Text to speech</h2>
      <p className="mb-6">Select a voice and provide text to generate speech</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <VoiceModelPicker selectionCallback={(selectedVoiceModelId: number) => { setSelectedVoiceModelId(selectedVoiceModelId) }}></VoiceModelPicker>
        </div>

        <label htmlFor="inputText" className="font-bold">Input Text</label>
        <textarea disabled={loading} id="inputText" className="text-input-normal" placeholder="Add text here" rows={3} required={true} onChange={e => setInputText(e.target.value)}></textarea>

        <div className="flex justify-end">
          <button type="submit" className="button-normal mt-4" disabled={loading}>Convert</button>
        </div>

      </form>

      {loading && <div className="mt-4"><LoadingSpinner></LoadingSpinner></div>}

      {status && <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">{status}</p>}
      {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</p>}

    </div>
  )
}
