import { useReducer, useCallback } from 'react';


const toggleInitialState = {
    earned: { isVisible: false },
    onGoing: { isVisible: false },
    upComing: { isVisible: false }
}

const toggleInitialCertificateState = {
    champ: { isVisible: false },
    star: { isVisible: false }
}

const toggleSectionReducer = (state, action) => {
    const { type, sectionType } = action;
    switch (type) {
        case 'TOGGLE_SECTION': {
            return {
                ...state, [sectionType]: { ...state[sectionType], isVisible: !state[sectionType].isVisible }
            }
        }
        default: return state;
    }
}
const useToggleSection = () => {
    const [toggleState, toggleStateDispatch] = useReducer(toggleSectionReducer, toggleInitialState);

    const toggleSection = useCallback((sectionType = "") => {
        toggleStateDispatch({ type: 'TOGGLE_SECTION', sectionType });
    }, []);
    return { toggleState, toggleSection }
}

const useToggleCertificateSection = () => {
    const [toggleState, toggleStateDispatch] = useReducer(toggleSectionReducer, toggleInitialCertificateState);

    const toggleSection = useCallback((sectionType = "") => {
        toggleStateDispatch({ type: 'TOGGLE_SECTION', sectionType });
    }, []);
    return { toggleState, toggleSection }
}

export {useToggleSection, useToggleCertificateSection};