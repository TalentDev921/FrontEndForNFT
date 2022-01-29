import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Home from './pages/home1';
import Explore from './pages/explore';
import RankingRedux from './pages/RankingRedux';
import Auction from './pages/Auction';
import Helpcenter from './pages/helpcenter';
import Colection from './pages/colection';
import ItemDetailRedux from './pages/ItemDetailRedux';
import Author from './pages/Author';
import Wallet from './pages/wallet';
import Login from './pages/login';
import Register from './pages/register';
import Price from './pages/price';
import Works from './pages/works';
import News from './pages/news';
import NewsSingle from './pages/newsSingle';
import Create2 from './pages/create2';
import Create3 from './pages/create3';
import Createoption from './pages/createOptions';
import Activity from './pages/activity';
import Contact from './pages/contact';
import ElegantIcons from './pages/elegantIcons';
import EtlineIcons from './pages/etlineIcons';
import FontAwesomeIcons from './pages/fontAwesomeIcons';
import Accordion from './pages/accordion';
import Alerts from './pages/alerts';
import Progressbar from './pages/progressbar';
import Tabs from './pages/tabs';
import Minter from './pages/Minter';
import Mintergrey from './pages/MinterGrey';

import { createGlobalStyle } from 'styled-components';
import MyProfile from './pages/MyProfile';
import EditProfile from './pages/EditProfile';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0,0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

const app= () => (
  <div className="wraper">
  <GlobalStyles />
    <Header/>
      <PosedRouter>
      <ScrollTop path="/">
        <Home exact path="/">
          <Redirect to="/home" />
        </Home>
        <Explore path="/explore" />
        <RankingRedux path="/rangking" />
        <Auction path="/Auction" />
        <Helpcenter path="/helpcenter" />
        <Colection path="/colection/:collectionId" />
        <ItemDetailRedux path="/ItemDetail/:nftId" />
        <Author path="/Author/:authorId" />
        <Wallet path="/wallet" />
        <Login path="/login" />
        <Register path="/register" />
        <Price path="/price" />
        <Works path="/works" />
        <News path="/news" />
        <NewsSingle path="/news/:postId" />
        <Create2 path="/create2" />
        <Create3 path="/create3" />
        <Createoption path="/createOptions" />
        <Activity path="/activity" />
        <Contact path="/contact" />
        <ElegantIcons path="/elegantIcons" />
        <EtlineIcons path="/etlineIcons" />
        <FontAwesomeIcons path="/fontAwesomeIcons" />
        <Accordion path="/accordion" />
        <Alerts path="/alerts" />
        <Progressbar path="/progressbar" />
        <Tabs path="/tabs" />
        <Minter path="/mint" />
        <Mintergrey path="/minter" />
  		<MyProfile path="/my_profile"/>
        <EditProfile path="/edit_profile"/>
        </ScrollTop>
      </PosedRouter>
    <ScrollToTopBtn />
    <NotificationContainer/>
  </div>
);
export default app;