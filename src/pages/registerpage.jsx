import RegisterForm from '../components/registerform';
import '../styles/form.css'; 

const RegisterPage = () => {
    return(
        <div className="register">
            <h1>Register</h1>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;