import React from 'react'

const HomePage = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src="/image/carousel0.jpg" alt="First slide"/>
                    <div className="carousel-caption">
                        <h1 className="display-2">BOOK MANAGMENT</h1>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="/image/carousel1.jpg" alt="Second slide"/>
                    <div className="carousel-caption">
                        <h1 className="display-2">BOOK MANAGMENT</h1>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="/image/carousel2.jpg" alt="Third slide"/>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default HomePage