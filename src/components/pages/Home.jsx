import { Link } from "react-router-dom";

const Home = () => {   
    return (
        <div>
            <h1>Welcome to Home Page</h1>   

            <Link to="/about">Go to About Page</Link>
            <br />
            <Link to="/contact">Go to Contact Page</Link>
        </div>
    );
}

export default Home;