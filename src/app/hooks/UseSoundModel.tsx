
export interface VoiceOverModel {
    clicked: boolean,
    initialised: boolean,
    instance: any
}

export interface UseSoundModel {
    questionVO: VoiceOverModel,
    instStimulusVO: VoiceOverModel,
    questionBodyVO: VoiceOverModel
};

export const UseSoundModels: UseSoundModel = {
    questionVO: {
        clicked: false,
        initialised: false,
        instance: null 
    },

    instStimulusVO: {
        clicked: false,
        initialised: false,
        instance: null
    },

    questionBodyVO: {
        clicked: false,
        initialised: false,
        instance: null
    }
};