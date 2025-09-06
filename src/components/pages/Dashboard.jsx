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


                    if (resources == null) {
                        const fetchResources = async () => {
                            const { data: resData, error: error } = await supabase
                                .from('domain_resources')
                                .select('*')
                                .eq('domain_name', domain);
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
    }, [domain]);



    return (
        <>
            <div className="container">
                <h1 className="text-bold my-3">Dashboard</h1>
                <p>Welcome to the Dashboard page. </p>
                <h2>Resources for {domain} Domain</h2>
                {resources ? (
                    <div>



                        <div class="accordion" id="accordionExample">
                            {/* Map through resources and create an accordion item for each */
                            resources.map((res, index) => (
                                <div class="accordion-item mb-3" key={index}>
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                            {res.res_title}
                                        </button>
                                    </h2>
                                    <div id={`collapse${index}`} class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <strong>{res.res_content}</strong>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>

                    </div>
                ) : (
                    <p>Loading resources...</p>
                )}
            </div>
        </>
    )
}
export default Dashboard;