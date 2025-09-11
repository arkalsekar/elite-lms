import { supabase } from "../../supabaseClient"
import { useState, useEffect } from "react";


const Profile = () => {
    const formData = {
        name1: "",
        email: "",
        phone: "",
        year: "",
        dept: "",
        domain: "",
        expectation: ""
    }
    const [data, setData] = useState([formData]);
    const [session, setSession] = useState(null);
    const [ProfileData, setProfileData] = useState(null);

    useEffect(() => {
        // Get current session
        const getSession = async () => {
            const { data: userData } = await supabase.auth.getSession();
            setSession(userData.session);
        };

        getSession();
    }, []);


    function handleChange(e) {
  const { name, value } = e.target;
  setProfileData(prev => ({
    ...prev,
    [name]: value,
  }));
}
  

   
    if (session) {
        if (!ProfileData) {
            console.log("Fetching profile data for user:", session.user.id);
            console.log("Current session data:", session);
            const fetchProfileData = async () => {
                const { data: profData, error: error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();  
                if (error) {
                    console.error("Error fetching profile data:", error);
                }
                else {
                    setProfileData(profData);
                    setData({ profData });
                    console.log("Form Data", data);
                }
        }
        fetchProfileData();
    }
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
            expectation: e.target.expectation.value
        })

        console.log(data);

        // Insert Profile data into 'profiles' table
        const { profileData, profileError } = await supabase.from('profiles').update([
            {
                id: data.session.user.id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                year: data.year,
                dept: data.dept,
                domain: data.domain,
                expectation: data.expectation
            }
        ]).eq('id', data.session.user.id)  // Ensure we update the correct user
        if (profileError) {
            console.log("Error inserting profile data:", profileError.message);
        }
        else {
            console.log("Profile data inserted successfully:", profileData);
        }
    }

    return (    
        <>
        {/* Display profile of current user with option to change */}

               <div className="container">
                <h1 className="text-bold my-3">Profile Page</h1>
                {
                    ProfileData ? (
                            <form onSubmit={handleSubmit} action="/profile" method="post">
                    <div className="mb-3">  
                        <label for="name" className="form-label">Full Name</label>
                        <input name="name"  onChange={handleChange} type="text" className="form-control" id="name1" placeholder="Abdul Rehman Kalsekar" value={ProfileData.name} required/>
                    </div>
{/* 
                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input  onChange={handleChange} type="email" className="form-control" id="email" placeholder="23ec23@aiktc.ac.in" value={ProfileData.email} required/>
                    </div>

                    <div className="mb-3">
                        <label for="phone" className="form-label">Phone Number</label>
                        <input onChange={handleChange}  type="number" className="form-control" id="phone" placeholder="9123000000" value={ProfileData.phone} required/>
                    </div>

                    <div className="mb-3">
                        <label for="year" className="form-label">Year of Study</label>
                        <select onChange={handleChange}  className="form-select" id="year" aria-label="Default select example" value={ProfileData.year} required>
                            <option selected>Select Year</option>
                            <option value="FE">FE</option>
                            <option value="SE">SE</option>
                            <option value="TE">TE</option>
                            <option value="BE">BE</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label for="dept" className="form-label">Select Department</label>
                        <select onChange={handleChange}  className="form-select" id="dept" aria-label="Default select example" value={ProfileData.dept} required>
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
                        <select onChange={handleChange}  className="form-select" id="domain" aria-label="Default select example" value={ProfileData.domain} required>
                            <option selected>Select Course</option>
                            <option value="Full Stack">FullStack</option>
                            <option value="AI ML">AIML</option>
                            <option value="Cyber Security">CyberSecurity</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label for="expectation" className="form-label">Your Expectations</label>
                        <textarea  onChange={handleChange} className="form-control" id="expectation" rows="3" value={ProfileData.expectation} required></textarea>
                    </div> */}

                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
                    ) : (
                        <p>Loading profile data...</p>
                    )
                }
            

            </div>
        </>
    )
}
export default Profile;