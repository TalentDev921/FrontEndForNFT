import React, { useState, memo } from "react";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import {NotificationManager} from 'react-notifications';
import * as selectors from '../../store/selectors';
import isEmpty from "../../validation/isEmpty";
import api from '../../core/api';
import { Axios } from '../../core/axios';
import CropImage from "../components/CropImage";

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




const EditProfile = () => {
  const user = useSelector(selectors.currentUser);
  let author = {};
  if(!isEmpty(user)) {
    author = user._doc;
  }
  
  const [currentUser, setCurrentUser] = useState({...author, password: ''});
  const [AvatarFileURL, setAvatarFileURL] = useState(0);
  console.log(currentUser);
  const handleChangeEdit = (event) => {
    event.preventDefault();
    setCurrentUser({ ...currentUser, [event.target.name]: event.target.value });
  }
 
  const handleCropImage = (cropImageURL) => {
    setAvatarFileURL(cropImageURL);
  }
  const handleSubmit = async (event) => {
    if (isEmpty(currentUser.name)) { 
      NotificationManager.warning('Please insert name', 'warning');
      return;
    }
    if (isEmpty(currentUser.username)) {
      NotificationManager.warning('Please insert user name', 'warning');
      return;
    }
    if (isEmpty(currentUser.email)) { 
      NotificationManager.warning('Please insert email', 'warning');
      return;
    }
    if(!isEmpty(currentUser.password)){
      if (isEmpty(currentUser.new_password)) { 
        NotificationManager.warning('Please insert new password', 'warning');
        return; 
      }
      if (isEmpty(currentUser.confirm_new_password)) { 
        NotificationManager.warning('Please insert confirm password', 'warning');
        return; 
      }
      if (currentUser.new_password !== currentUser.confirm_new_password) { 
        NotificationManager.warning('Please input passwords correctly', 'warning');
        return; 
      }
    }
    if(isEmpty(currentUser.phone)) {
      NotificationManager.warning('Please input phone', 'warning');
      return;
    }
    if(isEmpty(currentUser.social)) {    }
    if(isEmpty(currentUser.about)) {    }
    if(isEmpty(currentUser.wallet)) {    }
    
    const uploadToServer = async (sourceUrl) => {
      // first get our hands on the local file
      const localFile = await fetch(sourceUrl);
      // then create a blob out of it (only works with RN 0.54 and above)
      const fileBlob = await localFile.blob();
      
      var madenfilename = `${currentUser.username}_avatar`+`${fileBlob.type}`.trim("image/")
      var avatardata = new FormData();
      avatardata.append('avatar', fileBlob, madenfilename);  

      Axios.put(`${api.baseUrl}${api.authors}/${"updateprofile"}/${currentUser._id}`, avatardata , 
      {
        enctype: 'multipart/form-data',
        headers: {
          "Content-Type" : fileBlob.type,
          "file-size": fileBlob.size,
        }
      }
      ).then(response => {
        if (response.data.success === true) {
        }
        else {
          const msg = (response.data && response.data.message && response.data.message) ||
            (response.message && response.message) || response.toString();
          //trigger error toast with msg
          NotificationManager.warning(msg, 'warning');
        }
      }).catch(error => {
        const msg = (error.response && error.response.data && error.response.data.message) ||
          (error.message && error.message) || error.toString();
        //trigger error toast with msg 
        NotificationManager.warning(msg, 'warning');
      })
    }
    
    //Update the formData object
    await Axios.put(`${api.baseUrl}${api.authors}/${currentUser._id}`, currentUser, {}).then(response => {
      if (response.data.success === true) {
        //move to home page
          NotificationManager.success('Successfully updated profile', 'Success');
          
      }
      else {
        const msg = (response.data && response.data.message && response.data.message) ||
          (response.message && response.message) || response.toString();
        //trigger error toast with msg
        NotificationManager.warning(msg, 'warning');
      }
    }).catch(error => {
      const msg = (error.response && error.response.data && error.response.data.message) ||
        (error.message && error.message) || error.toString();
      NotificationManager.warning(msg, 'warning');
    })
    uploadToServer(AvatarFileURL);
  }
  
  return (
    <div>
      <GlobalStyles />

      <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${'./img/background/subheader.jpg'})` }}>
        <div className='mainbreadcumb'>

          <div className='col-12'>
            <h1 className='text-center'>Edit My Profile</h1>

          </div>
        </div>
      </section>

      <section className='container'>

        <div className="col-lg-7 offset-lg-3 mb-5">
          <div id="form-create-item" className="form-border" action="#">
            <div className="lazy item_avatar">
              <CropImage handleChange={handleCropImage} />
              <div name="contactForm" id='contact_form' className="form-border">

                <div className="row">

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Name:</label>
                      <input type='text' name='name' id='name' className="form-control" defaultValue={currentUser.name} placeholder="Input your Name" onChange={handleChangeEdit} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Username:</label>
                      <input type='text' name='username' id='username' className="form-control" defaultValue={currentUser.username} placeholder="Choose a Username" onChange={handleChangeEdit} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Email Address:</label>
                      <input type='email' name='email' id='email' className="form-control" defaultValue={currentUser.email} placeholder="Input your Email" onChange={handleChangeEdit} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Current Password:</label>
                      <input type='password' name='password' id='password' placeholder="Input current password" className="form-control" onChange={handleChangeEdit} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>New Password:</label>
                      <input type='password' name='new_password' id='new_password' placeholder="Input new password" className="form-control" onChange={handleChangeEdit} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Confirm New Password:</label>
                      <input type='password' name='confirm_new_password' id='confirm_new_password' placeholder="Input confirm password" className="form-control" onChange={handleChangeEdit} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Phone:</label>
                      <input type='text' name='phone' id='phone' className="form-control" defaultValue={currentUser.phone} placeholder="Input phone number" onChange={handleChangeEdit} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Banner:</label>
                      <input type='text' name='banner' id='banner' className="form-control" defaultValue={currentUser.banner} placeholder="Input banner URL" onChange={handleChangeEdit} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Social:</label>
                      <input type='text' name='social' id='social' className="form-control" defaultValue={currentUser.social} placeholder="Input social URL" onChange={handleChangeEdit} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="field-set">
                      <label>wallet:</label>
                      <input type='text' name='wallet' id='wallet' className="form-control" defaultValue={currentUser.wallet} placeholder="Input wallet" onChange={handleChangeEdit} />
                    </div>
                  </div>
                  <div className="spacer-10"></div>
                  <div className="col-md-12">
                    <div className="field-set">
                      <label>Summary</label>
                      <textarea data-autoresize name="about" id="profile" defaultValue={currentUser.about} placeholder="Input summary" className="form-control" onChange={handleChangeEdit}></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div id='button' className="pull-left">
                      <input type="button" id="submit" onClick={handleSubmit} className="btn-main" value="Save" />
                    </div>

                    <div className="clearfix"></div>
                  </div>

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

export default memo(EditProfile);