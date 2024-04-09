import PicturePasswordSvgs from './picturePassword';

export { PicturePasswordSvgs };

export enum QTypes {
    Blank = 'blank',
    Matchlist = 'matchlist',
    Dropdown = 'dropdown',
    Classification = 'classification',
    Interactive = 'interactive',
    Ordering = 'ordering',
    MCQ = 'mcq',
    SortList = 'sortlist',
    MMcq = 'multi_select_mcq',
    TextInteraction = 'textinteraction',
    BlankDD = 'blank_dropdown',
    Game = 'game',
    Remedial = 'remedial',
}

export enum FilterModes {
    all = 'all',
    wrong = 'wrong',
    right = 'right'
}

export enum ReportScreen {
    Worksheet = 'WorksheetReport',
    Homework = 'HomeWorkReport',
    DiscreteSkill = 'DiscreteSkillReport',
    Topic = 'TopicReport',
    StarredScreen = 'StarredScreen',
}