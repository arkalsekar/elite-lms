import { supabase } from "../../supabaseClient"
import { useState, useEffect } from "react";


const Profile = () => {
    const [session, setSession] = useState(null);
    const [ProfileData, setProfileData] = useState(null);

    useEffect(() => {
        // Get current session
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
        };

        getSession();
    }, []);

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
                    console.log("Profile data fetched successfully:", profData);
                    setProfileData(profData);
                    console.log("ProfileData state updated:", ProfileData);
                }
        }
        fetchProfileData();
    }
    }
    return (    
        <>
            <div className="container">
                <h1 className="text-bold my-3">Profile Page</h1>
                {ProfileData ? (
                    <div>
                        <p><strong>Name:</strong> {ProfileData.name}</p>
                        <p><strong>Email:</strong> {ProfileData.email}</p>
                        <p><strong>Phone:</strong> {ProfileData.phone}</p>
                        <p><strong>Year:</strong> {ProfileData.year}</p>
                        <p><strong>Department:</strong> {ProfileData.dept}</p>
                        <p><strong>Domain:</strong> {ProfileData.domain}</p>
                        <p><strong>Expectation:</strong> {ProfileData.expectation}</p>
                        <p><strong>points:</strong> {ProfileData.points}</p>
                        <p><strong>Registered On:</strong> {new Date(ProfileData.created_at).toLocaleDateString()}</p>

                    </div>
                ) : (
                    <p>Loading profile data...</p>
                )}
            </div>
        </>
    )
}
export default Profile;