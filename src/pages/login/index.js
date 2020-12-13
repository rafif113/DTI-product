import React, { useState } from 'react';
import { setCookie } from '../../utils/cookie';
import { authService } from '../../services';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoginLoading, setLoginLoading] = useState(false);

  const onSubmitLogin = () => {
    setLoginLoading(true);
    authService
      .login(username, password)
      .then((res) => {
        const cookieToken = res.token;
        const cookieUser = {
          userId: res.userId,
          username: res.username,
        };
        setCookie('userData', JSON.stringify(cookieUser), 10000);
        setCookie('token', JSON.stringify(cookieToken), 10000);
        window.location.replace('/product');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  return (
    <section className="Form my-4 mx-5">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-lg-7 px-5 pt-5">
            <h4>Silahkan Login</h4>
            <form
              className="login_form"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmitLogin();
              }}
            >
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    autoFocus
                    placeholder="username"
                    className="form-control my-3 "
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="password"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <button
                    disabled={isLoginLoading}
                    type="submit"
                    name="submit"
                    value="submit"
                    className="btn btn-dark mt-5"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
