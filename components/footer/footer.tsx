export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="py-3 border-t border-t-stone-200">
            <div className="container">
                <div className="text-center">
                    <p className="text-sm font-normal">
                        &copy; {currentYear} Haider. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
