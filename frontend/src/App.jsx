import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { EventDetails } from './pages/EventDetails';
import { EventApp } from './pages/EventApp';
import { Component } from 'react';
import { Header } from './cmps/Header';
import { EventEdit } from './cmps/EventEdit';
import { UserProfile } from './pages/UserProfile';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { LoginSignup } from './cmps/LoginSignup.jsx';
import { EventCreate } from './pages/EventCreate';
import { Footer } from './cmps/Footer';
import { MyEvents } from './pages/MyEvents';
import { socketService } from './services/socketService';
import { connect } from 'react-redux';
socketService.setup();

class _App extends Component {
  render() {
    return (
      <Router>
        <section className="app">
          <header>
            <Header loggedInUser={this.props.loggedInUser} />
            {/* <SideBar></SideBar> */}
          </header>
          <main className="main-page">
            <Switch>
              <Route component={EventEdit} path="/edit/:event" />
              <Route component={UserProfile} path="/profile/:userId" />
              <Route component={EventDetails} path="/event/:eventId" />
              {/* <Route component={EventDetailsNew} path="/event" /> */}
              <Route component={MyEvents} path="/myevents" />
              <Route component={EventCreate} path="/create/:eventId?" />
              {/* <Route component={EventCreate} path="/create/:eventId" /> */}
              <Route component={About} path="/About" />
              <Route component={EventApp} path="/event" />
              <Route component={LoginSignup} path="/login" />
              <Route component={Home} path="/" />
            </Switch>
          </main>

          <Footer />
        </section>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return { loggedInUser: state.userModule.loggedInUser };
}

export const mapDispatchToProps = {};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
