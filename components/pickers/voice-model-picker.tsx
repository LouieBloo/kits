import Panel from "@/components/ui/panel/panel";
import { VoiceModel } from "@/interfaces/voice-models";
import { getVoiceModels } from "@/services/api-service";
import * as React from "react";
import { useEffect, useState } from "react";
import Select from 'react-select';

export default function VoiceModelPicker({ selectionCallback }) {

    const [voiceModels, setVoiceModels] = useState<VoiceModel[]>([]);
    const [selectedOption, setSelectedOption] = useState<VoiceModel>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getVoiceModels().then((results) => {
            setVoiceModels(results.data.map((voiceModel: VoiceModel) => {
                return { value: voiceModel.id, label: voiceModel.title }
            }))
        }).catch(error => {
            //do we need to show user errors? an error under a picker might be confusing
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const onChange = (option) => {
        setSelectedOption(option)
        if (selectionCallback) {
            selectionCallback(option.value)
        }
    }

    return (
        <div>
            <label htmlFor="voice-model" className="font-bold">Voice Model</label>
            <Select
                name="voice-model"
                value={selectedOption}
                onChange={onChange}
                options={voiceModels}
                placeholder="Choose a voice"
                required={true}
                isLoading={loading}
            />

        </div>
    )
}
