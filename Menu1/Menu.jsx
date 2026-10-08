export const Menu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((open) => !open);
    const isOpen = isMenuOpen ? "open" : "";

    return (
        <>
        <button className={`burger ${isOpen}`} onClick={toggleMenu}></button>
        <div className={`background ${isOpen}`}></div>
        <div className={`menu ${isOpen}`}>
            <nav>
                {links.map((link, index) => (
                    <link
                    key={link}
                    to={link}
                    className={isMenuOpen ? "appear" : ""}
                    style={{ animationDelay: `0.${index + 1}s`}} onClick={() => setIsMenuOpen(false)}>
                        {link}
                        </link>
                ))}
            </nav>
            <main className={`content ${isOpen}`}>
                <Outlet />
            </main>
        </div>
        </>
    );
};