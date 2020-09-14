import React, { Component } from 'react';
import './App.css';
import GoogleLogin from './googleLogin.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: this.props.login
    };
  }



  /*
    loginStatus = (loginGoogle) => {
      this.setState({logged:loginGoogle})
    };
  */
  loginStatus = (e, logged) => {
    this.setState({
      logged: logged
    })
  }

  //cargamos interfaz
  render() {

    if (this.state.logged === '1') {
      return (<GoogleLogin loginStatus={this.loginStatus} logged={this.state.logged} />
      )
    }
    else if (this.state.logged === '2') {
      return (
        <div>
          <h2>esta logueado con Facebook</h2>
          <div className='btn btn-primary' onClick={(e) => this.loginStatus(e, '0')} >Salir</div>
        </div>
      )
    }
    else if (this.state.logged === '3') {
      return (
        <div>
          <h2>esta logueado con Paseando Ando</h2>
          <div className='btn btn-primary' onClick={(e) => this.loginStatus(e, '0')} >Salir</div>
        </div>
      )

    }
    else {

      return (
        <div className='ml-auto mr-auto border rounded m-5'>
          <h2>Ingreso</h2>
          <form className="container col-12 col-sm-7 col-md-5 col-lg-4">
            <h1 className="h3 mb-3 font-weight-normal text-center"> Sign in</h1>
            <div className="row social-login">
              <button className="btn btn-primary" type="button" onClick={(e) => this.loginStatus(e, '2')}><span><i className="fab fa-facebook-f"></i> Sign in with Facebook</span> </button>
              <GoogleLogin logged={this.state.logged} loginStatus={this.loginStatus}>
              </GoogleLogin>
            </div>
            <br />
            <p className="text-center"> OR  </p>
            <div className="input-group pb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-envelope-o fa-fw"></i></span>
              </div>
              <input className="form-control" type="text" placeholder="Email" />
            </div>
            <div className="input-group pb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-key fa-fw"></i></span>
              </div>
              <input className="form-control" type="password" placeholder="Pasword" />
            </div>
            <button className="btn btn-success btn-block" type="submit" onClick={(e) => this.loginStatus(e, '3')}><i className="fas fa-sign-in-alt"></i> Sign in</button>

            <a href="#" id="forgot_pswd">Forgot password?</a>
            <hr />
            <button className="btn btn-primary btn-block" type="button" id="btn-signup"><i className="fas fa-user-plus"></i> Sign up New Account</button>
            <br />

          </form>
        </div>

      )

    }
  }
}

export default App;
