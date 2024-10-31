"use client"

import { useState } from "react";
import {  toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Feedback() {
    
    const email = process.env.NEXT_PUBLIC_EMAIL_FEEDBACK;

    const [formData, setFormData] = useState({
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!formData.subject || !formData.message) {
        toast.error("Please fill in all fields.");
        return;
        }
        
        // Simulate sending email
        window.open(`mailto:${email}?subject=${formData.subject}&body=${formData.message}`);
    };

    return (
    <section className="max-w-3xl md:mx-auto mx-4 bg-white border border-gray-200 rounded-lg shadow-md my-8">
      <div className='w-full bg-gradient-to-r from-slate-600 to-slate-800 text-white px-2 py-2 rounded-t-lg'>
        <h3 className=" font-semibold tracking-wide italic text-center">Feedback / Contact Form</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">

        {/* Subject */}
        <div className="flex flex-col">
          <label htmlFor="subject" className="text-lg font-medium mb-1">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="" disabled defaultValue>Select your option</option>
            <option value="feedback">Feedback</option>
            <option value="feature">Feature Request</option>
            <option value="bug">Bug Report</option>
          </select>
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-lg font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="px-3 py-2 h-32 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 resize-none"
            placeholder="Enter your message here"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
