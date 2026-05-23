import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";

type FormData = {
  fullname: string;
  email: string;
  subject: string;
  message: string;
};

type FormField = "fullname" | "email" | "subject" | "message";

const INITIAL_FORM_DATA: FormData = {
  fullname: "",
  email: "",
  subject: "",
  message: "",
};

const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY ?? "";

const TEMPLATE_KEY = import.meta.env.VITE_TEMPLATE_KEY ?? "";

const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY ?? "";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  const [error, setError] = useState<string>("");

  const [success, setSuccess] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const fieldName = e.target.name as FormField;

    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const validateForm = (): boolean => {
    const trimmedData = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (
      !trimmedData.fullname ||
      !trimmedData.email ||
      !trimmedData.subject ||
      !trimmedData.message
    ) {
      setError("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedData.email)) {
      setError("Invalid email address.");
      return false;
    }

    return true;
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess(false);

    const isValid = validateForm();

    if (!isValid) return;

    setLoading(true);

    try {
      await emailjs.send(
        SERVICE_KEY,
        TEMPLATE_KEY,
        {
          fullname: formData.fullname.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        },
        PUBLIC_KEY,
      );

      setSuccess(true);

      setFormData(INITIAL_FORM_DATA);
    } catch (err: unknown) {
      console.error("EmailJS Error:", err);

      setError("✕ Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="
        min-h-screen
        text-white
        px-4
        sm:px-6
        md:px-10
        lg:px-20
        py-20
        relative
        overflow-hidden
        flex
        items-center
        justify-center
      "
    >
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 blur-[130px] rounded-full" />

      {/* Main Container */}
      <div className="w-full max-w-5xl relative z-10">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <p
            className="
              text-blue-400
              uppercase
              tracking-[5px]
              sm:tracking-[7px]
              text-[11px]
              sm:text-xs
              mb-4
              font-semibold
            "
          >
            GET IN TOUCH
          </p>

          <h2
            className="
              text-3xl
              sm:text-5xl
              lg:text-6xl
              font-bold
              tracking-tight
              leading-tight
            "
          >
            Contact <span className="text-blue-400">Me</span>
          </h2>

          <p
            className="
              text-gray-400
              text-sm
              sm:text-base
              mt-4
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            Have a project idea, collaboration, or just want to say hello? Feel
            free to send me a message.
          </p>

          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6 rounded-full" />
        </div>

        {/* Form Card */}
        <div className="w-full flex justify-center">
          <form
            onSubmit={submitHandler}
            className="
              w-full
              max-w-3xl
              bg-white/[0.04]
              border
              border-white/10
              rounded-[2rem]
              p-5
              sm:p-8
              md:p-10
              backdrop-blur-2xl
              shadow-[0_10px_50px_rgba(0,0,0,0.35)]
              space-y-5
              transition-all
              duration-300
            "
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="fullname"
                placeholder="Your Name"
                value={formData.fullname}
                onChange={changeHandler}
                className="
                  w-full
                  bg-white/[0.03]
                  border
                  border-white/10
                  rounded-xl
                  px-4
                  py-3.5
                  text-sm
                  sm:text-base
                  text-white
                  placeholder:text-gray-500
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-400
                  focus:bg-white/[0.05]
                  focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]
                  hover:border-white/20
                "
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={changeHandler}
                className="
                  w-full
                  bg-white/[0.03]
                  border
                  border-white/10
                  rounded-xl
                  px-4
                  py-3.5
                  text-sm
                  sm:text-base
                  text-white
                  placeholder:text-gray-500
                  outline-none
                  transition-all
                  duration-300
                  focus:border-blue-400
                  focus:bg-white/[0.05]
                  focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]
                  hover:border-white/20
                "
                required
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={changeHandler}
              className="
                w-full
                bg-white/[0.03]
                border
                border-white/10
                rounded-xl
                px-4
                py-3.5
                text-sm
                sm:text-base
                text-white
                placeholder:text-gray-500
                outline-none
                transition-all
                duration-300
                focus:border-blue-400
                focus:bg-white/[0.05]
                focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]
                hover:border-white/20
              "
              required
            />

            {/* Message */}
            <textarea
              rows={5}
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={changeHandler}
              className="
                w-full
                bg-white/[0.03]
                border
                border-white/10
                rounded-xl
                px-4
                py-3.5
                text-sm
                sm:text-base
                text-white
                placeholder:text-gray-500
                outline-none
                resize-none
                transition-all
                duration-300
                focus:border-blue-400
                focus:bg-white/[0.05]
                focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]
                hover:border-white/20
              "
              required
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                sm:w-auto
                px-8
                py-3.5
                rounded-xl
                bg-gradient-to-r
                from-blue-500
                to-indigo-500
                text-white
                font-semibold
                text-sm
                sm:text-base
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-[0_10px_30px_rgba(59,130,246,0.35)]
                active:scale-[0.98]
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:scale-100
              "
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* Success */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3">
                <p className="text-green-400 text-sm sm:text-base font-medium text-center">
                  ✓ Message sent successfully. I’ll get back to you soon.
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm sm:text-base font-medium text-center">
                  {error}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
