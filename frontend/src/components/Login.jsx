import React from "react";
import FacebookLogin from "react-facebook-login-lite";
import axios from "axios";

const Login = ({ onLogin }) => {
  const responseFacebook = async (response) => {
    const { accessToken } = response.authResponse;
    const userResponse = await axios.post(
      "https://assignment-aadi-foundation-1.onrender.com/api/auth/facebook",
      { accessToken }
    );
    console.log(userResponse.data);
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
            onSuccess={responseFacebook}
            onFailure={(error) => console.error("Login failed:", error)}
            scope="public_profile,email,pages_show_list,pages_read_engagement,read_insights"
            fields="name,email,picture"
            render={({ onClick, isDisabled }) => (
              <button
                onClick={onClick}
                disabled={isDisabled}
                className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center"
              >
                <i className="fab fa-facebook-f mr-2" />
                Login with Facebook
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
