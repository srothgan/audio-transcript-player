// feedback/page.jsx

import Feedback from "@/components/Feedback";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function FeedbackPage() {
  // Fetch environment variables securely on the server side
  const emailServiceId = process.env.EMAILJS_SERVICE_ID;
  const emailTemplateId = process.env.EMAILJS_TEMPLATE_ID;
  const emailPublicKey = process.env.EMAILJS_PUBLIC_KEY;

  return (
    <div>
      <ToastContainer autoClose={2000} />
      <Feedback
        serviceId={emailServiceId}
        templateId={emailTemplateId}
        publicKey={emailPublicKey}
      />
    </div>
  );
}
