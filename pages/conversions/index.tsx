import * as React from "react";
import TextToSpeechConverter from '../../components/conversions/text-to-speech-converter/text-to-speech-converter';
import ConversionOutputs from "@/components/conversions/conversion-outputs/conversion-outputs";
import Panel from "@/components/ui/panel/panel";

export default function ConversionPage() {
  return (
    <div className="container">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Kits AI Text-to-speech
      </h1>

      <h2 className="text-center text-2xl mt-5 mb-5">Play with unique AI voice models, languages, and pitch without the need for voice actors, microphones, or recordings</h2>

      <div className="flex">
        <div className="flex-1 m-2">
          <Panel>
            <TextToSpeechConverter />
          </Panel>
        </div>

        <div className="flex-1 m-2">
          <Panel>
            <ConversionOutputs />
          </Panel>
        </div>
      </div>

    </div>
  )
}
