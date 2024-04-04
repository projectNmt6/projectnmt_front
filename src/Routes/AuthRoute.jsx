import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import HomePage from "../pages/HomePage";

function AuthRoute(props) {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/main/write" element={<DonationPageboard />} />
            </Routes> 
        </>
    );
}

export default AuthRoute;