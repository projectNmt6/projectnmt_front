import './App.css';
import AuthRoute from './Routes/AuthRoute';
import { Route, Routes } from 'react-router-dom';
import { getPrincipalRequest } from './apis/api/principal';
import { useQuery } from 'react-query';
import MyPage from './pages/MyPage/MyPage';
import TeamCreatePage from './pages/TeamCreatePage/TeamCreatePage';

function App() {
  const principalQuery = useQuery(["principalQuery"], getPrincipalRequest,{//focus 변경정로도
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: response => {
        console.log("onSuccess");
        
    },
    onError: error => {
        console.log("오류");
        console.log(error);
    }
});

  return (
    <>
       <AuthRoute />
    </>
  );
}

export default App;