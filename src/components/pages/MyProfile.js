import React, { useEffect } from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import isEmpty from "../../validation/isEmpty";
import api from '../../core/api';

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
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
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

const MyProfile = () => {
  const currentUser = useSelector(selectors.currentUser);
  
  
  return (
    <div>
      <GlobalStyles />

      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>

          <div className='col-12'>
            <h1 className='text-center'>My Profile</h1>

          </div>
        </div>
      </section>

      <section className='container'>

        <div className="col-lg-7 offset-lg-3 mb-5">
          <div id="form-create-item" className="form-border" action="#">
            <div className="field-set">

              <div style={{ display: 'flex', margin: 'auto', width: 200, flexWrap: 'wrap', }}>
                <img style={{ borderRadius: '50%' }} 
                  src={`${api.baseUrl}${api.media}/${currentUser.avatar.hash}${currentUser.avatar.ext}`} width="180px" height="180px" alt="Avatar" loading="lazy" />
              </div>

              <div name="contactForm" id='contact_form' className="form-border" action='#'>

                <div className="row">

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Name:</label>
                      <input type='text' name='name' id='name' className="form-control" value={currentUser.name || ''} disabled={("input-a")} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Username:</label>
                      <input type='text' name='username' id='username' value={currentUser.username || ''} className="form-control" disabled={("input-a")} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Email Address:</label>
                      <input type='email' name='email' id='email' value={currentUser.email || ''} className="form-control" disabled={("input-a")} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Phone:</label>
                      <input type='text' name='phone' id='phone' value={currentUser.phone || ''} className="form-control" disabled={("input-a")} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Banner:</label>
                      <input type='text' name='banner' id='banner' value={currentUser.banner || ''} className="form-control" disabled={("input-a")} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Social:</label>
                      <input type='text' name='social' id='social' value={currentUser.social || ''} className="form-control" disabled={("input-a")} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>wallet:</label>
                      <input type='text' name='wallet' id='wallet' value={currentUser.wallet || ''} className="form-control" disabled={("input-a")} />
                    </div>
                  </div>
                  <div className="spacer-10"></div>
                  <div className="col-md-12">
                    <div className="field-set">
                      <label>Summary</label>
                      <textarea data-autoresize name="profile" id="profile" defaultValue={currentUser.about} className="form-control" disabled></textarea>
                    </div>
                  </div>

                  {/* <div className="col-md-12">
                          <div id='button' className="pull-left">
                          <input type="button" id="submit" onClick={() => handleSubmit()} className="btn-main" value="Save"/>
                          </div>

                          <div className="clearfix"></div>
                        </div> */}

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

export default MyProfile;
