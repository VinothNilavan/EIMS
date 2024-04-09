import React, { useState, useImperativeHandle, useEffect } from 'react';
import { View } from 'react-native';
import style from './indexCss';
import { Base64 } from 'js-base64';
import { getQuestionItemHtmlTemplate } from '@hoc';
import { QTypes } from '../../../helpers';
import { MyAutoHeightWebView } from '@components';


const Ordering = React.forwardRef(
	({ questionTree, dragAndDropCallback, onSoundBtnClicked, isWorkSheetOrHomeWork, questions }, ref) => {

		const [orderingQuestions, setOrderingQuestions] = useState([]);
		const [hasUserChanged, setUserChanged] = useState(false);
		const [questionBody, setQuestionBody] = useState()

		useEffect(() => {
			let htmlTemplate = '';
			if (isWorkSheetOrHomeWork && questions?.contentParams?.userAttemptData.hasOwnProperty('userResponse')) {
				let userAttemptData = questions?.contentParams?.userAttemptData?.userResponse?.Ordering;
				let userMarkedListData = getMarkedList(userAttemptData);
				let options = userMarkedListData?.data.map((item, index) => {
					item.index = item.id;
					if (!item.optionLabel) {
						item.optionLabel = `${String.fromCharCode('A'.charCodeAt(0) + item.index)}`;
					}
					return item;
				});
				setOrderingQuestions(options);
				htmlTemplate = getQuestionItemHtmlTemplate(QTypes.Ordering, questionTree, 0, false, userMarkedListData);
			} else {
				let options = questionTree?.response?.choices.map((item, index) => {
					item.index = index;
					item.optionLabel = `${String.fromCharCode('A'.charCodeAt(0) + item.index)}`;
					item.id = index;
					item.identifier = parseInt(Base64.decode(`${item.identifier}`))
					return item;
				});
				setOrderingQuestions(options);
				htmlTemplate = getQuestionItemHtmlTemplate(QTypes.Ordering, questionTree, 0, false);
			}
			setQuestionBody(htmlTemplate);
		}, [questionTree])

		const getMarkedList = (userAttemptData) => {
			let attemptedData = { data: [] }
			if (userAttemptData?.userAnswer.length > 0) {
				userAttemptData.userAnswer.forEach((item) => {
					let currentChoices = questions?.contentParams?.userAttemptData?.userResponse?.Ordering?.choices;
					let id = currentChoices.findIndex(choice => choice.identifier == item);
					attemptedData.data.push(currentChoices[id]);
				});
			}
			return attemptedData;
		}

		const getFilterdChoices = (userInputData = {}) => {
			let originalChoices = [];
			let choices = [];
			if (isWorkSheetOrHomeWork) {
				if (questions?.contentParams?.userAttemptData?.userResponse?.Ordering?.hasOwnProperty('originalChoices')) {
					originalChoices = questions?.contentParams?.userResponse?.Ordering?.originalChoices;
				} else {
                    originalChoices = questionTree?.response?.choices?.map(item => ({ ...item, identifier: parseInt(Base64.decode(`${item.identifier}`)) }));	
				}
				if (userInputData.length > 0) {
					choices = orderingQuestions.map(item => ({ ...item, identifier: item.identifier}));
				}
			}
			return { originalChoices, choices }
		}

		useImperativeHandle(ref, () => ({
			evaluteAnswer() {
				try {
					// if (hasUserChanged) {
						const userInputData = orderingQuestions.map(item => { return item.identifier; });

						let payload = {};
						let isValidResponse = isValidUserResponse(orderingQuestions);
						payload.isDynamic = questionTree?.isDynamic;
						payload.contentID = questionTree?.contentID;
						payload.score = isValidResponse ? questionTree?.responseValidation?.validResponse?.score : 0;
						payload.result = isValidResponse ? Base64.encode('pass') : Base64.encode('fail');
						payload.userResponse = {};
						payload.userResponse.Ordering = {};
						payload.userResponse.Ordering.type = questionTree?.template;
						payload.userResponse.Ordering.userAnswer = userInputData;
						let { choices, originalChoices } = getFilterdChoices(userInputData);
						payload.userResponse.Ordering.originalChoices = originalChoices;
						payload.userResponse.Ordering.choices = choices;
						payload.userAttemptData = {
							userResponse: payload.userResponse,
							trials: [{
									userResponse: payload.userResponse,
									result: isValidResponse ? Base64.encode('true') : Base64.encode('false'),
									score: isValidResponse ? questionTree?.responseValidation?.validResponse?.score : 0
								}],
						};
						let contentInfo = {};
						contentInfo.contentID = questionTree?.contentID;
						contentInfo.contentVersionID = questionTree?._id;
						contentInfo.contentType = questionTree?.contentType;
						contentInfo.questionType = questionTree?.template;
						contentInfo.revisionNum = questionTree?.revisionNo;
						contentInfo.langCode = questionTree?.langCode;
						payload.contentInfo = contentInfo;
						payload.remainingTime = 0;
						payload.nextContentSeqNum = null;
						return payload;
					// }
				} catch (err) {
					console.log("Ordering evaluateAnswer = ", err);
				}
			},
			reset() {
				setUserChanged(false);
			},
		}));

		const isValidUserResponse = (userSelectedOption) => {
			let aIdentifier = [];
			const { scoringType, validResponse } = questionTree.responseValidation;
			const { identifier } = validResponse;
			if (scoringType === 'exact') {
				userSelectedOption.map(singleOrderingQuestion => {
					aIdentifier.push(singleOrderingQuestion.identifier);
				});
			}
			return (JSON.stringify(aIdentifier) === JSON.stringify(identifier));
		}

		const webViewMessageHandler = event => {
			try {
				let webViewData = JSON.parse(event.nativeEvent.data);
				if (webViewData.hasOwnProperty('from') && webViewData.hasOwnProperty('to') && webViewData.from != webViewData.to) {
					let updatedData = orderingQuestions;
					let fromItem = updatedData.find(item => item?.index == parseInt(webViewData.from));
					let toItem = updatedData.find(item => item?.index == parseInt(webViewData.to));
					let fromIndex = updatedData.findIndex(item => item?.index == parseInt(webViewData.from));
					let toIndex = updatedData.findIndex(item => item?.index == parseInt(webViewData.to));
					updatedData[fromIndex] = toItem;
					updatedData[toIndex] = fromItem;
					dragAndDropCallback(false);
					setUserChanged(true);
					setOrderingQuestions(updatedData);
				}
			} catch (err) {
				console.log("Ordering type webviewMessage Handler err = ", err);
			}
		}

		return (
			<View style={{ ...style.dragTypeQuestionView }}>
				{questionBody && <MyAutoHeightWebView
					onMessage={webViewMessageHandler}
					style={style.webViewContainer}
					onSizeUpdated={size => {
						console.log("webview  height = ", size.height);
					}}
					source={{ html: questionBody }}
					zoomable={false}
					bounces={false}
				/>}
			</View>
		);
	}
);

export default Ordering;
