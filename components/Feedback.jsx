// components/Feedback.jsx

"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

export default function Feedback({ serviceId, templateId, publicKey }) {
  const formRef = useRef();

  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formElements = formRef.current.elements;
    if (!formElements.subject.value || !formElements.user_email.value || !formElements.message.value) {
      toast({
        variant: "destructive",
        description: "Please fill in all fields.",
      })
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        () => {
          toast({
            variant: "success",
            description: "Email sent successfully!",
          })
          formRef.current.reset();
        },
        (error) => {
          console.error("Failed to send email:", error);
          toast({
            variant: "destructive",
            description: "Failed to send email.",
          })
        }
      );
  };

  return (
    <section className="max-w-3xl md:mx-auto mx-4 bg-white border border-gray-200 rounded-lg shadow-md my-8">
      <div className="w-full bg-gradient-to-r from-slate-600 to-slate-800 text-white px-2 py-2 rounded-t-lg">
        <h3 className="font-semibold tracking-wide italic text-center">
          Feedback / Contact Form
        </h3>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 p-4">
        {/* Subject */}
        <div className="flex flex-col">
          <label htmlFor="subject" className="text-lg font-medium mb-1">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="Feedback">Feedback</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Bug Report">Bug Report</option>
          </select>
        </div>

        {/* User Email */}
        <div className="flex flex-col">
          <label htmlFor="user_email" className="text-lg font-medium mb-1">
            E-Mail
          </label>
          <input
            id="user_email"
            name="user_email"
            type="email"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your email here"
            required
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-lg font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
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
