import DoubleLogin from './DoubleLogin';
import RoundedButton from './RoundedButton';
import RoundButtonN from './RoundButtonN';
import RefreshComponent from './RefreshComponent';

import {
  SourceSansProBoldTextView,
  SourceSansProSemiBoldTextView,
  SourceSansProRegTextView,
  RobotoBoldTextView,
  RobotoMediumTextView,
  RobotoRegTextView,
  BalooThambiBoldTextView,
  BalooThambiMediumTextView,
  BalooThambiRegTextView,
} from './TextComponents';

import ApiError from './Error/ApiError';
import NetworkError from './Error';
import Loader from './Loader';
import AppUpdateDialog from './AppUpdateDialog';
import CustomToast from './CustomToast';
import CustomModal from './CustomModal';
import SimpleLottie from './SimpleLottie';
import BottomSheetHeader from './BottomSheet/BottomSheetHeader';
import BottomSheetDialog from './BottomSheet/BottomSheetDialog';
import BottomSheet from './BottomSheet';
import ProfileTitle from './Profile/Title';
import CustomCheckBox from './CustomCheckBox';
import Carousel from './Carousel';
import Onboarding from './Onboarding';
import SparkyCard from './SparkyCard';
import SubTitleTwo from './SubTitleTwo';
import CustomButton from './CustomButton';
import SmallRoundButton from './SmallRoundButton';
import CustomTextInput from './CustomTextInput';
import InputWithRightIcon from './InputWithRightIcon';
import LoginHeader from './LoginHeader';
import LoginFooterBtn from './LoginFooterBtn';
import TrustedDeviceCallout from './TrustedDeviceCallout';
import SquareView from './SquareView';
import ImageWithIcon from './ImageWithIcon';
import Buddy from './Buddy';
import EarnedRewardPopup from './EarnedRewardPopup';
import SVGImageBackground from './SVGImageBackground';
import ListingScreen from '@hoc/ListingScreen';
import NavMenu from './NavDrawer/NavMenu';
import NavHeader from './NavDrawer/NavHeader';
import MenuItem from './NavDrawer/MenuItem';
import CustomProgress from './CustomProgress';
import NewMessageModal from './NewMessageModal';
import Header from './Header/index';
import RoundedVerticalImageButton from './RoundedVerticalImageButton';
import SuccessPopup from './SuccessPopup';
import AlertPopup from './AlertpopUp';
import Shade from './Shade';
import ShareButton from './ShareButton';
import OTPInput from './OTPInput';
import RenewUserList from './RenewUserList';
import SearchInput from './SearchInput';
import ListItem from './Topics/ListItem';
import TopicStat from './Topics/TopicStat';
import MapNumber from './Topics/MapNumber';
import MapProfile from './Topics/MapProfile';
import MapEdge from './Topics/MapEdge';
import MapItem from './Topics/MapItem';
import InfoPopup from './QnA/InfoPopup';
import CustomDropDown from './CustomDropDown';
import SelectionPopup from './SelectionPopup';
import NormalText from './NormalText';
import MyAutoHeightWebView from './MyAutoHeightWebView';
import ChoiceList from './QnA/Dropdown/ChoiceList';
import GenderItem from './Profile/GenderItem';
import ProfileInputField from './Profile/ProfileInputField';
import TrustedDeviceItem from './TrustedDeviceItem';
import PreferenceSwitch from './PreferenceSwitch';
import MailListItem from './MailBox/MailListItem';
import MailDetailsItem from './MailBox/MailDetailsItem';
import PreviewFilterDropdown from './PreviewFilterDropdown';
/**************************DashBoard Component*******************/
import DashboardFooter from './Dashboard/DashboardFooter';
import DashboardContent from './Dashboard/Content';
import TopicListingContent from './Dashboard/TopicListingContent';
import HowIDidHeader from './HowIDid/Header';
import FilterItem from './HowIDid/Filter';
import QuestionCard from './HowIDid/QuestionCard';
import PaginationView from './HowIDid/PaginationView';
import DetailsScreen from '@hoc/DetailsScreen';
import EffortPopup from './EffortpopUp';
import HomeworkInstruction from './HomeWork/HomeworkInstruction';

