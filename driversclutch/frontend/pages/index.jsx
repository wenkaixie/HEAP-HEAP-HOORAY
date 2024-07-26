import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './page.css';
import { BiLogIn } from "react-icons/bi";
import { IoCalendarOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaStar } from 'react-icons/fa';

const HomePage = () => {
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

    const testimonials = [
        {
            text: "When I first started my lessons, I always felt that driving was a huge hurdle, until I was fortunate enough to have Lian Huat Ng as my instructor and always looked forward to having him for my classes. He gave a lot of reassurance and gradually with each class and his guidance, I got a lot more confident in my driving and am proud to credit my passing to him. Will always recommend if anyone can specially book or request for him, you driving learning journey would definitely be a smooth one.",
            author: "Sherilyn, 3A, 5 May 2024",
            rating: 5
        },
        {
            text: "I had a great experience learning with DriversClutch. The instructors were very professional and made the learning process enjoyable. I passed my driving test on the first attempt thanks to their excellent guidance!",
            author: "John, 3, 12 April 2024",
            rating: 5
        },
        {
            text: "DriversClutch made it so easy to schedule and reschedule lessons. The online resources were extremely helpful in preparing for the theory test. Highly recommend!",
            author: "Emily, 3A, 8 March 2024",
            rating: 4
        },
        {
            text: "The instructors at DriversClutch are very knowledgeable and patient. They tailored the lessons to my learning pace, which made me feel comfortable and confident behind the wheel.",
            author: "Michael, 3A, 25 February 2024",
            rating: 5
        },
        {
            text: "Fantastic service! The booking process was seamless and the instructors were top-notch. I would recommend DriversClutch to anyone looking to learn how to drive.",
            author: "Sarah, 3, 15 January 2024",
            rating: 4
        }
    ];

    const nextTestimonial = () => {
        setCurrentTestimonialIndex((currentTestimonialIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonialIndex((currentTestimonialIndex - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextTestimonial();
        }, 5000); // Rotate testimonials every 5 seconds
        return () => clearInterval(interval);
    }, [currentTestimonialIndex]);

    return (
        <main className='main'>
            <header className='header'>
                <div className='logo'>
                    <img src="/assets/logo_black.png" alt="DriversClutch" />
                </div>
                <div className='authLinks'>
                    <Link href="/login">
                        <div className='login-container'>
                            <BiLogIn className='login-icon' />
                            <span>Login</span>
                        </div>
                    </Link>
                </div>
            </header>
            <div className='hero'>
                <div className='heroImage'>
                    <img src="/assets/landing_page.jpg" alt="Driving" />
                </div>
                <div className='heroText'>
                    <h1>
                        Learn how to drive <em>easier</em> with <span className='boldText'>DriversClutch!</span>
                    </h1>
                </div>
            </div>
            
            <section className='features'>
                <h2>Our Features</h2>
                <div className='featureList'>
                    <div className='feature feature1'>
                        <IoCalendarOutline className='calendar-icon' />
                        <h3>Book Lessons</h3>
                        <p>Book driving lessons <em><strong>easily</strong></em> and manage your schedule with <em><strong>flexibility</strong></em>.</p>
                    </div>
                    <div className='feature feature2'>
                        <IoNewspaperOutline className='paper-icon' />
                        <h3>Theory Practices</h3>
                        <p>Practice driving theory with our <em><strong>comprehensive</strong></em> resources.</p>
                    </div>
                    <div className='feature feature3'>
                        <MdOutlinePeopleAlt className='people-icon' />
                        <h3>Private Instructors Information</h3>
                        <p><em><strong>Find</strong></em> and <em><strong>connect</strong></em> with our private driving instructors.</p>
                    </div>
                </div>
            </section>
           
            <section className='testimonials'>
                <h2>Testimonials</h2>
                <div className='testimonial-container'>
                    <div className='testimonial'>
                        <p>{testimonials[currentTestimonialIndex].text}</p>
                        <div>
                            {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                                <FaStar key={i} color="#ffd700" />
                            ))}
                        </div>
                        <span className='author'>{testimonials[currentTestimonialIndex].author}</span>
                    </div>
                    <div className='testimonial-buttons'>
                        <button className="prev-button" onClick={prevTestimonial}>Back</button>
                        <button className="next-button" onClick={nextTestimonial}>Next</button>
                    </div>
                </div>
            </section>
            <section className='info-sections'>
                <div className='info-container'>
                    <h2>Background</h2>
                    <p>
                        The private driving industry in Singapore is fragmented and inefficient. Students struggle to find reliable instructors and resources, while instructors find it difficult to manage schedules and communicate with students.
                    </p>
                </div>
                <div className='info-container'>
                    <h2>Mission</h2>
                    <p>
                        DriversClutch aims to streamline the learning process for both students and instructors by providing a one-stop platform for <em><strong>scheduling</strong></em>, <em><strong>resources</strong></em>, and <em><strong>communication</strong></em>.
                    </p>
                </div>
                <div className='info-container'>
                    <h2>Vision</h2>
                    <p>
                        Our vision is to create a seamless learning environment for driving in Singapore, and allow our students to get their licence <em><strong>efficiently</strong></em>.
                    </p>
                </div>
            </section>
            <footer className='footer'>
                <p>Created by:</p>
                <p>Wenkai, Zu Wei, Yuan Qi, Yi Chi, Sheng Wei</p>
            </footer>
        </main>
    );
}

export default HomePage;
