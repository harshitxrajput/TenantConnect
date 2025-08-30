import { Routes, Route, Navigate } from "react-router-dom"
import LoginSignupPage from "./pages/auth/LoginSignupPage"
import Homepage from "./pages/Homepage"
import SearchPage from "./pages/SearchPage"
import ProfilePage from "./pages/ProfilePage"
import useAuthStore from "./store/useAuthStore"


const App = () => {
    const { isLoading, authUser } = useAuthStore();
    console.log(authUser);
    return (
        <div>
            <Routes>
                <Route path="/signup" element={<LoginSignupPage />} />

                <Route path="/" element={authUser ? <Homepage /> : <Navigate to={"/signup"} />} />

                <Route path="/search" element={<SearchPage />} />

                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/signup"} />} />
            </Routes>
        </div>
  )
}

export default App
