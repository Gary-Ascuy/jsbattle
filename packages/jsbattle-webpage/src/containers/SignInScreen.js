import FullRow from "../components/FullRow.js";
import Loading from "../components/Loading.js";
import React from "react";
import {connect} from 'react-redux';
import {getAuthMethods} from '../actions/coreAction.js';
import PropTypes from 'prop-types';

export class SignInScreen extends React.Component {

  componentDidMount() {
    this.props.getAuthMethods();
  }

  render() {
    const config = {
      github: {
        icon: 'fab fa-github float-left',
        color: '#fff',
        backgroundColor: '#333'
      },
      facebook: {
        icon: 'fab fa-facebook float-left',
        color: '#fff',
        backgroundColor: '#3b5998'
      },
      google: {
        icon: 'fab fa-google float-left',
        color: '#fff',
        backgroundColor: '#ea4335'
      },
      keycloak: {
        icon: 'fab fa-google float-left',
        color: '#ffffff',
        backgroundColor: '#414141'
      }
    };

    let buttons = Object.keys(this.props.authMethods).map((providerName) => {
      let auth = this.props.authMethods[providerName];
      const authConfig = config[providerName];
      const style = {
        color: authConfig ? authConfig.color : '#fff',
        backgroundColor: authConfig ? authConfig.backgroundColor : '#4ca624',
        border: 0,
        borderRadius: '26px',
        width: '100%',
        maxWidth: '350px',
        margin: '0.2em',
        fontWeight: 200
      };
      const icon = authConfig ? authConfig.icon : 'fa fa-lock float-left';
      return <div key={providerName}>
        <a href={auth.url} style={style} className={`btn btn-primary btn-lg ${providerName}-auth-button`}>
          <i className={icon} style={{ marginTop: '0.3em', backgroundRepeat: 'no-repeat', backgroundSize: '16px 20px', color: 'transparent', backgroundImage: 'url("/img/colombia/logo.small.png")' }}></i> Login with {auth.name}
        </a>
      </div>;
    });

    if(buttons.length == 0) {
      buttons = <em>No authorization method is configured :(</em>;
    }

    if(this.props.isLoading) {
      return <Loading />;
    }
    let separatorStyle = {
      textAlign: 'center',
      border: 0,
      width: '100%',
      maxWidth: '350px',
      margin: '2em auto',
      height: 0,
      borderBottom: '1px solid #aaa'
    };
    let separatorLabelStyle = {
      color: '#888',
      textAlign: 'center',
      padding: '0.5em',
      position: 'relative',
      top: '-1.25em',
      backgroundColor: '#fff',
      margin: 'auto',
      width: '3em',
      fontStyle: 'italic'
    };
    const guestStyle = {
      color: '#000',
      backgroundColor: '#fff',
      border: '1px solid #666',
      width: '100%',
      maxWidth: '350px',
      margin: '0.2em',
      borderRadius: '26px',
      fontWeight: 200
    };
    return <FullRow>
          <div style={{padding: '2em 1em', textAlign: 'center'}}>
            <img style={{ width: '400px' }} src="/img/colombia/colombia-logo.png" alt="JsBattle" />
            <h2>Please Sign-In</h2>
            {buttons}
            <div style={separatorStyle}><div style={separatorLabelStyle}> OR </div></div>
            <div>
              <a href="#/challenge" style={guestStyle} className="btn btn-primary btn-lg guest-auth-button">
                <i className="fas fa-sign-in-alt float-left" style={{marginTop: '0.3em' }}></i> Continue as Guest
              </a>
            </div>
          </div>
      </FullRow>;
  }
}

SignInScreen.defaultProps = {
  authMethods: {},
  isLoading: false,
  getAuthMethods: () => {}
};

SignInScreen.propTypes = {
  authMethods: PropTypes.object,
  isLoading: PropTypes.bool,
  getAuthMethods: PropTypes.func
};

const mapStateToProps = (state) => ({
  authMethods: state.auth.authMethods,
  isLoading: state.loading.AUTH_METHODS,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthMethods: () => {
    dispatch(getAuthMethods());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
