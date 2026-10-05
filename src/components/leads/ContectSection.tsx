"use client";

import Image from "next/image";
import { useState } from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [formStatus, setFormStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setFormStatus(null);

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Submission failed");
            }

            setFormStatus({
                type: "success",
                message: "Thank you! Our team will contact you shortly.",
            });

            setFormData({
                name: "",
                phone: "",
                email: "",
                service: "",
                message: "",
            });
        } catch (error) {
            setFormStatus({
                type: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="bg-white py-12 scroll-mt-24">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">

                {/* Left */}

                <div className="relative flex justify-center">

                    <div className="relative aspect-square w-full max-w-[650px] overflow-hidden rounded-full">
                        <Image
                            src="/leads/office.jpg"
                            alt="Office"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="absolute bottom-0 right-5 flex h-64 w-64 flex-col items-center justify-center rounded-full border border-[#1F295A] bg-white shadow-xl">

                        <h3 className="mb-4 text-3xl font-semibold">
                            Follow Us
                        </h3>

                        <div className="flex gap-5 text-2xl">
                            <FaFacebookF className="text-blue-600" />
                            <FaXTwitter />
                            <FaInstagram className="text-pink-600" />
                            <FaLinkedinIn className="text-blue-700" />
                            <FaYoutube className="text-red-600" />
                        </div>

                    </div>

                </div>

                {/* Right */}

                <div>

                    <h1 className="text-4xl font-bold leading-tight">
                        Where Dreams Become Reality!
                    </h1>

                    <p className="mt-2 text-lg text-gray-600">
                        Have an idea that's ready to take shape? Let's turn it into reality.
                    </p>

                    <p className="mb-5 text-lg text-gray-600">
                        Connect with us, and let's start the journey!
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        {formStatus && (
                            <div
                                className={`rounded-xl px-4 py-3 text-sm ${
                                    formStatus.type === "success"
                                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                        : "bg-red-50 text-red-700 border border-red-200"
                                }`}
                                role="status"
                            >
                                {formStatus.message}
                            </div>
                        )}
                        <input
                            name="name"
                            required
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-b border-[#1F295A] py-2 outline-none"
                        />

                        <input
                            name="phone"
                            required
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border-b border-[#1F295A] py-2 outline-none"
                        />

                        <input
                            name="email"
                            required
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-b border-[#1F295A] py-2 outline-none"
                        />

                        <select
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full border-b border-[#1F295A] py-2 outline-none"
                        >
                            <option value="">Select Service</option>
                            <option>Web Development</option>
                            <option>Mobile App Development</option>
                            <option>UI / UX Design</option>
                            <option>Digital Marketing</option>
                        </select>

                        <textarea
                            name="message"
                            rows={3}
                            placeholder="Write Message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full resize-none border-b border-[#1F295A] py-3 outline-none"
                        />

                        {/* hCaptcha Placeholder */}

                        <div className="flex h-24 w-[320px] items-center gap-4 rounded border border-gray-300 bg-gray-100 px-5">
                            <input
                                type="checkbox"
                                className="h-7 w-7 cursor-pointer accent-[#D49A34]"
                            />

                            <span className="text-lg text-gray-700">
                                I am a Human
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-5 text-3xl font-semibold"
                        >
                            {loading ? "Submitting..." : "Submit"}

                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D49A34] text-white">
                                <ArrowUpRight size={24} />
                            </span>

                        </button>

                    </form>

                </div>

            </div>
        </section>
    );
}