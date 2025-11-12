import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="home-page">
      {/* Banner Section */}
      <section className="banner bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white h-[500px] flex flex-col justify-center items-center relative overflow-hidden">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-center mb-6"
        >
          Welcome to The Book Haven
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-lg text-center mb-8 max-w-xl"
        >
          Explore, Add, and Manage Your Favorite Books in one beautiful digital library.
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex gap-4"
        >
          <Link
            to="/all-books"
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded hover:bg-indigo-100 transition"
          >
            All Books
          </Link>
          <Link
            to="/add-book"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
          >
            Create Book
          </Link>
        </motion.div>
      </section>

      {/* Latest Books Section */}
      <section className="latest-books py-16 px-6 md:px-16">
        <h2 data-aos="zoom-in-up" className="text-3xl text-black font-bold text-center mb-10">
          Latest Books
        </h2>

        <Swiper
          data-aos="zoom-in-up"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          <SwiperSlide>
            <div className="book-card p-4 bg-white rounded shadow hover:scale-105 transition">
              <div className="h-60 bg-gray-200 rounded mb-4 overflow-hidden">
                <img src="/images/book1.jpg" alt="Book One" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl text-black font-semibold mb-2">Book One</h3>
              <p className="text-gray-600">Author One</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="book-card p-4 bg-white rounded shadow hover:scale-105 transition">
              <div className="h-60 bg-gray-200 rounded mb-4 overflow-hidden">
                <img src="/images/book2.jpg" alt="Book Two" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl text-black font-semibold mb-2">Book Two</h3>
              <p className="text-gray-600">Author Two</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="book-card p-4 bg-white rounded shadow hover:scale-105 transition">
              <div className="h-60 bg-gray-200 rounded mb-4 overflow-hidden">
                <img src="/images/book3.jpg" alt="Book Three" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl text-black font-semibold mb-2">Book Three</h3>
              <p className="text-gray-600">Author Three</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="book-card p-4 bg-white rounded shadow hover:scale-105 transition">
              <div className="h-60 bg-gray-200 rounded mb-4 overflow-hidden">
                <img src="/images/book4.jpg" alt="Book Four" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl text-black font-semibold mb-2">Book Four</h3>
              <p className="text-gray-600">Author Four</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Top Genres Section */}
      <section className="top-genres py-16 px-6 md:px-16 bg-gray-100" data-aos="zoom-in-up">
        <h2 className="text-3xl font-bold text-center text-black mb-10">Top Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="genre-card text-black p-4 bg-white rounded shadow hover:scale-105 transition text-center">
            Fantasy
          </div>
          <div className="genre-card text-black p-4 bg-white rounded shadow hover:scale-105 transition text-center">
            Mystery
          </div>
          <div className="genre-card text-black p-4 bg-white rounded shadow hover:scale-105 transition text-center">
            Romance
          </div>
          <div className="genre-card text-black p-4 bg-white rounded shadow hover:scale-105 transition text-center">
            Non-Fiction
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about py-16 px-6 md:px-16" data-aos="zoom-in-up">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">About The Book Haven</h2>
        <p className="text-center max-w-3xl mx-auto text-gray-700">
          The Book Haven is your ultimate digital library. Add, explore, and manage books seamlessly with an intuitive UI and dynamic experience.
        </p>
      </section>
    </div>
  );
};

export default Home;
