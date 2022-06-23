import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import SideMenuAfterLogin from '../components/SideMenu';
import Splash from '../pages/SplashScreen';
import Landing from '../pages/Landing';
import SignUp from '../pages/Auth/SignUp';
import SignUpNext from '../pages/Auth/SignUpStep2';
import SignIn from '../pages/Auth/SignIn';
import ForgotPassword  from '../pages/Auth/ForgotPassword';
import ChangePassword  from '../pages/Auth/ChangePassword';
import Home from '../pages/Home/index';
import SearchPage from '../pages/SearchResult/index';
import Profile from '../pages/ClientSide/Profile/index';
import Dashboard from '../pages/ClientSide/Dashboard/index';
import ServiceList from '../pages/ServiceList/index';
import ServiceDetails from '../pages/ServiceDetails/index';
import PostJob from '../pages/ClientSide/JobPosting/index';
import PostStep1 from '../pages/ClientSide/JobPosting/Step1';
import PostStep2 from '../pages/ClientSide/JobPosting/Step2';
import PostStep3 from '../pages/ClientSide/JobPosting/Step3';
import PostStep4 from '../pages/ClientSide/JobPosting/Step4';
import PostStep5 from '../pages/ClientSide/JobPosting/Step5';
import PostStep6 from '../pages/ClientSide/JobPosting/Step6';
import PostStep7 from '../pages/ClientSide/JobPosting/Step7';
import ApplicationSubmited from '../pages/ClientSide/JobPosting/jobsuccess';
import Filter from '../pages/Filter/index';
import JobList from '../pages/jobs/index';
import Jobs from '../pages/jobs/jobDetails';
import Freelancers from '../pages/Freelancers/index';
import ProjectList from '../pages/Projects/index';
import ProjectDetails from '../pages/Projects/Details';
import ProjectDetails2 from '../pages/Projects/Details2'
import chatList from '../pages/Message/chatList';
import chat from '../pages/Message/chat';
import NotificationList from '../pages/Notifications/index';
import NotificationDetails from '../pages/Notifications/Details';
import ProfileSetUp from '../pages/ProfileSteps/index';
import ProfileStep  from '../pages/ProfileSteps/SetupProfile/Step1';
import ProfileStep2  from '../pages/ProfileSteps/SetupProfile/Step2';
import ProfileStep3  from '../pages/ProfileSteps/SetupProfile/Step3';
import ProfileStep4  from '../pages/ProfileSteps/SetupProfile/Step4';
import ProfileStep5  from '../pages/ProfileSteps/SetupProfile/Step5';
import FreelancerProfileDetails from '../pages/Freelancers/FreelancerProfileDetails';
import PublicView from '../pages/ServiceProfile/PublicView';
import FreelancerAvilability from '../pages/ServiceProfile/Avilability';
import Myfeed from '../pages/Feed/index';
import ManageRequests from '../pages/ManageRequest/index';
import Testimonials from '../pages/Testimonials/index';
import Reviews from '../pages/Reviews/index';
import ReviewsList from '../pages/Reviews/ReviewsList';
import Settings from '../pages/Settings/index';
import Payments from '../pages/Payment/index';
import PaymentPage from '../pages/Payment/PayForm';
import Contactus from '../pages/Support/Contactus';
import Support from '../pages/Support/index';
import ServiceSummary from '../pages/ServiceSummary/index';
import Checkout from '../pages/ServiceSummary/Checkout';
import Help from '../pages/Support/Help';
import ProjectOverview from '../pages/ProjectCreation/ProjectOverview';
import ProjectPricing from '../pages/ProjectCreation/ProjectPricing';
import Projectgallery from '../pages/ProjectCreation/projectGallery';
import ProjectDiscription from '../pages/ProjectCreation/ProjectDescription';
import ProjectRequirments from '../pages/ProjectCreation/ProjectRequirment';
import ReviewProject from '../pages/ProjectCreation/finalize';
import Transaction from '../pages/Transection/index';
import TransactionDetails from '../pages/Transection/Details';
import AddMilestone from '../pages/Milestone/Addmilestone';
import Milestone from '../pages/Milestone/Milestone';
import MilestoneList from '../pages/Projects/MilestoneList'
import BlogList from '../pages/Blogs/index';
import BlogDetails from '../pages/Blogs/BlogDetails';
import AboutUs from '../pages/CmsPages/AboutUs';
import Identity from '../pages/identityVerification/index';
import AddTestimonial from '../pages/Testimonials/AddTestimonial';
import FAQ from '../pages/FAQ/index';
import ProposalList from '../pages/Proposals/list';
import ProposalsDetails from '../pages/Proposals/Details';
import FavouriteFreelancers from '../pages/Favourite/FavouriteFreelancer';
import OtpInput from '../pages/Auth/Otpinput';
import ForgotPasswordAfterOtp from '../pages/Auth/ForgotPasswordAfterOtp';
import FilterCategoryList from '../pages/ServiceList/FilterCategoryList';
import FreelancerProfile from '../pages/ServiceProfile/index';
import ApplyJobs from '../pages/jobs/applyJobs';
import SplashScreen from '../pages/SplashScreen';
import BankDetails from '../pages/jobs/bankDetails';
import BestMatch from '../pages/Feed/BestMatch';
import ChangePasswordAfterLogin from '../pages/Auth/ChangePasswordAfterLogin';
import FlutterWavePayment from '../components/FlutterWavePayment/index';
import MyFeedDetails from '../pages/Feed/MyFeedDetails';
import Calendar from '../pages/Calendar/Calendar';
import FreelancerVirtuallyBook from '../pages/Freelancers/FreelancerVirtuallyBook';
import AddMoney from '../pages/jobs/addMoney';


