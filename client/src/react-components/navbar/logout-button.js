import React from 'react';
import "./styles.css";
import {logout} from '../../actions/user';

export default function LogoutButton() {
  const reloadWaitTime = async () => setTimeout(()=>{
    console.log("waiting for reload");
  }, 2500);

  const postLogout = async () => {
    return logout();
  }
  const onClickLogoutButton = ()=> {
    postLogout().then(()=> {
      reloadWaitTime().then(() => window.location.href = `/`)
    });
  };

  return (
      <div>
        <div className="search-button-box">
          <button className="logoutButtonStyle" onClick={onClickLogoutButton}>
            LOGOUT
          </button>
        </div>
      </div>
  );
}