import QBodyVO from './QnA/QBodyVO';
import InstructorStimulusVO from './QnA/InstructorStimulusVO';
import QuestionLabel from './QnA/QuestionLabel';
import Timer from './QnA/Timer';
import TimedTestLiveStats from './QnA/TimedTestLiveStats';
import WorksheetTimer from './Worksheet/Timer';
import WordMeaning from './WordMeaning';
import MCQOption from './HowIDid/MCQOption';
import SortListQuestion from './QnA/SortList/SortListQuestion';
import QuestionContainer from './QnA/QuestionContainer';
import {QHtmlTemplate, QHtmlTemplateForIframe} from './QHtmlTemplate';
import ClassificationQuestion from './QnA/Classification/ClassificationQuestion';
import OrderingQuestion from './QnA/Ordering/OrderingQuestion';
import ClassificationBucket from './QnA/Classification/ClassificationBucket';
import MatchListOptions from './QnA/MatchList/MatchListOptions';
import MatchAnswer from './QnA/MatchList/MatchAnswer';
import MatchQuestion from './QnA/MatchList/MatchQuestion';
import QnAHeader from './QnA/Header';
import PedagogyItem from './QnA/PedagogyItem';
import MCQ from './QnA/MCQ';
import HintBox from './QnA/HintBox';
import BLANK from './QnA/BLANK';
import Explanation from './QnA/Explanation';
import CorrectMCQ from './QnA/CorrectAnswer/CorrectMCQ';
import CorrectMultiSelectMCQ from './QnA/CorrectAnswer/CorrectMultiSelectMCQ';
import ClassificationCorrectAnswer from './QnA/CorrectAnswer/ClassificationCorrectAnswer';
import MatchListCorrectAnswer from './QnA/CorrectAnswer/MatchListCorrectAnswer';
import OrderingCorrectAnswer from './QnA/CorrectAnswer/OrderingCorrectAnswer';
import MultiSelectMCQ from './QnA/MultiSelectMCQ';
import SortListCorrectAnswer from './QnA/CorrectAnswer/SortListCorrectAnswer';
import Ordering from './QnA/Ordering';
import Classification from './QnA/Classification';
import MatchList from './QnA/MatchList';
import SortList from './QnA/SortList';
import BlankDropdown from './QnA/BlankDropdown';
import InteractiveN from './QnA/InteractiveN';
import Game from './QnA/Game';
import Dropdown from './QnA/Dropdown';
import TextInteraction from './QnA/TextInteraction';
import PhoneIput from './Profile/PhoneIput';
import HomeSessionUsage from './HomeSessionUsage';
import RewardBadge from './Rewards/RewardBadge';
import RewardSection from './Rewards/RewardSection';
import RewardTitle from './Rewards/RewardTitle';
import RewardCertificate from './Rewards/RewardCertificate';
import NotificationListItem from './NotificationListItem';

import NumberSquareButton from './NumberSquareButton';
import SparkieItem from './screenTest/SparkieItem';

import WorksheetQnAHeader from './Worksheet/Header';
import WorkListingContent from './Worksheet/WorkListingContent';
import Pagination from './Worksheet/Pagination';
import WorksheetListItem from './Worksheet/WorksheetListItem';

import WorksheetTopicHeader from './Worksheet/WorksheetTopicHeader';
import HomeworkListItem from './HomeWork/HomeworkListItem';
import GameListingContent from './Dashboard/GameListingContent';
import PlayButton from './QnA/Game/PlayButton';
import PicturePassword from './PicturePassword';
import PicturePasswordItem from './PicturePassword/Item';
import MessagePopup from './MessagePopup';

//Test
import ScreenTestHeader from './screenTest/ScreenTestHeader';
import Passage from './QnA/Passage';
import QnAVideoModal from './QnA/VideoModal';
import VideoPlayer from './VideoPlayer';
import DiscreteSkillStat from './DiscreteSkill/DiscreteSkillStat';
import ConfirmationDialog from './ConfirmationDialog';
import VerticalTitleValueImage from './screenTest/VerticalTitleValueImage';
import FeedBackModal from './FeedBackModal';
import DatePicker from './Profile/DatePicker';
import TimedTestStats from './QnA/TimedTestStats';
import SoundButton from './SoundButton';
import NeedHelp from './NeedHelp/NeedHelp';
import CircleView from './CircleView';
import ButtonRightImageLeftIcon from './ButtonRightImageLeftIcon';
// import CustomeReportListing from './CustomeReportListing';
import CustomReportListCard from './CustomReportListCard';
import HeartBeatApiCall from './HeartBeatApiCall';
import CommonHeader from './CommonHeader/CommonHeader';
import RewardPopup from './RewardPopup';
import CustomPopup from './CustomPopup';
import SnackBar from './SnackBar';
import Popup from './Popup'

