import React, { useState } from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { navigate } from '@reach/router';
import isEmpty from "../../validation/isEmpty";
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

const Register = () => {
  const [user, setUser] = useState({});
  const [msgForOpes, setDisplayMsg] = useState("");

  const handleChangeEdit = (ev) => {
    setUser({ ...user, [ev.target.name]: ev.target.value });
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (isEmpty(user.name)) { setDisplayMsg("Please input your name."); return; }
    if (isEmpty(user.username)) { setDisplayMsg("Please input your user name."); return; }
    if (isEmpty(user.email)) { setDisplayMsg("Please input your Email address."); return; }
    if (isEmpty(user.phone)) { setDisplayMsg("Please input your phone number."); return; }
    if (isEmpty(user.password)) { setDisplayMsg("Please input your password."); return; }
    if (isEmpty(user.confirm_password)) { setDisplayMsg("Please input 'Re-enter Password'."); return; }
    if (user.password !== user.confirm_password) { setDisplayMsg("Please input passwords correctly."); return; }
      
    setDisplayMsg("");

    console.log("before submit user info.");
    
    await Axios.post(`${api.baseUrl}${api.users}`,
      {
        "name":user.naeme, 
        "username":user.username, 
        "email":user.email, 
        "phone":user.phone,
        "password":user.password
      }, {}
    ).then(response => {
      if (response.data.success === true) {
        //trigger success toast
        NotificationManager.success("Successfully signed up.", "Success", 3000, () => {
          navigate('/login');
        });
        //move to login page
      }
      else {
        const msg = (response.data && response.data.message && response.data.message) ||
          (response.message && response.message) || response.toString();
        //trigger error toast with msg       
        NotificationManager.warning(msg, "Warning");
      }
    }).catch(error => {
      const msg = (error.response && error.response.data && error.response.data.message) ||
        (error.message && error.message) || error.toString();
      //trigger error toast with msg 
      NotificationManager.warning(msg, "Warning");
    })

  }

  return (
    <div>
      <GlobalStyles />

      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row'>
              <div className="col-md-12 text-center">
                <h1>Sign Up</h1>
                <p>Anim pariatur cliche reprehenderit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className="row">

          <div className="col-md-8 offset-md-2">
            <h3>Don't have an account? Register now.</h3>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

            <div className="spacer-10"></div>
            {msgForOpes && <h4>{msgForOpes}</h4>}
            
            <form name="contactForm" id='contact_form' className="form-border" action='#'>

              <div className="row">

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Name:</label>
                    <input type='text' name='name' id='name' className="form-control" onChange={(ev) => handleChangeEdit(ev)} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Email Address:</label>
                    <input type='email' name='email' id='email' className="form-control" onChange={(ev) => handleChangeEdit(ev)} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Choose a Username:</label>
                    <input type='text' name='username' id='username' className="form-control" onChange={(ev) => handleChangeEdit(ev)} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Phone:</label>
                    <input type='text' name='phone' id='phone' className="form-control" onChange={(ev) => handleChangeEdit(ev)} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Password:</label>
                    <input type='password' name='password' id='password' className="form-control" onChange={(ev) => handleChangeEdit(ev)} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="field-set">
                    <label>Re-enter Password:</label>
                    <input type='password' name='confirm_password' id='confirm_password' className="form-control" onChange={(ev) => handleChangeEdit(ev)} />
                  </div>
                </div>

                <div className="col-md-12">
                  <div id='button' className="pull-left">
                    <input type='button' id='send_message' value='Sign Up' onClick={(ev) => handleSubmit(ev)} className="btn btn-main color-2" />
                  </div>

                  <div className="clearfix"></div>
                </div>

              </div>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </div>

  );
}

export default Register;