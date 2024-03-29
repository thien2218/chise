/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
	},
	experimental: {
		images: {
			unoptimized: true,
		},
	},
};

module.exports = nextConfig;
