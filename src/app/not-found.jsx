import React from "react";
import error from "../app/assets/images/404/404.png"
import Image from "next/image";
const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="text-center text-white p-8 bg-white rounded-lg shadow-xl max-w-lg mx-auto">
                <div className="mb-6">
                    <Image
                        src={error}
                        alt="404 illustration"
                        className="w-[200px] rounded-3xl m-[auto]"
                    />
                </div>
                <p className="text-xl mb-6">Oops! Something went wrong.</p>
                <p className="text-lg text-gray-700 mb-8">
                    We can't find the page you're looking for. But don’t worry, you can always return to the homepage!
                </p>
                <a
                    href="/"
                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition duration-300"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
};

export default NotFoundPage;
