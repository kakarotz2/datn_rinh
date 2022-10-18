import React from 'react'
import Header from './../components/Header/Header'
import Footer from '../components/Footer/Footer'
function NotFound() {
    return (
        <div>
            <Header />
            <div className="container">
                <p style={{fontSize:"1.2rem",fontWeight:"bold"}}>Not Found</p>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound
