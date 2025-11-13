import { useLoaderData, useNavigation } from "react-router-dom";
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
import BookCard from "../../components/BookCard";
import ScrollStats from "../../components/ScrollStats";
import Loading from "../../Pages/Loading/Loading"; 

const Home = () => {
  const data = useLoaderData() || []; 
  const navigation = useNavigation(); 

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  if (navigation.state === "loading") {
    return <Loading />;
  }

  return (
    <div className="home-page bg-base-100 text-base-content">
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
          Explore, Add, and Manage Your Favorite Books in one beautiful digital
          library.
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

      <ScrollStats />

      {/* Latest Books Section */}
      <section className="latest-books py-16 px-6 md:px-16">
        <h2
          data-aos="zoom-in-up"
          className="text-3xl font-bold text-center mb-10"
        >
          Latest Books
        </h2>

        {data.length > 0 ? (
          <Swiper
            data-aos="zoom-in-up"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={5}
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
            {data.slice(0, 5).map((book) => (
              <SwiperSlide key={book._id}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-base-content/70">
            No books available yet.
          </p>
        )}
      </section>

      {/* Top Genres Section */}
      <section
        className="top-genres py-16 px-6 md:px-16 bg-base-200"
        data-aos="zoom-in-up"
      >
        <h2 className="text-3xl font-bold text-center mb-10">Top Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="genre-card p-4 bg-base-100 rounded shadow hover:scale-105 transition text-center">
            Fantasy
          </div>
          <div className="genre-card p-4 bg-base-100 rounded shadow hover:scale-105 transition text-center">
            Mystery
          </div>
          <div className="genre-card p-4 bg-base-100 rounded shadow hover:scale-105 transition text-center">
            Romance
          </div>
          <div className="genre-card p-4 bg-base-100 rounded shadow hover:scale-105 transition text-center">
            Non-Fiction
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about py-16 px-6 md:px-16">
        <h2 data-aos="zoom-in-up" className="text-3xl font-bold text-center mb-10">
          About The Book Haven
        </h2>
        <p data-aos="zoom-in-up" className="text-center max-w-3xl mx-auto text-base-content/70">
          Welcome to The Book Haven, your ultimate destination for all things
          literary! Our platform is dedicated to connecting passionate readers
          with an extensive collection of books from various genres, authors,
          and publishers. <br /> At The Book Haven, we believe that books have the
          power to inspire, educate, and entertain. Whether you are a lifelong
          reader, a student, or simply looking for your next great read, our
          carefully curated collection ensures that there is something for
          everyone.
        </p>
      </section>
    </div>
  );
};

export default Home;
