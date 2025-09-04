import { Routes, Route, Navigate } from "react-router-dom"
import LoginSignupPage from "./pages/auth/LoginSignupPage"
import Homepage from "./pages/Homepage"
import SearchPage from "./pages/SearchPage"
import ProfilePage from "./pages/ProfilePage"
import useAuthInitializer from "./hooks/useAuthInitializer"
import useAuthStore from "./store/useAuthStore"
import PropertyDetailsPage from "./pages/PropertyDetailsPage"


const App = () => {
    useAuthInitializer();
    const authUser = useAuthStore((state) => state.authUser);
    console.log(authUser);
    return (
        <div>
            <Routes>
                <Route path="/signup" element={!authUser ? <LoginSignupPage /> : <Navigate to={"/"} />} />

                <Route path="/" element={<Homepage />}/>

                <Route path="/search" element={<SearchPage />} />

                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/signup"} />} />

                <Route path="/property/:id" element={<PropertyDetailsPage />} />
            </Routes>
        </div>
  )
}

export default App
