import Navbar from './components/Navbar'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Leaderboard from './components/pages/Leaderboard'
import Dashboard from './components/pages/Dashboard'
import { supabase } from './supabaseClient'
import { useState, useEffect } from 'react'
import Profile from './components/pages/Profile'

function App() {
  const [session, setSession] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get current session
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      // Get authenticated users domain 
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

  if (session) {  
    if (!isAuthenticated) {
      setIsAuthenticated(true);
    }
  } else {
    if (isAuthenticated) {
      setIsAuthenticated(false);
    }
  }

  return (
    <>
    <Navbar isAuth={isAuthenticated} />
        {/* <div>
     {session ? (
        <h2>Welcome, {session.user.id}</h2>
      ) : (
        <h2>Please login</h2>
      )}
    </div> */}

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About isAboutActive={true}/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