export {
  ButtonRightImageLeftIcon,
  NeedHelp,
  CircleView,
  VerticalTitleValueImage,
  ConfirmationDialog,
  DiscreteSkillStat,
  VideoPlayer,
  QnAVideoModal,
  Passage,
  DoubleLogin,
  RewardTitle,
  RewardSection,
  RenewUserList,
  SelectionPopup,
  GenderItem,
  MyAutoHeightWebView,
  ChoiceList,
  NormalText,
  OTPInput,
  RoundButtonN,
  ProfileInputField,
  SourceSansProBoldTextView,
  SourceSansProSemiBoldTextView,
  SourceSansProRegTextView,
  RobotoBoldTextView,
  RobotoMediumTextView,
  RobotoRegTextView,
  BalooThambiBoldTextView,
  BalooThambiMediumTextView,
  BalooThambiRegTextView,
  RefreshComponent,
  RoundedButton,
  ApiError,
  NetworkError,
  Loader,
  AppUpdateDialog,
  CustomToast,
  CustomModal,
  SimpleLottie,
  BottomSheetHeader,
  BottomSheetDialog,
  BottomSheet,
  CustomCheckBox,
  Carousel,
  Onboarding,
  SparkyCard,
  SubTitleTwo,
  CustomButton,
  SmallRoundButton,
  CustomTextInput,
  InputWithRightIcon,
  LoginHeader,
  LoginFooterBtn,
  TrustedDeviceCallout,
  DashboardFooter,
  DashboardContent,
  ProfileTitle,
  SquareView,
  ImageWithIcon,
  SVGImageBackground,
  Buddy,
  EarnedRewardPopup,
  ListingScreen,
  NavMenu,
  NavHeader,
  CustomProgress,
  MenuItem,
  NewMessageModal,
  Header,
  RoundedVerticalImageButton,
  SuccessPopup,
  Shade,
  ShareButton,
  TopicListingContent,
  SearchInput,
  ListItem,
  TopicStat,
  MapNumber,
  MapProfile,
  MapEdge,
  MapItem,
  InfoPopup,
  CustomDropDown,
  HowIDidHeader,
  FilterItem,
  PaginationView,
  QuestionCard,
  DetailsScreen,
  AlertPopup,
  EffortPopup,
  HomeworkInstruction,
  QBodyVO,
  InstructorStimulusVO,
  QuestionLabel,
  Timer,
  TimedTestLiveStats,
  WorksheetTimer,
  WordMeaning,
  MCQOption,
  SortListQuestion,
  QuestionContainer,
  QHtmlTemplate,
  QHtmlTemplateForIframe,
  ClassificationQuestion,
  OrderingQuestion,
  ClassificationBucket,
  MatchListOptions,
  MatchAnswer,
  MatchQuestion,
  QnAHeader,
  PedagogyItem,
  MCQ,
  HintBox,
  BLANK,
  Explanation,
  CorrectMCQ,
  CorrectMultiSelectMCQ,
  ClassificationCorrectAnswer,
  MatchListCorrectAnswer,
  OrderingCorrectAnswer,
  SortListCorrectAnswer,
  MultiSelectMCQ,
  Ordering,
  MatchList,
  Classification,
  SortList,
  BlankDropdown,
  InteractiveN,
  Game,
  Dropdown,
  TextInteraction,
  RewardBadge,
  TrustedDeviceItem,
  PreferenceSwitch,
  MailListItem,
  MailDetailsItem,
  NotificationListItem,
  NumberSquareButton,
  SparkieItem,
  WorksheetQnAHeader,
  WorkListingContent,
  Pagination,
  WorksheetListItem,
  WorksheetTopicHeader,
  HomeworkListItem,
  PlayButton,
  GameListingContent,
  PicturePassword,
  PicturePasswordItem,
  MessagePopup,
  PreviewFilterDropdown,
  ScreenTestHeader,
  FeedBackModal,
  DatePicker,
  PhoneIput,
  TimedTestStats,
  SoundButton,
  HeartBeatApiCall,
  CustomReportListCard as CustomReportListCard,
  CommonHeader,
  RewardPopup,
  RewardCertificate,
  SnackBar,
  Popup,
  CustomPopup,
  HomeSessionUsage
};
