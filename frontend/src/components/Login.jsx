import React from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

const Login = ({ onLogin }) => {
  const responseFacebook = async (response) => {
    const { accessToken } = response;
    const userResponse = await axios.post(
      "http://localhost:5000/api/auth/facebook",
      { accessToken }
    );
    onLogin({ ...userResponse.data, accessToken });
  };

  return (
    <div>
      <FacebookLogin
        appId="<YOUR_APP_ID>"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        scope="pages_show_list, pages_read_engagement"
      />
    </div>
  );
};

export default Login;
