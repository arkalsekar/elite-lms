import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Navbar(props) {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("Error logging out:", error.message);
        }
        else {
            console.log("User logged out successfully");
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Elite LMS</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link `${isAboutActive}`" to="/About">About</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>


                        </ul>

                        {
                            props.isAuth ? <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                                :
                                <>
                                    <Link className="btn btn-success mx-2" to="/Register"> Register </Link>
                                    <Link className="btn btn-primary mx-2" to="/Login">Login</Link> </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

