export const Home = () => {
    return (
        <>
            <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>We are a Company</p>
                        <h1>Welcome to Tanish Enterprises</h1>
                        <p>Together we make the difference. Our Core Values includes Integrity, Diversity and Resillience.</p>

                        <div className="btn btn-group">
                            <a href="/contact"><button className="btn">Connect Now</button></a>
                            <a href="/services"><button className="btn btn-secondary">Learn more</button></a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="./images/home.png" alt="" width={400} height={500} />
                    </div>
                </div>
            </section>
            <section className="section-analytics">
                <div className="container grid grid-four-cols">
                    <div className="div1">
                        <h2>50+</h2>
                        <p>Registered Companies</p>
                    </div>
                    <div className="div1">
                        <h2>10,000+</h2>
                        <p>Happy Clients</p>
                    </div>
                    <div className="div1">
                        <h2>500+</h2>
                        <p>Well Known Developers</p>
                    </div>
                    <div className="div1">
                        <h2>24/7</h2>
                        <p>Service</p>
                    </div>
                </div>
            </section>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-image">
                        <img src="./images/design.png" alt="" width={400} height={500} />
                    </div>

                    <div className="hero-content">
                        <p>We are here to help you</p>
                        <h1>Get Started Today</h1>
                        <p>We offer comprehensive digital services including web design, UI/UX design, app development, and web
                            development. Our expertise spans visually captivating websites, intuitive user interfaces, feature-rich 
                            mobile apps, and tailored web solutions. <br/> We would love to hear from you. Drop a message.</p>
                        <div className="btn btn-group">
                            <a href="/contact"><button className="btn">Connect Now</button></a>
                            <a href="/services"><button className="btn btn-secondary">Learn more</button></a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}