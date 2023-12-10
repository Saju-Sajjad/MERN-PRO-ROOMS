import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel';

const CarouselComponent = () => {
  return (
    <Carousel>
      <div>
        <img src="image1.jpg" alt="Image 1" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="image2.jpg" alt="Image 2" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="image3.jpg" alt="Image 3" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
}

export default CarouselComponent;
