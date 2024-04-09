import { useState, useEffect } from 'react';
import Sound from 'react-native-sound';
import { useToast } from 'native-base';
import { useLanguage } from '@hooks';
import { AppState } from 'react-native';
import { UseSoundModels } from './UseSoundModel';
import { Platform } from 'react-native';

export const UseSound = (store = null) => {
    let abortController;
    let abortSignal;
    let soundInstance;

    const [audioObj, setAudioObj] = useState(UseSoundModels);
    const [showInsStVO, setShowInsStVO] = useState(false);
    const [showQuesVO, setshowQuesVO] = useState(false);
    const [qBodyVoiceOver, setQBodyVoiceover] = useState(false);
    const [autoPlayVO, setAutoPlayVO] = useState(null);
    const [appState, setAppState] = useState(AppState.currentState);

    const handleAppStateChange = state => { setAppState(state); };

    const Toast = useToast();

    const { invalidAudioFileText, audioInitialisingText, anotherAudioPlayingText } = useLanguage();

    const playSound = (audioType, audioUrl = null, localfileName, isFileContent) => {
        if (!isOtherAudioPlaying(audioType)) {
            if (audioObj[audioType] && audioObj[audioType].instance) {
                if (audioObj[audioType].instance.isPlaying()) {
                    audioObj[audioType].instance.pause();
                } else {
                    audioObj[audioType].instance.play(success => { 
                        if (!success) console.log('error in local sound playing audio'); 
                    });
                }
            } else {
                let toastMsg = audioInitialisingText;
                if (audioObj[audioType] && audioObj[audioType]?.invalidFile == true) {
                    toastMsg = invalidAudioFileText;
                }
                if (!localfileName) {
                    if (!Toast.isActive(17)) {
                        Toast.show({ id: 17, description: toastMsg, duration: 2000 });
                    }
                }

                if (!audioObj[audioType]) {
                    if (audioUrl) {
                        createAudioInstance(audioType, audioUrl, true);
                    }
                }
                if (localfileName) {
                    // Commented for old Sound Packages 
                    playLocalSound(localfileName, isFileContent);

                }
            }
        } else {
            if (!Toast.isActive(18)) {
                Toast.show({ id: 18, description: anotherAudioPlayingText, duration: 2000 });
            }
        }
    };

    useEffect(() => {
        abortController = new AbortController();
        abortSignal = abortController.signal;
        const myListener = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            abortController.abort();
            audioCleanup();
            myListener.remove();
        };
    }, []);

    useEffect(() => {
        if (appState == 'background') {
            pauseAudio();
        }
    }, [appState]);

    //To play autoplay:true videos
    useEffect(() => {
        if (Platform.OS === 'ios') {
            Sound.setCategory('Playback');
        }
        // return () => {};
    }, [autoPlayVO, store?.qnaStore?.isViewQuestionBtnVisible]);

    const initialiseAudio = (soundUrl, signal) => {
        //Commented for old Sound Packages 
        return new Promise((resolve, reject) => {
            let soundTrack = new Sound(soundUrl, null, error => {
                if (error) {
                    console.log("Sound initalization error 1 ");
                    return reject({ status: false, errorCode: 1, error: error, message: 'Failed to load the Audio File' });
                }
                return resolve({ status: true, soundTrack });
            });
            if (signal && signal.aborted) {
                console.log("Sound initalization error 2 ");
                return reject({ status: false, errorCode: 2, message: 'aborted' });
            }
        }).catch(err=> console.log("initialiseAudio error = ",err))
    };

    const getQuestionVoiceUrl = (str = '') => {
        let audioData = str.substring(str.lastIndexOf('<audio>'), str.lastIndexOf('</audio>'));
        let regex = /<audio.*?src='(.*?)'/;
        if (audioData != '') {
            let src = regex.exec(audioData)[1];
            if (src.length >= 1) return src;
        }

        return '';
    };

    const initializeAudioSection = async data => {
        try {
            let alreadyAdded = false;
            let alreadyInstAutoPlayed = false;
            let instructorStimulus = data.hasOwnProperty('instructorStimulus') && data.instructorStimulus;
            if (instructorStimulus && instructorStimulus?.hasOwnProperty('voiceover') && instructorStimulus?.voiceover.length > 0) {
                setShowInsStVO(true);
                await createAudioInstance('instStimulusVO', instructorStimulus?.voiceover);
                if (instructorStimulus?.hasOwnProperty('voiceoverAutoPlay') && instructorStimulus?.voiceoverAutoPlay) {
                    setAutoPlayVO('instStimulusVO');
                    alreadyInstAutoPlayed = true;
                }
            } else if (data.hasOwnProperty('quesVoiceover') && data.quesVoiceover.length > 0) {
                let extension = data.quesVoiceover.split('.').pop();
                if (extension == 'mp3') {
                    setshowQuesVO(true);
                    alreadyAdded = true;
                    await createAudioInstance('quesVo', data.quesVoiceover);
                    if (data.hasOwnProperty('quesVoiceoverAutoPlay') && data.quesVoiceoverAutoPlay) {
                        setAutoPlayVO('quesVo');
                    }
                }
            } else {
                setshowQuesVO(false);
                setShowInsStVO(false);
            }
            /*
               check either questionBody have Question audio url or not 
               if audio is available than we extract from there 
               and set showQuesVO as a true and initialized it...
            **/
            let QuestionBody = data.hasOwnProperty('questionBody');
            const QuestionBodyData = data.questionBody;
            if (QuestionBody && alreadyAdded == false && QuestionBodyData.includes('.mp3')) {
                const getQuesVoUrl = getQuestionVoiceUrl(data.questionBody);
                if (getQuesVoUrl.length > 0) {
                    setshowQuesVO(true);
                    await createAudioInstance('quesVo', getQuesVoUrl);
                    if (instructorStimulus && instructorStimulus?.hasOwnProperty('voiceoverAutoPlay') && instructorStimulus.voiceoverAutoPlay && !alreadyInstAutoPlayed) {
                        setAutoPlayVO('quesVo');
                    }

                }
            }

            if (data.hasOwnProperty('display') && data.display.hasOwnProperty('hideQuesInSeconds') && data.display.hideQuesInSeconds != null) {
                setTimeout(() => { setshowQuesVO(false); }, parseInt(data.display.hideQuesInSeconds) * 1000);
            }

            if (data?.questionBodyVoiceover) {
                setQBodyVoiceover(true);
                createAudioInstance('quesBodyVO', data?.questionBodyVoiceover);
            }
        } catch (err) {
            console.log('initializeAudioSection = ', err)
        }
    };

    const createAudioInstance = async (type, audioFile, autoPlay = false) => {
        try {
            let result = await initialiseAudio(audioFile, abortSignal);
            console.log("Audio initalization result ", result);
            if (result.status) {
                soundInstance = result.soundTrack;
                let audioObjModified = {};
                audioObjModified[type] = {
                    initialised: true,
                    instance: soundInstance,
                };
                setAudioObj(prevState => {
                    let newState = {
                        ...prevState,
                        [type]: {
                            initialised: true,
                            instance: soundInstance,
                        },
                    };
                    return newState;
                });
                autoPlay && setAutoPlayVO(type);
            } else {
                console.log("createAudioInstance error = ", result.error);
                if (!Toast.isActive(15)) {
                    Toast.show({ id: 15, description: result.message, duration: 2000 });
                }
            }
        } catch (err) {
            let errorMsg = `Audio File Path: ${audioFile} && ERROR: ${err}`;
            if (err.errorCode != 2) {
                if (!Toast.isActive(16)) {
                    Toast.show({ id: 16, description: errorMsg, duration: 2000 });
                }
            }
            setAudioObj(prevState => {
                let newState = { ...prevState, [type]: { initialised: false, instance: null, invalidFile: true } };
                return newState;
            });
        }
    };

    const isOtherAudioPlaying = audioType => {
        for (const VO in audioObj) {
            if (VO != audioType && audioObj[VO].instance && audioObj[VO].instance.isPlaying()) {
                return true;
            }
        }
        return false;
    };


    const audioCleanup = (reset = true) => {
        return new Promise((resolve, reject) => {
            for (const VO in audioObj) {
                if (audioObj[VO].instance) {
                    if (audioObj[VO].instance.isPlaying()) {
                        audioObj[VO].instance.stop();
                    }
                    audioObj[VO].instance.release();
                }
            }

            if (reset) {
                setAudioObj(UseSoundModels);
                setQBodyVoiceover(false);
                setShowInsStVO(false);
                setshowQuesVO(false);
            }
            resolve(true);
        }).catch(err => console.log('audio cleanup err = > ', err));
    };

    const pauseAudio = () => {
        for (const VO in audioObj) {
            if (audioObj[VO].instance && audioObj[VO].instance.isPlaying()) {
                audioObj[VO].instance.pause();
            }
        }
    };

    const stopAudio = () => {
        setAutoPlayVO(null);
        audioCleanup(false);
    };

    const playLocalSound = (localfileName, isFileContent) => {
        // Commented for old Sound Packages
        if (isFileContent) {
            let mySound = new Sound(localfileName, error => {
                if (error) {
                    console.log('Error loading sound: ' + error);
                } else {
                    soundRes(mySound);
                }
            });
        } else {
            let mySound = new Sound(localfileName, Sound.MAIN_BUNDLE, error => {
                if (error) {
                    console.log('Error loading sound: ' + error);
                } else {
                    soundRes(mySound);
                }
            });
        }
    }

    const soundRes = (mySound) => {
        mySound.play(success => { 
            if (!success) console.log('error in local sound playing audio'); 
        });
    }

    return {
        initialiseAudio, playSound, stopAudio, audioObj, setAudioObj, showInsStVO, showQuesVO, qBodyVoiceOver, initializeAudioSection, audioCleanup, isOtherAudioPlaying, pauseAudio,
    };
};