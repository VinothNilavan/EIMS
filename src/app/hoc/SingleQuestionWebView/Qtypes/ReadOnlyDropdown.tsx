import React, { useRef } from "react";
import { Dropdown } from '@components';

const ReadOnlyDropdown = (props) => {
  const { QuestionData, result } = props;
  const webref = useRef(null);
  return (
    <Dropdown
      webref={webref}
      questionRes={QuestionData.questionBody}
      responses={QuestionData.response}
      userAttemptResponse={result?.userAttemptData?.userResponse}
      showHint={false}
      userResponses={result?.userAttemptData?.userResponse}
      disableWebView={true}
      isReport={true}
    />
  );
};
export default ReadOnlyDropdown