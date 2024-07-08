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
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-200 to-blue-500 rounded-lg p-10">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <p className="text-gray-600 mb-8 text-center text-1xl font-medium p-2">
          Please Log in with your Facebook Account
        </p>
        <div className="flex justify-center">
          <FacebookLogin
            appId="325263403985214"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            scope="pages_show_list, pages_read_engagement"
            cssClass="bg-blue-700 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center"
            icon={<i className="fab fa-facebook-f mr-2" />}
            textButton="Login with Facebook"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
