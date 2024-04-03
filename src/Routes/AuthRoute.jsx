import { Route, Routes } from "react-router-dom";
import DonationPageboard from "../pages/DonationPageBoard/DonationPageboard";

function AuthRoute(props) {
    
    // const principalQuery = useQuery(["principalQuery"], getPrincipalRequest, 
    // {
    //     retry: 0,
    //     refetchOnWindowFocus: false,
    //     onSuccess: response => {
    //         console.log("onSuccess");
    //         console.log(response);
    //     },
    //     onError: error => {
    //         console.log("오류");
    //         console.log(error);
    //     }
    // });

    return (
        <>
            <Routes>
                <Route path="/main/write" element={<DonationPageboard />} />
            </Routes> 
        </>
    );
}

export default AuthRoute;
