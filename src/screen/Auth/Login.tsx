import React, { useReducer } from "react"

import { useNavigate } from "react-router-dom"
import { authService, storageService } from "../../services"
import reducer from "./Login.reducer"
import "./Login.css";

export default () => {

const navigation = useNavigate()

    const [state, dispatch] = useReducer(reducer, {
        isSubmitted: false,
        sending: false,
        inputs: {
            username: "",
            password: "",
        }
    })

    const { isSubmitted, inputs } = state
    const { username, password } = inputs

    const login = () => {
        dispatch({ name: "SET_IS_SUBMITTED" })

        if (!username && !password) return
        dispatch({ name: "SET_SENDING", payload: false })

        console.log("state", state)

        authService.login(inputs)
            .then(resp => {
                console.log("resp", resp )
                storageService.setToken(resp.data.data.access_token)
                navigation("/admin")
            })
            .catch(error => console.log("error", error))
            .finally(() => dispatch({ name: "SET_SENDING", payload: false }))
    }
// const Login: React.FC = () => {
    return (
    <div className="auth-layout-wrapper">
            <div className="auth-layout-left-content-wrapper">
                <img src="../../../assets/img/auth/rectangle-login.png" alt="login" width="50%" />
                <div className="auth-layout-left-content-form-wrapper">
                    <div className="auth-layout-left-content-form-title-wrapper">
                        <h3>Halaman login untuk Admin</h3>
                        <h1>Selamat Datang</h1>
                    </div>
                    <form action="" className="auth-layout-left-content-form-input-wrapper">
                        <label htmlFor="email">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Your Email.."
                            value={state.inputs.username}
                            disabled={state.sending}
                            onChange={event => dispatch({ 
                                name: 'SET_INPUTS',
                                payload: { username: event.target.value }
                            })}
                        />
                        <div>
                            {isSubmitted && !username ? (
                                <span style={{ color: "red" }}>Username wajib diisi</span>
                            ) : null}
                        </div>
                            <br/>
                            <br/>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Your Password.."
                                value={state.inputs.password}
                                disabled={state.sending}
                                onChange={event => dispatch({ 
                                    name: 'SET_INPUTS',
                                    payload: { password: event.target.value }
                                })}
                            />
                        <div>
                            {isSubmitted && !password ? (
                                <span style={{ color: "red" }}>Password wajib diisi</span>
                            ) : null}
                        </div>

                                <a href="">Lupa Password?</a>
                                {/* <input type="submit" value="Masuk" /> */}
                                <button disabled={state.sending} type="button" onClick={() => login()}>Login</button>

                    </form>

                                </div>
                            </div>
                            <div className="auth-layout-right-content-wrapper">
                                <div className="auth-layout-content">
                                    <img src="../../../assets/img/auth/text-right-login.png" alt="login" width="75%" />

                                </div>
                            </div>
                        </div>
    );
};
// export default Login;