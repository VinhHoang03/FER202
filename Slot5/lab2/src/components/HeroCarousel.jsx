import React from 'react';
import { Carousel } from 'react-bootstrap';
import { banners } from '../data/listOfBanners';
// import './HeroCarousel.css';

function HeroCarousel() {
    return (
        <div className="hero-carousel-wrapper">
            <Carousel fade={true} interval={3000} pause="hover">
                {banners.map((banner, index) => (
                    <Carousel.Item key={index}>
                        <div className="carousel-image-container">
                            <img
                                className="d-block w-100 carousel-image-animated"
                                src={banner.image}
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                        <Carousel.Caption>
                            <h3>{banner.title}</h3>
                            <p>{banner.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="carousel-overlay"></div>
        </div>
    );
}

export default HeroCarousel;