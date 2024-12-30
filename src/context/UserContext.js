import React from "react";
import axiosInstance from '../axios';


var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();




function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("refresh_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  console.log(context)
  return context;
}


function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
  
}

function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}




export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, parseJwt};

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
//   if (!!login && !!password) {
//     setTimeout(() => {
//       localStorage.setItem('id_token', 1)
//       setError(null)
//       setIsLoading(false)
//       dispatch({ type: 'LOGIN_SUCCESS' })

//       history.push('/app/dashboard')
//     }, 2000);
//   } else {
//     dispatch({ type: "LOGIN_FAILURE" });
//     setError(true);
//     setIsLoading(false);
//   }
// }



  axiosInstance
    .post(`login/`, {
        email: login,
        password: password,
    })
    .then((res) => {
        setError(false);
        setIsLoading(true);
        setTimeout(() => {
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
          axiosInstance.defaults.headers['Authorization'] =
              'Bearer ' + localStorage.getItem('access_token');
          setError(null)
          setIsLoading(false)
          const userInfo = parseJwt(localStorage.getItem('access_token'))
          const is_staff = userInfo.is_staff
          console.log(is_staff)
          dispatch({ type: 'LOGIN_SUCCESS' })
          if (is_staff) {
            history.push('/app/dashboard');
            
          } else {
            history.push('/app/tables');
            
          }
        })
    })
    .catch(error => {
      console.log(error.response)
      setError(true)
    })

  };

function signOut(dispatch, history) {
  const response = axiosInstance.post('logout/blacklist/', {
    refresh_token: localStorage.getItem('refresh_token'),
  });
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.clear();
  axiosInstance.defaults.headers['Authorization'] = null;
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
