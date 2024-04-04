import React from 'react';
import { Link } from 'react-router-dom';

function HomePage(props) {
    return (
        <div>
            <h1>기부 홈</h1>
            <Link to={'/main'}>메인페이지</Link>
        </div>
    );
}

export default HomePage;