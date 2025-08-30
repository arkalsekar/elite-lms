import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'
import Alert from './Alert'

const Register = () => {
    const [message, setMessage] = useState(null);
    const formData = {
        name: "",
        email: "",
        phone: "",
        year: "",
        dept: "",
        domain: "",
        pass1: "",
        pass2: "",
        expectation: ""
    }
    const [data, setData] = useState([formData]);

      const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
        // console.log(data);
  }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // supbase logic to add user to database
        setData({
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            year: e.target.year.value,
            dept: e.target.dept.value,
            domain: e.target.domain.value,
            pass1: e.target["pass-1"].value,
            pass2: e.target["pass-2"].value,
            expectation: e.target.expectation.value
        })

        console.log(data);
        if (data.pass1 !== data.pass2) {
            setMessage({ type: 'danger', text: 'Passwords do not match!' });
            return;
        }


        const { data: getData, error: error } = await supabase.auth.signUp({
            email: data.email,
            password: data.pass1,
        })

        if (error) {
            console.log("Error signing up:", error.message);
            setMessage({ type: 'danger', text: error.message });
        }
        else {
            // const user = getData.user
            console.log("User signed up successfully:", data);
            console.log("Supabase response:", getData);
            setMessage({ type: 'success', text: 'Registered Successfully! Please check your email to verify your account.' });
        }

        // Insert Profile data into 'profiles' table
        const { profileData, profileError } = await supabase.from('profiles').insert([
            {
                id: getData.user.id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                year: data.year,
                dept: data.dept,
                domain: data.domain,
                expectation: data.expectation
            }
        ])  
        if (profileError) {
            console.log("Error inserting profile data:", profileError.message);
        }
        else {
            console.log("Profile data inserted successfully:", profileData);
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="text-bold my-3">Register</h1>
                {message && <Alert type={message.type} message={message.text} />}

                <form onSubmit={handleSubmit} action="/register" method="post">
                    <div className="mb-3">
                        <label for="name" className="form-label">Full Name</label>
                        <input  onChange={handleChange} type="text" className="form-control" id="name" placeholder="Abdul Rehman Kalsekar"  required/>
                    </div>

                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input  onChange={handleChange} type="email" className="form-control" id="email" placeholder="23ec23@aiktc.ac.in"  required/>
                    </div>

                    <div className="mb-3">
                        <label for="phone" className="form-label">Phone Number</label>
                        <input onChange={handleChange}  type="number" className="form-control" id="phone" placeholder="9123000000"  required/>
                    </div>

                    <div className="mb-3">
                        <label for="year" className="form-label">Year of Study</label>
                        <select onChange={handleChange}  className="form-select" id="year" aria-label="Default select example" required>
                            <option selected>Select Year</option>
                            <option value="FE">FE</option>
                            <option value="SE">SE</option>
                            <option value="TE">TE</option>
                            <option value="BE">BE</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label for="dept" className="form-label">Select Department</label>
                        <select onChange={handleChange}  className="form-select" id="dept" aria-label="Default select example" required>
                            <option selected>Select Dept</option>
                            <option value="ECS">ECS</option>
                            <option value="AIML">AIML</option>
                            <option value="CO">CO</option>
                            <option value="DS">DS</option>
                            <option value="ME">ME</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label for="domain" className="form-label">Select Domain</label>
                        <select onChange={handleChange}  className="form-select" id="domain" aria-label="Default select example" required>
                            <option selected>Select Course</option>
                            <option value="Full Stack">Full Stack</option>
                            <option value="AI ML">AI ML</option>
                            <option value="Cyber Security">Cyber Security</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label for="pass-1" className="form-label">Password</label>
                        <input  onChange={handleChange} type="password" className="form-control" id="pass-1"  required/>
                    </div>

                    <div className="mb-3">
                        <label for="pass-2" className="form-label">Repeat Password</label>
                        <input onChange={handleChange}  type="password" className="form-control" id="pass-2"  required/>
                    </div>


                    <div className="mb-3">
                        <label for="expectation" className="form-label">Your Expectations</label>
                        <textarea  onChange={handleChange} className="form-control" id="expectation" rows="3" required></textarea>
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                </form>

            </div>
        </>
    )
}

export default Register;