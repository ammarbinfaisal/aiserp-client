/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                beige: "#ece0ce",
                burlywood: "#e3d5c0",
                blue: "#0b0c0d",
            },
            container: {
                center: true,
                padding: "2rem",
            },
        },
    },
    plugins: [],
};
