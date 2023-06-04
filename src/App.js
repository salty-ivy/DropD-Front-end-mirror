import './App.css';
import theme from "./context/themecontext/Themecontext"
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Splash from './pages/splash/splash';
import Login from './pages/login/login';
import Home from './pages/signup/signup';
import UserDetails from './pages/userdetails/userDetails';
import EditUserDetails from './pages/edituserdetails/edituserdetails.jsx';
import CreateProfile from './pages/create/createProfile';
import Timeline from './pages/timeline/timeline';
import Profilepage from './pages/profilepage/profilepage';
import Socialpage from './pages/socialpage/socialpage';
import Viewmatch from './pages/viewmatch/viewmatch';
import Clubs from './pages/clubs/clubs';
import CreateClub from './pages/createclub/createclub';
import Notifications from './pages/notifications/notifications'
import ConnectWallet from './pages/connectwallet/connectwallet'
import CreateWallet from './pages/connectwallet/Create'
import WalletApprovals from './pages/connectwallet/Approvals'
import WalletTransactions from './pages/connectwallet/WalletTransactions'
import Createpost from './pages/createpost/createpost';
import CreatePage from './pages/pages/parentPage/pagesParentPage';
import Pages from './pages/pages/pages';
import Friends from './pages/friends/friends';
import Menupage from './pages/menupage/Menupage';
import Flics from './pages/flics/flics';
import MyWallet from './pages/mywallet/mywallet'
import i18n from './i18n/i18n';
import Clubpage from './pages/clubpage/clubpage';
import CircularIndeterminate from './components/Loader/loader';
import Comments from './pages/comments/comments';
import SkeletonLoader from './components/SkeletonLoader/skeletonLoader';
import { I18nextProvider } from 'react-i18next';
import ConnectWalletPage from './pages/flics/components/connectwallet';
import FloatingToolbar from './components/FloatingToolbar';
import Chatlist from './pages/chat/chatlist/chatlist';
import Chat from './pages/chat/chat';
function App() {
  return (
    <Router>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Switch>
            {/* <Route exact pathpartner_kundli_attributes="/" component={Splash} /> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create" component={CreateProfile} />
            <Route exact path="/userdetails" component={UserDetails} />
            <Route exact path="/userdetails/:page" component={UserDetails} />
            <Route exact path="/edituserdetails" component={EditUserDetails} />
            <Route exact path="/timeline" component={Timeline} />
            <Route exact path="/comments/:pid" component={Comments} />
            <Route exact path="/createpost" component={Createpost} />
            <Route exact path="/profile/:did" component={Profilepage} />
            <Route exact path="/profile" component={Profilepage} />
            <Route exact path="/page/:pageId" component={Socialpage} />
            <Route exact path="/page/:pageId/createpost" component={Createpost} />
            <Route exact path="/viewmatch" component={Viewmatch} />
            <Route exact path="/skeleton" component={SkeletonLoader} />
            <Route exact path="/clublist" component={Clubs} />
            <Route exact path="/club/:cid" component={Clubpage} />
            <Route exact path="/club/:cid/createpost" component={Createpost} />
            <Route exact path="/createclub" component={CreateClub} />
            <Route exact path="/createpage" component={CreatePage} />
            <Route exact path="/pagelist" component={Pages} />
            <Route exact path="/notifications" component={Notifications} /> 
            <Route exact path="/subscription" component={ConnectWallet} />
            {/* <Route exact path="/connectwallet" component={ConnectWalletPage} /> */}
            <Route exact path="/connectwallet" component={ConnectWallet} />
            <Route exact path="/wallet" component={MyWallet} />
            <Route exact path="/wallet/transactions" component={WalletTransactions} />
            <Route exact path="/wallet/create" component={CreateWallet} />
            <Route exact path="/wallet/approvals" component={WalletApprovals} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/menu" component={Menupage} />
            <Route exact path="/flics" component={Flics} />
            <Route exact path="/mywallet" component={MyWallet} />
            <Route exact path="/chatlist" component={Chatlist} />
            <Route exact path="/chat" component={Chat} />
          </Switch>
          <div style={{ position: 'fixed', transform:"translate(-50%,-50%)",left:"50%",top:'50%',zIndex:"9999" }}>
            <CircularIndeterminate />
          </div>
          {/* <FloatingToolbar/> */}
        </ThemeProvider>
      </I18nextProvider>
    </Router>
  );
}

export default App;
