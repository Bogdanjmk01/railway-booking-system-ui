import "../../styles/remixicon/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useForm } from "react-hook-form";
import useLogin from "./useLogin";

const Login = () => {
    const { mutate, isPending } = useLogin();
    const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({ mode: "onTouched" });
    const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/;

    const handleLogin = async (data) => {
      await mutate(data);
      setValue("password", "");
    };

    return (
        <main>
            <div className="container">
                <section
                    className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
                >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div
                                className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"
                            >
                                <div className="d-flex justify-content-center py-4">
                                    <a
                                        href="#"
                                        className="logo d-flex align-items-center w-auto"
                                    >
                                        <img src="assets/img/logo.png" alt=""/>
                                        <span className="d-none d-lg-block">BogdanJMK</span>
                                    </a>
                                </div>

                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">
                                                Login to Your Account
                                            </h5>
                                            <p className="text-center small">
                                                Enter your email & password to login
                                            </p>
                                        </div>

                                        <form className="row g-3 needs-validation" onSubmit={handleSubmit(handleLogin)}>
                                            <div className="col-12">
                                                <label htmlFor="yourUsername" className="form-label">Email</label>
                                                <div className="input-group has-validation">
                              <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        id="yourUsername"
                                                        {...register("email",
                                                        { required: { value: true, message: "Email is required", },
                                                            pattern: { value: emailRegex, message: "Please provide a valid email address" }})}
                                                    />
                                                </div>
                                                {errors?.email && (<span className="text-danger">* {errors.email.message}</span>)}
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="yourPassword" className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    id="yourPassword"
                                                    {...register("password", {
                                                    required: { value: true, message: "Password is required" },
                                                    minLength: { value: 6, message: "Password must be at least 6 characters long" }})}
                                                />
                                                {errors?.password && (<span className="text-danger">* {errors.password.message}</span>)}
                                            </div>

                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="remember"
                                                        value="true"
                                                        id="rememberMe"
                                                    />
                                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit" disabled={isPending || !isValid}>
                                                    {isPending ? 'Logging in...' : 'Login'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>)
};

export default Login;
