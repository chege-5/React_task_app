import LoginForm from '../components/loginform';
import '../styles/form.css';


const LoginPage = ()=> {
    return (
        <div className="login-page">
            <h1>Login</h1>
            <LoginForm />
            
        </div>
    );
}

export default LoginPage;