'use client'
import { useState } from "react";
import Link from "next/link";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState({
        submitted: false,
        error: false,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setStatus({ submitted: false, error: false });

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus({ submitted: true, error: false });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ submitted: false, error: true });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus({ submitted: false, error: true });
        }
    };
    return (
        <div>
            <div className="mx-auto max-w-2xl py-1 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-70px font-bold mb-4 mt-10">
                        Contact Us
                    </h1>
                    <p className="mb-10 mx-auto w-1/2">
                        We greatly value engaging with our community, and we encourage you
                        to get in touch with us for any inquiries, comments, or feedback you
                        might have. Your input is important to us, and we look forward to
                        hearing from you!
                    </p>
                </div>


                {status.submitted ? (
                    <div className="text-center">
                        <div className="mb-4 text-[2rem] text-green">
                            Great!!! Email has been Successfully Sent. we will be get in touch asap.
                        </div>

                        <Link
                            href={"/"}
                            className="bg-primary hover:bg-darkpurple text-white py-3 px-7 rounded "
                        >
                            Back To Home
                        </Link>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-10">
                                <label className="" htmlFor="name">
                                    Full Name *
                                </label>
                                <input
                                    className="py-3 px-4 block w-full border-grey rounded-lg text-sm focus:border-primary border focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-10">
                                <label className="" htmlFor="email">
                                    Email address *
                                </label>
                                <input
                                    className="py-3 px-4 block w-full border-grey rounded-lg text-sm focus:border-primary border focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-12 relative mb-8">
                                <label className="" htmlFor="message">
                                    Message *
                                </label>
                                <textarea
                                    className="py-3 px-4 block w-full border-grey rounded-lg text-sm focus:border-primary border focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                    name="message"

                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <button
                                    className={` py-3 px-7 rounded ${formData.message === "" ? "bg-grey" : "bg-primary text-white"
                                        }`}
                                    type="submit"
                                    disabled={!(formData.name && formData.email && formData.message)}
                                >
                                    <span data-text="Submit">
                                        <span>Submit</span>
                                    </span>
                                </button>
                                {status.error && <p className="text-red">Sorry, there was an error sending your message. Please try again.</p>}
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Contact;
