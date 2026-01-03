import { useLoaderData, useNavigation, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaShippingFast, FaLock, FaHeadset, FaUndo, FaStar, FaQuoteLeft } from "react-icons/fa";

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
    <div className="home-page bg-base-100 text-base-content overflow-x-hidden">
      
     
      <section className="relative h-[550px] flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white overflow-hidden">
      
         <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         
         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm mb-4"
            >
               📚 The #1 Digital Library Platform
            </motion.span>
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            >
              Discover Your Next <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">Great Adventure</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Join a community of book lovers. Explore, review, and manage your personal library with ease.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/all-books" className="btn btn-primary btn-lg border-none bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition-transform">
                Explore Library
              </Link>
              <Link to="/register" className="btn btn-outline btn-lg text-white hover:bg-white hover:text-black transition-colors">
                Join for Free
              </Link>
            </motion.div>
         </div>
      </section>

      <ScrollStats />

      <section className="py-20 px-6 md:px-16 bg-base-100">
        <div className="text-center mb-12" data-aos="fade-up">
           <h2 className="text-4xl font-bold mb-3">Latest Arrivals</h2>
           <p className="text-base-content/60 max-w-2xl mx-auto">Fresh from the press! Check out the newest additions to our collection.</p>
        </div>

        {data.length > 0 ? (
          <Swiper
            data-aos="fade-up"
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {data.slice(0, 8).map((book) => (
              <SwiperSlide key={book._id}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">No books available at the moment.</p>
        )}
      </section>

      <section className="py-20 px-6 md:px-16 bg-base-200">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-3">Why Readers Love Us</h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <div className="bg-base-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center group" data-aos="fade-up" data-aos-delay="0">
                <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
                  <FaShippingFast />
                </div>
                <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
                <p className="text-sm text-base-content/70">Get your physical copies delivered to your doorstep within 24 hours.</p>
             </div>
             <div className="bg-base-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center group" data-aos="fade-up" data-aos-delay="100">
                <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
                  <FaLock />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Payment</h3>
                <p className="text-sm text-base-content/70">100% secure payment gateways to ensure your data stays safe.</p>
             </div>
             <div className="bg-base-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center group" data-aos="fade-up" data-aos-delay="200">
                <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
                  <FaUndo />
                </div>
                <h3 className="text-xl font-bold mb-3">Easy Returns</h3>
                <p className="text-sm text-base-content/70">Not satisfied? Return the book within 7 days, no questions asked.</p>
             </div>
             <div className="bg-base-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 text-center group" data-aos="fade-up" data-aos-delay="300">
                <div className="w-16 h-16 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
                  <FaHeadset />
                </div>
                <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                <p className="text-sm text-base-content/70">Our dedicated support team is always here to assist you.</p>
             </div>
          </div>
      </section>

      <section className="py-20 px-6 md:px-16" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center mb-12">Explore Top Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: "Sci-Fi", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
            { name: "Romance", img: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&q=80" },
            { name: "Mystery", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80" },
            { name: "Fantasy", img: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=400&q=80" },
            { name: "Self-Help", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80" },
            { name: "History", img: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80" },
          ].map((item, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl aspect-square bg-gray-900 cursor-pointer">
               <img 
                 src={item.img} 
                 alt={item.name} 
                 className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition duration-500" 
               />
               <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition">
                 <span className="text-white text-xl font-bold tracking-wider">{item.name}</span>
               </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 bg-base-200">
         <h2 className="text-4xl font-bold text-center mb-12">Featured Authors</h2>
         <div className="flex flex-wrap justify-center gap-10">
            {[
              { name: "J.K. Rowling", role: "Fantasy Writer", img: "https://i.pravatar.cc/150?img=1" },
              { name: "Stephen King", role: "Horror Master", img: "https://i.pravatar.cc/150?img=3" },
              { name: "Agatha Christie", role: "Mystery Queen", img: "https://i.pravatar.cc/150?img=5" },
              { name: "George R.R.", role: "Epic Fantasy", img: "https://i.pravatar.cc/150?img=11" },
            ].map((author, idx) => (
              <div key={idx} className="flex flex-col items-center group" data-aos="zoom-in" data-aos-delay={idx * 100}>
                 <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-base-100 shadow-lg mb-4 group-hover:ring-4 ring-indigo-500 transition">
                    <img src={author.img} alt={author.name} className="w-full h-full object-cover" />
                 </div>
                 <h4 className="text-lg font-bold">{author.name}</h4>
                 <p className="text-sm text-base-content/60">{author.role}</p>
              </div>
            ))}
         </div>
      </section>

      <section className="py-20 px-6 md:px-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
         <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">Reader's Reviews</h2>
            <p className="opacity-80">See what our community has to say.</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah J.", text: "Book Haven changed how I organize my reading. Absolutely love the interface!", rating: 5 },
              { name: "Michael D.", text: "The collection here is vast and finding my favorite genres is super easy.", rating: 5 },
              { name: "Emily R.", text: "A must-have platform for any bookworm. The community features are great.", rating: 4 },
            ].map((review, idx) => (
               <div key={idx} className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20" data-aos="fade-up" data-aos-delay={idx * 100}>
                  <FaQuoteLeft className="text-4xl opacity-30 mb-4" />
                  <p className="text-lg mb-6 italic">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                        {review.name.charAt(0)}
                     </div>
                     <div>
                        <h4 className="font-bold">{review.name}</h4>
                        <div className="flex text-yellow-400 text-sm">
                           {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto">
         <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
         <div className="space-y-4">
            {[
              { q: "How do I add a book to my collection?", a: "Simply navigate to the 'Add Book' page from your dashboard and fill in the details." },
              { q: "Is Book Haven free to use?", a: "Yes! Creating an account and managing your library is completely free." },
              { q: "Can I review books?", a: "Absolutely. You can leave ratings and reviews on any book detail page." },
              { q: "How can I contact support?", a: "You can reach us via the contact form below or email us directly." },
            ].map((item, idx) => (
              <div key={idx} className="collapse collapse-plus bg-base-200 rounded-xl" data-aos="fade-up">
                <input type="radio" name="my-accordion-3" defaultChecked={idx === 0} /> 
                <div className="collapse-title text-xl font-medium">
                  {item.q}
                </div>
                <div className="collapse-content"> 
                  <p className="text-base-content/70">{item.a}</p>
                </div>
              </div>
            ))}
         </div>
      </section>

      <section className="py-20 px-6 md:px-16">
         <div className="bg-base-300 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Stay in the Loop</h2>
              <p className="text-lg opacity-70 mb-8 max-w-2xl mx-auto">Subscribe to our newsletter for the latest book releases, author interviews, and exclusive community events.</p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                 <input type="email" placeholder="Enter your email" className="input input-lg w-full rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                 <button className="btn btn-lg btn-primary rounded-full px-10">Subscribe</button>
              </form>
              <p className="text-sm opacity-50 mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
         </div>
      </section>

      <section className="py-20 px-6 md:px-16 bg-base-100 text-center" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-8">About Book Haven</h2>
        <p className="max-w-4xl mx-auto text-lg text-base-content/70 leading-relaxed">
          Welcome to The Book Haven, your ultimate destination for all things literary! 
          Our platform is dedicated to connecting passionate readers with an extensive collection of books 
          from various genres, authors, and publishers. We believe that books have the power to inspire, 
          educate, and entertain. Whether you are a lifelong reader, a student, or simply looking for 
          your next great read, our carefully curated collection ensures that there is something for everyone.
        </p>
      </section>

    </div>
  );
};

export default Home;