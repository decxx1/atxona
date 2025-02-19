import { useState, useEffect } from 'react';
import SkeletonLang from '@/components/SkeletonLang.jsx';
import { getI18N } from "@/i18n";

export default function Header({currentLocale, navLinks, langLinks}){
    const [ scrolled, setScrolled ] = useState(false);
    const [ isMobile, setIsMobile ] = useState(false);
    const [ showNavMobile, setShowNavMobile ] = useState(false);
    const [LangSelector, setLangSelector] = useState(null);
    const [currentUrl, setCurrentUrl] = useState('');

    const i18n = getI18N({ currentLocale });
    useEffect(() => {
        setCurrentUrl(window.location.pathname);
        //importar LangSelector en el cliente
        const cargarComponente = async () => {
            const modulo = await import('@/components/LangSelector');
            setLangSelector(() => modulo.default);
        };
      
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const handleScroll = () => {
            setScrolled(window.scrollY > 188.5);
        };

        const handleMediaChange = (e) => {
            setIsMobile(!e.matches);
        };

        // Initial setup
        if (mediaQuery.matches) {
            setIsMobile(false);
        } else {
            setIsMobile(true);
        }
        handleScroll();
        cargarComponente();
        // Attach listeners
        window.addEventListener("scroll", handleScroll);
        mediaQuery.addEventListener("change", handleMediaChange);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            mediaQuery.removeEventListener("change", handleMediaChange);
        };
    }, []);

    const handleMenuMobile = () => {
        setShowNavMobile(!showNavMobile);   
    }
    const classNav = () => {
        if (!isMobile) {
            return '';
        }

        if(scrolled){
            return 'max-lg:top-28';
        }else {
            return 'max-lg:top-36';
        }
    }
    const classNavLink = (url) => {
        if (url === currentUrl) {
            return 'font-bold';
        }
    }
    return (
        <>
        <header className={`${scrolled ? "lg:py-4 max-lg:pt-6" : "lg:py-8"}  fixed top-0 z-50 w-full bg-white pb-6 transition-all duration-300 ease-in-out`}>
            <div className="container mx-auto flex flex-col px-6 lg:px-0">
                {/* Fila superior: Íconos de idiomas */}
                { LangSelector ?
                    <LangSelector scrolled={scrolled} langLinks={langLinks} tooltipId="1" currentLocale={currentLocale} />
                    : <SkeletonLang scrolled={scrolled} currentLocale={currentLocale} />
                }
                {/* Fila principal: Logo y Navegación */}
                <div className={`flex items-center justify-between`}>
                    {/* Logo */}
                    <a href={navLinks.index}>
                        <img src="/images/logos/atxona.svg" alt="Logo Atxona" className={`${scrolled ? "lg:w-56" : "xl:w-72" } hover:drop-shadow-lg w-56 md:w-64 transition-all duration-300`} />
                    </a>
                    
                    <svg onClick={() => handleMenuMobile()} className={`lg:hidden w-16 text-textLogo hover:text-white rounded hover:bg-tertiary p-2 cursor-pointer`}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75M2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8m6 4.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75" clipRule="evenodd"/></svg>
                    
                    {/* Navegación */}
                    <nav className={`${showNavMobile ? "" : "max-lg:hidden"} ${classNav()} max-lg:absolute max-lg:text-white max-lg:left-0 max-lg:bg-tertiary max-lg:w-full max-lg:flex max-lg:flex-col max-lg:px-8 max-lg:py-8 max-lg:z-50 text-xl lg:text-base xl:text-xl font-normal uppercase lg:flex gap-4 transition-all duration-300`}>
                        {
                            (isMobile && scrolled) ? (
                                
                                <div className="animate-fade flex justify-center items-center gap-4 mb-2">
                                    { LangSelector ?
                                        <LangSelector scrolled={false} langLinks={langLinks} tooltipId="2" currentLocale={currentLocale} />
                                        : <SkeletonLang scrolled={false} currentLocale={currentLocale} />
                                    }
                                </div>
                            ) : null
                        }
                        <a href={navLinks.about} className={`${classNavLink(navLinks.about)} animate-fade hover:font-bold hover:scale-90 transition-all duration-200`}>{i18n.navBar.about}</a>
                        <a href={navLinks.production} className={`${classNavLink(navLinks.production)} animate-fade hover:font-bold hover:scale-90 transition-all duration-200`}>{i18n.navBar.production}</a>
                        <a href={navLinks.services} className={`${classNavLink(navLinks.services)} animate-fade hover:font-bold hover:scale-90 transition-all duration-200`}>{i18n.navBar.services}</a>
                        <a href={navLinks.marketing} className={`${classNavLink(navLinks.marketing)} animate-fade hover:font-bold hover:scale-90 transition-all duration-200`}>{i18n.navBar.marketing}</a>
                        <a href={navLinks.contact} className={`${classNavLink(navLinks.contact)} animate-fade hover:font-bold hover:scale-90 transition-all duration-200`}>{i18n.navBar.contact}</a>
                    </nav>
                </div>
            </div>
        </header>
    </>
    )
}


