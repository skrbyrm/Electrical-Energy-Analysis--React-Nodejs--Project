
const REACT_APP_BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER
const config = {
    urls: {
        REACT_APP_BACKEND_SERVER:REACT_APP_BACKEND_SERVER,
        REACT_SERVER_LOGIN:`${REACT_APP_BACKEND_SERVER}/login`,
        REACT_SERVER_ME:`${REACT_APP_BACKEND_SERVER}/me`,
        REACT_SERVER_LOGOUT:`${REACT_APP_BACKEND_SERVER}/logout`,
        BACKEND_SERVER_SUMMARY:`${REACT_APP_BACKEND_SERVER}/getAllSummary_data`,
        BACKEND_SERVER_WEEKLY:`${REACT_APP_BACKEND_SERVER}/weeksly/`,
        BACKEND_SERVER_DAILY:`${REACT_APP_BACKEND_SERVER}/daily/`,
        BACKEND_SERVER_HOURLY:`${REACT_APP_BACKEND_SERVER}/hourly/`,
        BACKEND_SERVER_USERS:`${REACT_APP_BACKEND_SERVER}/users`
        
    }

}
export default config;
