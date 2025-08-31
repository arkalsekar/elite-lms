import { supabase } from "../../supabaseClient"
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Leaderboard = () => {
    const [ProfileData, setProfileData] = useState(null);
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q") || "";

    useEffect(() => {
        // Get current session
        if (!ProfileData && q === "") {
            const fetchProfileData = async () => {
                const { data: profData, error: error } = await supabase
                    .from('profiles')
                    .select('*')
                    .order('points', { ascending: false }) // Order by points in descending 
                    .limit(10);  // Limit to top 10 users
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
    }, [q, ProfileData]);

    useEffect(() => {
         if (!ProfileData && q !== "") {
            const fetchProfileData = async () => {
                const { data: profData, error: error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('domain', q) // Filter by domain if q is present
                    .order('points', { ascending: false }) // Order by points in descending 
                    .limit(10);  // Limit to top 10 users
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

    }, [q, ProfileData]);

    return (
        <>
            <div className="container">
                <h1 className="text-bold my-3">Leader Board</h1>

                <h3 className="my-4">Here are the current top 10 performers !!</h3>
                {ProfileData ? (
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Name</th>
                                <th scope="col">Year</th>
                                <th scope="col">Department</th>
                                <th scope="col">Domain</th>
                                <th scope="col">Points</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {ProfileData.map((user, index) => (
                                <tr key={user.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.year}</td>
                                    <td>{user.dept}</td>
                                    <td>{user.domain}</td>
                                    <td>{user.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading leaderboard data...</p>
                )}

            </div>
        </>
    )
}
export default Leaderboard;