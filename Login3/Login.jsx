import { useState } from "react";
import google from "./google.svg";
import facebook from "./facebook.svg";
import apple from "./apple.svg";
import "./Login.css";

const Socials = ({ text = "Or Sign in with" }) => (
    <>
    <span className="or">{text}</span>
    <div className="socials">
        <button type="button" className="socials-btn" aria-label="Sign in with Facebook">
            <img src={facebook} alt="Facebook" />
        </button>
        <button type="button" className="socials-btn" aria-label="Sign in with Google">
            <img src={google} alt="Google" />
        </button>
        <button type="button" className="socials-btn" aria-label="Sign in with Apple">
            <img src={apple} alt="Apple" />
        </button>
    </div>
    </>
);

const Hero = ({
    variant, title, text, buttonLabel, onSwitch }) => (
        <div className={`hero ${variant}`}>
            <h2>{title}</h2>
            <p>{text}</p>
            <button type="button" className="switch" onClick={onSwitch}>
                {buttonLabel}
            </button>
        </div>
    );

const PasswordField = ({ placeholder = "********", name = "password", required = false }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="password-field">
            <input
                type={show ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                required={required}
            />
            <button
                type="button"
                className="eye"
                onClick={() => setShow((prev) => !prev)}
                aria-label={show ? "Hide password" : "Show password"}
            >
                <span className="material-symbols-outlined">
                    {show ? "visibility" : "visibility_off"}
                </span>
            </button>
        </div>
    );
};

const RegisterForm = () => (
    <div className="form register">
        <form onSubmit={(e) => e.preventDefault()}>
            <h2>Create Account</h2>
            <input type="text" name="username" placeholder="Username" required />
            <input type="email" name="email" placeholder="Email" required />
            <PasswordField placeholder="Password" name="password" required />
            <button type="submit" className="submit-btn">
                Sign Up
            </button>
            <Socials text="Or Sign up with" />
        </form>
    </div>
);

const LoginForm = () => (
    <div className="form login">
        <form onSubmit={(e) => e.preventDefault()}>
            <h2>Login</h2>
            <input type="text" name="username" placeholder="Username or Email" required />
            <PasswordField placeholder="Password" name="password" required />
            <a href="#" className="forgot">
                Forgot password?
            </a>
            <button type="submit" className="submit-btn">
                Login
            </button>
            <Socials text="Or Sign in with" />
        </form>
    </div>
);

export const Login = () => {
    const [isRegister, setRegister] = useState(false);

    return (
        <div className={`card ${isRegister ? "register" : ""}`}>
        <div className="card-bg"></div>

        <Hero variant="register" title="Welcome back" text="Login to review..." buttonLabel="Login" onSwitch={() => setRegister(false)}
        />

        <RegisterForm />

        <Hero variant="login" title="Hello there" text="Begin your journey..." buttonLabel="Sign up" onSwitch={() => setRegister(true)}
        />

        <LoginForm />
        </div>
    );
};