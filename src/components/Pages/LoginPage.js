import React from "react";

import Login from "../Login/Login";

const LoginPage = ({setIsAuthenticated}) => {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
};

export default LoginPage;
