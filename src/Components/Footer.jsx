export default function Footer() {
    return (
        <footer className="bg-amber-500 text-white py-6">
            <div className="flex flex-col md:flex-row items-center justify-between px-6 gap-4 ">
                <div className="flex gap-4 text-2xl">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-facebook hover:text-blue-400 transition-colors"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-instagram hover:text-pink-400 transition-colors"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin hover:text-blue-300 transition-colors"></i>
                    </a>
                </div>

                <div className="text-lg text-black-300 text-center">
                    &copy; KhaaoPiyo Private Limited
                </div>

                <div className="flex gap-4 text-lg">
                    <a href="/privacy" className="hover:underline hover:text-gray-200">Privacy</a>
                    <a href="/terms" className="hover:underline hover:text-gray-200">Terms</a>
                </div>
            </div>
        </footer>
    );
}
