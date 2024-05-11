import VoiceModelPicker from "@/components/pickers/voice-model-picker";
import Panel from "@/components/ui/panel/panel";
import { createTextToSpeechJob, getVoiceModels } from "@/services/api-service";
import * as React from "react";
import { useEffect } from "react";

export default function TextToSpeechConverter() {

  const [errors, setErrors] = React.useState<string>("")
  const [selectedVoiceModelId, setSelectedVoiceModelId] = React.useState<number>()
  const [inputText, setInputText] = React.useState<string>("")

  useEffect(() => {
  }, [])

  const handleSubmit = async(event) => {
    event.preventDefault();

    await createTextToSpeechJob(selectedVoiceModelId, inputText).then((response) => {
      debugger
    })
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
        <textarea id="inputText" className="text-input-normal" placeholder="Add text here" rows={3} required={true} onChange={e => setInputText(e.target.value)}></textarea>

        <button type="submit" className="button-normal mt-4">Convert</button>
      </form>


    </div>
  )
}
