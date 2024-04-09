import React from 'react';
import {
    SadBuddy, NeverGiveup_1, NeverGiveup_2, NeverGiveup_3, Try_again_2,
    Try_again_1, Try_again_3, You_can_do_it_1, You_can_do_it_2, You_can_do_it_3
} from '@images';

const kHeight = 80;
const kWidth = 52;
const neverGiveupSvgArray = [
    <SadBuddy width={kWidth} height={kHeight} />,
    <NeverGiveup_1 width={kWidth} height={kHeight} />,
    <NeverGiveup_2 width={kWidth} height={kHeight} />,
    <NeverGiveup_3 width={kWidth} height={kHeight} />,
    <NeverGiveup_2 width={kWidth} height={kHeight} />,
    <NeverGiveup_3 width={kWidth} height={kHeight} />,
    <NeverGiveup_2 width={kWidth} height={kHeight} />,
    <NeverGiveup_3 width={kWidth} height={kHeight} />
];

const tryAgainSvgArray = [
    <SadBuddy width={kWidth} height={kHeight} />,
    <Try_again_1 width={kWidth} height={kHeight} />,
    <Try_again_2 width={kWidth} height={kHeight} />,
    <Try_again_3 width={kWidth} height={kHeight} />,
    <Try_again_2 width={kWidth} height={kHeight} />,
    <Try_again_3 width={kWidth} height={kHeight} />,
    <Try_again_2 width={kWidth} height={kHeight} />,
    <Try_again_3 width={kWidth} height={kHeight} />
];

const youCanDoItSvgArray = [
    <SadBuddy width={kWidth} height={kHeight} />,
    <You_can_do_it_1 width={kWidth} height={kHeight} />,
    <You_can_do_it_2 width={kWidth} height={kHeight} />,
    <You_can_do_it_3 width={kWidth} height={kHeight} />,
    <You_can_do_it_2 width={kWidth} height={kHeight} />,
    <You_can_do_it_3 width={kWidth} height={kHeight} />,
    <You_can_do_it_2 width={kWidth} height={kHeight} />,
    <You_can_do_it_3 width={kWidth} height={kHeight} />
];

const MotivationBuddy = () => {
    let ranNum = Math.floor(Math.random() * 3) + 1;
    switch (ranNum) {
        case 1: return neverGiveupSvgArray;
        case 2: return tryAgainSvgArray;
        case 3: return youCanDoItSvgArray;
    }
}

export default MotivationBuddy;