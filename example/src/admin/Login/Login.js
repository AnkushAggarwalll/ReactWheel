import React from 'react'
import "./Login.css"
import {adminLogin} from "../../config"
import axios from 'axios'

export default function Login(props) {
    const Login = event => {
        event.preventDefault();
        axios.post(adminLogin, {login:event.target.login.value,password:event.target.password.value})
        .then(res => {localStorage.setItem("token",res.data.authtoken);
        props.setIsLoggedIn(true)} )
    }
    return (
        <div class="body">
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    <div class="fadeIn first">
                        <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
                    </div>
                    <form onSubmit={e => Login(e)}>
                        <input type="text" id="login" class="fadeIn second" name="login" placeholder="login" />
                        <input type="text" id="password" class="fadeIn third" name="password" placeholder="password" />
                        <input type="submit" class="fadeIn fourth" value="Log In" />
                    </form>

                    <div id="formFooter">
                        <a class="underlineHover" href="#">Forgot Password?</a>
                    </div>

                </div>
            </div>
         </div>
            )
}