const AuthNavigator = createStackNavigator(
  {
    //Splash: {screen: Splash},
    SignUp: {screen: SignUp},
    SignUpNext: {screen: SignUpNext},
    SignIn: {screen: SignIn},
    ForgotPassword: {screen: ForgotPassword},
    ChangePassword: {screen: ChangePassword},
    OtpInput: {screen: OtpInput},
    ForgotPasswordAfterOtp: {screen:ForgotPasswordAfterOtp}
  },
  {
    initialRouteName: 'SignUp',
    defaultNavigationOptions: {
      headerShown: false,
      headerMode: 'none',
    },
  },
);

const SplashNavigator = createStackNavigator(
  {
    SplashScreen: {screen: SplashScreen},
    Landing: {screen: Landing}
  },
  {
    initialRouteName: 'SplashScreen',
    defaultNavigationOptions: {
      headerShown: false,
      headerMode: 'none',
    },
  },
);

const MainNavigator = createStackNavigator(
  {
    Landing: {screen: Landing}
  },
  {
    initialRouteName: 'Landing',
    defaultNavigationOptions: {
      headerShown: false,
      headerMode: 'none',
    },
  },
);

const AfterLoginNavigator = createStackNavigator(
  {
    FavouriteFreelancers: {screen: FavouriteFreelancers},
    FAQ: {screen: FAQ},
    AddTestimonial: {screen: AddTestimonial},
    ProposalsDetails: {screen: ProposalsDetails},
    ProposalList: {screen: ProposalList},
    Identity: {screen: Identity},
    AboutUs: {screen: AboutUs},
    BlogDetails: {screen: BlogDetails},
    BlogList: {screen: BlogList},
    Milestone: {screen: Milestone},
    AddMilestone: {screen: AddMilestone},
    TransactionDetails: {screen: TransactionDetails},
    Transaction: {screen: Transaction},
    ReviewProject: {screen: ReviewProject},
    ProjectRequirments: {screen: ProjectRequirments},
    ProjectDiscription: {screen: ProjectDiscription},
    ProjectOverview: {screen: ProjectOverview},
    Projectgallery: {screen: Projectgallery},
    ProjectPricing: {screen: ProjectPricing},
    Myfeed: {screen: Myfeed}, 
    MyFeedDetails: {screen: MyFeedDetails}, 
    FreelancerAvilability: {screen: FreelancerAvilability},
    ApplicationSubmited: {screen: ApplicationSubmited},
    Checkout: {screen: Checkout},
    ServiceSummary: {screen: ServiceSummary},
    Support: {screen: Support},
    Contactus: {screen: Contactus},
    ServiceDetails: {screen: ServiceDetails},
    Help: {screen: Help},  
    PaymentPage: {screen: PaymentPage},  
    Payments: {screen: Payments},  
    Settings: {screen: Settings},  
    Reviews: {screen: Reviews},  
    ReviewsList: {screen: ReviewsList},
    Testimonials: {screen: Testimonials},      
    ManageRequests: {screen: ManageRequests},    
    PublicView: {screen: PublicView},
    FreelancerProfileDetails: {screen: FreelancerProfileDetails},     
    ProfileStep5: {screen: ProfileStep5},
    ProfileStep4: {screen: ProfileStep4},
    ProfileStep3: {screen: ProfileStep3},
    ProfileStep2: {screen: ProfileStep2},
    ProfileStep: {screen: ProfileStep},
    ProfileSetUp: {screen: ProfileSetUp}, 
    NotificationDetails: {screen: NotificationDetails},
    NotificationList: {screen: NotificationList},
    Home: {screen: Home},
    Dashboard: {screen: Dashboard},
    NotificationDetails: {screen: NotificationDetails},
    NotificationList: {screen: NotificationList},
    Profile: {screen: Profile},
    FreelancerProfile: {screen: FreelancerProfile},
    ServiceDetails: {screen: ServiceDetails},
    ServiceList: {screen: ServiceList},
    PostJob: {screen: PostJob},
    PostStep1: {screen: PostStep1},
    PostStep2: {screen: PostStep2},
    PostStep3: {screen: PostStep3},
    PostStep4: {screen: PostStep4},
    PostStep5: {screen: PostStep5},
    PostStep6: {screen: PostStep6},
    PostStep7: {screen: PostStep7},
    Filter: {screen: Filter},
    JobList: {screen: JobList},
    Jobs: {screen: Jobs},
    Freelancers: {screen: Freelancers},
    ProjectList: {screen: ProjectList},
    MilestoneList : {screen : MilestoneList},
    ProjectDetails2: {screen: ProjectDetails2},
    ProjectDetails: {screen: ProjectDetails},
    chatList: {screen: chatList},
    chat: {screen: chat},
    FilterCategoryList : {screen : FilterCategoryList},
    BestMatch :{screen: BestMatch},
    ApplyJobs :{screen: ApplyJobs},
    BankDetails:{screen: BankDetails},
    AddMoney:{screen: AddMoney},
    ChangePasswordAfterLogin :{screen: ChangePasswordAfterLogin},
    FlutterWavePayment:{screen: FlutterWavePayment},
    Calendar:{screen : Calendar},
    FreelancerVirtuallyBook:{screen : FreelancerVirtuallyBook}
    
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerShown: false,
      headerMode: 'none',
    },
  },
);

const DrawerStackAfterLogin = createDrawerNavigator(
  {
    AfterLoginNavigator: AfterLoginNavigator,
  },
  {
    contentComponent: props => <SideMenuAfterLogin {...props} />,
  },
);

const AppContainer = createSwitchNavigator(
  {
    SplashNavigator: SplashNavigator,
    Auth: AuthNavigator,
    MainNavigator: MainNavigator,
    Drawer: DrawerStackAfterLogin,
  },
  {
    initialRouteName: 'SplashNavigator',
  },
);

export default createAppContainer(AppContainer);
