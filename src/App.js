import { Global } from '@emotion/react';
import AuthRoute from './Routes/AuthRoute';
import { GlobalStyles } from './Routes/GlobalStyles';

function App() {

  return (
    <>
     <Global styles={GlobalStyles} /> 
       <AuthRoute />
    </>
  );
}

export default App;