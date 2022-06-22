import React from "react";
import Button from "../../components/button";
import Container from "../../components/container";
import Input from "../../components/input";
import { formData } from "./FormData";
import "./signIn.css";
import SideImage from "../../assets/img/side-image.jpg";

const SignIn = () => {
  const {username, password, loginButton, signupButton, title, description} = formData;

  return (
    <div className="login-page">
      <Container>
        <>
          <form className="login-form">
            <Input placeholder={username}/>
            <Input placeholder={password}/>
            <Button value={loginButton} className="login"/>
            <div className="h-line"></div>
            <a className="forgot-password-link">Forgot Password?</a>
            <Button value={signupButton} className="sing-up"/>
          </form>
          <div className="side-image-container">
            <img className="side-image" src={SideImage} alt="side image"/>
            <div className="side-image-title">{title}</div>
            <div className="side-image-description">{description}</div>
          </div>
        </>
      </Container>
    </div>
  );
};

export default SignIn;
