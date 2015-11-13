var React = require('react');
var ReactDOM = require('react-dom');
var SignUpForm = require('./signUpForm.jsx');
var LoginForm = require('./logInForm.jsx')
var Questionnaire = require('./questionnaire.jsx')

var SignInPage = React.createClass({
  render: function() {
    if(this.props.signUpStatus === true) {
      return (
        <div>
          <header>
            <nav id='nav'>
              <h2 className="logo">LIFE ANALYTICS</h2>

              <div className="space"></div>

              <ul>
                <a className="selected" href="#"><li className="active">HOME</li></a>
                <a href="#"><li>ABOUT</li></a>
                <a href="#"><li>HABITS</li></a>
                <a href="#"><li>CONTACT</li></a>
              </ul>
            </nav>
          </header>
          <div className="form">
            <ul className="tab-group">
              <li onClick={this.props.clickSignUpButton} className={(this.props.signUpStatus) ? 'tab active':'tab'}><a href="#signup">Sign Up</a></li>
              <li onClick={this.props.clickLoginButton} className={(this.props.loginStatus) ? 'tab active':'tab'}><a href="#login">Log In</a></li>
            </ul>
            <div className="tab-content">

            </div>
             <SignUpForm  ref="signUp" signUpStatus={this.props.signUpStatus} createUser={this.props.createUser} />
            <script src="js/index.js"></script>
          </div>
        </div>
      )
    }
    else if(this.props.loginStatus === true) {
      return (
        <div>
          <header>
            <nav id='nav'>
              <h2 className="logo">LIFE ANALYTICS</h2>

              <div className="space"></div>

              <ul>
                <a className="selected" href="#"><li className="active">HOME</li></a>
                <a href="#"><li>ABOUT</li></a>
                <a href="#"><li>HABITS</li></a>
                <a href="#"><li>CONTACT</li></a>
              </ul>
            </nav>
          </header>
          <div className="form">
            <ul className="tab-group">
              <li onClick={this.props.clickSignUpButton} className={(this.props.signUpStatus) ? 'tab active':'tab'}><a href="#signup">Sign Up</a></li>
              <li onClick={this.props.clickLoginButton} className={(this.props.loginStatus) ? 'tab active':'tab'}><a href="#login">Log In</a></li>
            </ul>
            <div className="tab-content">
            </div>
              <LoginForm ref="login" findUser={this.props.findUser} loginStatus={this.props.loginStatus} />

          </div>
        </div>
      )
    }
  }
});

module.exports = SignInPage;
