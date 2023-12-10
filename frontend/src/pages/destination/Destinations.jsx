import React from 'react';
import './Destinations.scss';
import shingrilla from '../../Images/shingrilla.jpg';
import video1 from '../../Videos/shriglla.mp4';
import MountainV from '../../Images/MountainV.jpg';
import video3 from '../../Videos/MountainV.mp4';
import Mashbrum from '../../Images/M.jpg';
import video2 from '../../Videos/Mashabrum.mp4';
import kallisto from '../../Images/kallisto.jpg';
import video4 from '../../Videos/royal.mp4';

 // Provide the actual video paths
import Navbar from '../../components/navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    name: 'Shingrilla Hotel Skardu',
    image: shingrilla,
    description:
      'Shingrilla Hotel is a beautiful town in Pakistan and is known for its stunning landscapes, including mountains, lakes, and valleys.',
    video: video1,
  },
  {
    id: 2,
    name: 'Mashbrum Hotel Skardu',
    image: Mashbrum,
    description:
      'Mashbrum Hotel is a picturesque town in Pakistan, offering breathtaking views and a peaceful atmosphere.',
    video: video2,
  },
  {
    id: 3,
    name: 'Mountain View Hotel Skardu',
    image: MountainV,
    description:
      'Mountain View is a historic town in Pakistan, famous for its ancient architecture and cultural heritage.',
    video: video3,
  },
  {
    id: 4,
    name: 'Kallisto Hotel Skardu',
    image: kallisto,
    description:
      'Kallisto Hotel  is a serene village in Pakistan with lush green landscapes and a tranquil environment.',
   video: video4,
  },
];

const DestinationList = () => {
  return (
    <div>
      <Navbar />

      <div className="destination-list">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination">
            <img src={destination.image} alt={destination.name} />
            <hr />
            <h2>{destination.name}</h2>
            <hr />
            <p>{destination.description}</p>
          </div>
        ))}

        {destinations.map((destination) => (
          <div key={destination.id} className="destination">
            <video width="320" height="240" controls>
              <source src={destination.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <img src={destination.image} alt={destination.name} />
            <hr />
            <h2>{destination.name}</h2>
            <hr />
            <p>{destination.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationList;
