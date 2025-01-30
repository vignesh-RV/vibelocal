import React from 'react';

function Contact() {
  return (
    <div className="contact">
      <h1 className="contact__title">Contact Us</h1>
      <p className="contact__info">
        We would love to hear from you! If you have any questions, feel free to reach out.
      </p>

      {/* Contact Form Section */}
      <section className="contact__form">
        <h2>Get in Touch</h2>
        <form>
          <div className="contact__form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>
          <div className="contact__form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="contact__form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Your message" required></textarea>
          </div>
          <button type="submit" className="contact__submit">Send Message</button>
        </form>
      </section>

      {/* Location Section */}
      <section className="contact__location">
        <h2>Our Location</h2>
        <p>We are located at:</p>
        <address>
          No:42, New Colony 8th Street, Adambakkam, Chennai-600 088
        </address>
        <div className="contact__map">
          <iframe
            title="Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31085.23315104287!2d80.2090117!3d13.0475255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%20City%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1690889085046!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Contact Number Section */}
      <section className="contact__phone">
        <h2>Contact Number</h2>
        <p>You can also reach us by phone at:</p>
        <p className="contact__phone-number">+91 9843256872</p>
      </section>
    </div>
  );
}

export default Contact;
