import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";

// Resources are as follows:
// domain_resources table
// domain_name | res_title | res_content

const Dashboard = (props) => {
    // Fetch Resources related to only the user's domain from the domain_resources tables
    const [session, setSession] = useState(null);
    const [domain, setDomain] = useState(props.domain);
    const [resources, setResources] = useState(null);

    useEffect(() => {
        // Get current session
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            // Get authenticated users domain 
            if (data.session) {
                const userId = data.session.user.id;
                const { data: userData, error } = await supabase
                    .from('profiles')
                    .select('domain')
                    .eq('id', userId)
                    .single();
                if (error) {
                    console.error("Error fetching user domain:", error);
                }   
                else {
                    console.log("User domain fetched successfully:", userData);
                    setDomain(userData.domain);
                }
            }   

        };

        getSession();

        // Listen for changes (login, logout, token refresh)
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // Cleanup
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);


    if (resources == null) {
        const fetchResources = async () => {
            const { data: resData, error: error } = await supabase
                .from('domain_resources')
                .select('*')
                .eq('domain_name', String.toString(domain));
            if (error) {
                console.error("Error fetching resources:", error);
            }
            else {
                console.log("Resources fetched successfully:", resData);
                setResources(resData);
                console.log("Final:", resources);
            }
        }
        fetchResources();
    }
    
    return (
        <>
            <div className="container">
                <h1 className="text-bold my-3">Dashboard</h1>
                <p>Welcome to the Dashboard page. </p>
                {resources ? (
                    <div>
                        <h2>Resources for {domain} Domain</h2>
                        <ul className="list-group my-4">
                            {resources.map((res) => (
                                <li key={res.id} className="list-group-item mb-3">
                                    <h5>{res.res_title}</h5>
                                    <p>{res.res_content}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Loading resources...</p>
                )}
            </div>
        </>
    )
}
export default Dashboard;