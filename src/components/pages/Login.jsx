import { supabase } from "../../supabaseClient";
import { useState } from "react";
import Alert from "./Alert";

const Login = () => {
    const formData = {
        email: "",
        password: ""
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
        // console.log(data)
        }

    const [data, setData] = useState([formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({
            email: e.target.email.value,
            password: e.target.password.value
        })  
        console.log(data);

        // supabase logic to login user
        const { data: res, error: error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) {
            console.log("Error logging in:", error.message);
        }
        else {
            console.log("User logged in successfully:", data);
            console.log("Supabase response:", res);
        }

        console.log("Login form submitted");
    }

    return (
        <>
            <div className="container">
                <h1 className="text-bold my-3">Login</h1>

                <form onSubmit={handleSubmit} action="/login" method="post">

                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input onChange={handleChange} type="email" className="form-control" id="email" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input onChange={handleChange} className="form-control" id="password" rows="3"></input>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login;