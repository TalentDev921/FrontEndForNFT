import React, { useState } from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { navigate } from '@reach/router';
import isEmpty from "../../validation/isEmpty";
import { setCurrentUserAction } from '../../store/actions/thunks';
import { useDispatch } from 'react-redux';
import api from '../../core/api';
import { Axios } from '../../core/axios';
import {NotificationManager} from 'react-notifications';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [msgForOpes, setDisplayMsg] = useState("");

  const handleChangeEdit = (ev) => {
    setUser({ ...user, [ev.target.name]: ev.target.value });
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setDisplayMsg("");
    if (isEmpty(user.email)) { setDisplayMsg("Please input your Email address."); return; }
    if (isEmpty(user.password)) { setDisplayMsg("Please input your password."); return; }
    setDisplayMsg("");

    await Axios.post(`${api.baseUrl}${api.doAuth}`,
      { "identifier": user.email, "password": user.password }, {}
    ).then(response => {
      if (response.data) {
        console.log(response.data);
        const token = response.data.jwt;
        localStorage.setItem("jwtToken", token);

        if(response.data.user) dispatch(setCurrentUserAction(response.data.user)); 
        else if(response.data.author) dispatch(setCurrentUserAction(response.data.author)); 
                
        NotificationManager.success("Successfully sign in", "Success", 3000, () => {
          navigate('/home');
        });
      }
      else {
        const msg = (response.data && response.data.message && response.data.message) ||
          (response.message && response.message) || response.toString();
        //trigger error toast with msg    
        NotificationManager.error(msg[0].messages[0].message, 'Error');
      }
    }).catch(error => {
      const msg = (error.response && error.response.data && error.response.data.message) ||
        (error.message && error.message) || error.toString();
        //trigger error toast with msg 
        NotificationManager.error(msg[0].messages[0].message, 'Error');
    })
  }

  return (
    <div>
      <GlobalStyles />

      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className="col-lg-5 text-light wow fadeInRight" data-wow-delay=".5s">
                <div className="spacer-10"></div>
                <h1>Create, sell or collect digital items.</h1>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.</p>
              </div>
              <div className="col-lg-4 offset-lg-2 wow fadeIn" data-wow-delay=".5s">
                <div className="box-login">
                  <h3 className="mb10">Sign In</h3>
                  <p>Login using an existing account or create a new account <span>here</span>.</p>
                  <form name="contactForm" id='contact_form' className="form-border" action='#'>

                    {msgForOpes && <h4>{msgForOpes}</h4>}
                    
                    <div className="field-set">
                      <input type='email' name='email' id='email' onChange={(ev) => handleChangeEdit(ev)} className="form-control" placeholder="email" />
                    </div>

                    <div className="field-set">
                      <input type='password' name='password' id='password' onChange={(ev) => handleChangeEdit(ev)} className="form-control" placeholder="password" />
                    </div>

                    <div className="field-set">
                      <input type='button' id='send_message' onClick={(ev) => handleSubmit(ev)} value="Sign in" className="btn btn-main btn-fullwidth color-2" />
                    </div>

                    <div className="clearfix"></div>

                    <div className="spacer-single"></div>
                    <ul className="list s3">
                      <li>Login with:</li>
                      <li><span >Facebook</span></li>
                      <li><span >Google</span></li>
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>

  );
}

export default Login;
