import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Input, TextField, Select } from '@material-ui/core';

import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup,
} from '../store/actions/userActions.js';

class _LoginSignup extends Component {
  state = {
    msg: '',
    loginCred: {
      username: '',
      password: '',
    },
    signupCred: {
      username: '',
      password: '',
      fullname: '',
    },
    isNewUser: false,
  };

  componentDidMount() {
    this.props.loadUsers();
  }

  setNewUser = () => {
    this.setState({ isNewUser: !this.state.isNewUser });
  };

  loginHandleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value,
      },
    }));
  };

  signupHandleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value,
      },
    }));
  };

  doLogin = async (ev) => {
    ev.preventDefault();
    const { username, password } = this.state.loginCred;
    if (!username) {
      return this.setState({ msg: 'Please enter user/password' });
    }
    const userCreds = { username, password };
    try {
      this.props.login(userCreds);
      this.setState({ loginCred: { username: '', password: '' } });
    } catch (err) {
      this.setState({ msg: 'Login failed, try again.' });
    }
  };

  onLogout = () => {
    this.props.logout();
    // this.props.history.push(`/`);
  };

  doSignup = async (ev) => {
    ev.preventDefault();
    const { username, password, fullname } = this.state.signupCred;
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'All inputs are required' });
    }
    const signupCreds = { username, password, fullname };
    this.props.signup(signupCreds);
    this.setState({ signupCred: { username: '', password: '', fullname: '' } });
  };

  removeUser = (userId) => {
    this.props.removeUser(userId);
  };
  render() {
    console.log(this.props.loggedInUser);
    let signupSection = (
      <form className="frm" onSubmit={this.doSignup}>
        <h2>
          Sign<span className="blue-point">U</span>p
          <span className="blue-point">.</span>
        </h2>
        <TextField
          variant="standard"
          type="text"
          name="fullname"
          value={this.state.signupCred.fullname}
          onChange={this.signupHandleChange}
          placeholder="Full name"
          autoComplete="fullname"
        />
        <br />
        <TextField
          variant="standard"
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
          autoComplete="current-password"
        />
        <br />
        <TextField
          variant="standard"
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
          autoComplete="username"
        />
        <button className="login-btn">Signup</button>
        <button
          className="alredy-member"
          type="button"
          onClick={this.setNewUser}
        >
          Already a member?
        </button>
      </form>
    );
    let loginSection = (
      <form className="frm" onSubmit={this.doLogin}>
        <h2>
          L<span className="blue-point">o</span>gin
          <span className="blue-point">.</span>
        </h2>
        <Select
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
        >
          <option value="">Select User</option>
          {this.props.users &&
            this.props.users.map((user) => (
              <option key={user._id} value={user.username}>
                {user.fullname}
              </option>
            ))}
        </Select>

        {/* <input
          type="text"
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
          placeholder="Username"
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <br /> */}
        <button className="login-btn">Login</button>
        <button className="new-user" onClick={this.setNewUser}>
          New User?
        </button>
      </form>
    );

    let { loggedInUser } = this.props;
    if (loggedInUser._id === 'u100') loggedInUser = null;
    return (
      <div className="login-signup-container">
        <div className="login-signup-forms">
          {loggedInUser ? (
            <div className="login-greet">
              <h1 className="login-header">
                Login / Signup<span className="green-point">.</span>
              </h1>
              <div>
                <h3>
                  Welcome {loggedInUser.fullname}
                  <button onClick={this.onLogout}>Logout</button>
                </h3>
              </div>
            </div>
          ) : (
            <h1 className="login-header white">
              Login / Signup<span className="green-point">.</span>
            </h1>
          )}

          {loggedInUser ? null : (
            <div className={'signup-container'}>
              {this.state.isNewUser ? signupSection : loginSection}
            </div>
          )}
        </div>

        <section className="admin">
          <hr className="login-signup-hr" />
          <details>
            <div className="admin-container">
              <summary>Admin</summary>
            </div>
            <button onClick={this.props.loadUsers}>Refresh Users</button>
            {this.props.isLoading && 'Loading...'}
            {this.props.users && (
              <ul>
                {this.props.users.map((user) => (
                  <li key={user._id}>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                    <button
                      onClick={() => {
                        this.removeUser(user._id);
                      }}
                    >
                      Remove {user.username}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </details>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
    // isLogin: state.userModule.isLogin
    // isLoading: state.systemModule.isLoading
  };
};
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers,
};

export const LoginSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginSignup);
