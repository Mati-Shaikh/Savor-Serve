import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const reviewItems = [
    {
      logo: "/google.svg",
      company: "Google",
      importance: "Efficiency",
      quote: "Data structures are the backbone of our search algorithms.",
    },
    {
      logo: "/amazon.svg",
      company: "Amazon",
      importance: "Scalability",
      quote:
        "Our recommendation system relies heavily on optimized data structures.",
    },
    {
      logo: "/spotify.svg",
      company: "Spotify",
      importance: "Organization",
      quote:
        "Efficient playlists and music discovery powered by smart data structures.",
    },
    {
      logo: "/uber.svg",
      company: "Uber",
      importance: "Speed",
      quote:
        "Real-time routing made possible through advanced data structures.",
    },
    {
      logo: "/insta.svg",
      company: "Instagram",
      importance: "Performance",
      quote:
        "Billions of photos organized and served using optimized data structures.",
    },
  ];

  return (
    <div className="mx-auto px-4 py-16 mt-8 text-center bg-white-100 overflow-x-hidden">
      <h2 className="text-3xl font-bold mb-12">
        Discover the Power of Data Structures in Tech and Daily Life
      </h2>
      <Slider {...settings}>
        {reviewItems.map((item, index) => (
          <div key={index} className="px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 h-64 flex flex-col justify-between">
              <div>
                <img
                  src={item.logo}
                  alt={item.company}
                  className="h-12 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{item.company}</h3>
                <p className="text-blue-600 font-bold mb-2">
                  {item.importance}
                </p>
              </div>
              <p className="text-sm italic">&quot;{item.quote}&quot;</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="mt-12">
        <p className="text-xl font-semibold mb-4">
          Join thousands learning data structures on Structify
        </p>
        <div className="flex justify-center items-center space-x-4">
          <div className="flex items-center">
            <span className="text-yellow-400 text-2xl mr-2">★★★★★</span>
            <span className="text-sm">4.8/5 on App Store</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400 text-2xl mr-2">★★★★★</span>
            <span className="text-sm">4.9/5 on Google Play</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
