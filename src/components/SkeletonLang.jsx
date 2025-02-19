export default function SkeletonLang({scrolled,currentLocale}){
    return (
        <div className={`${scrolled ? "hidden" : "" } flex justify-end gap-4 lg:gap-2 max-lg:py-3`}>
            {currentLocale !== 'es' &&
                <img src="/images/lang/esp.svg" alt="Spanish Flag" loading="lazy" className="w-6 md:w-7 lg:w-8 cursor-pointer hover:drop-shadow-lg hover:scale-105" />
            }
            {currentLocale !== 'en' &&
                <img src="/images/lang/eng.svg" alt="English Flag" loading="lazy" className="w-6 md:w-7 lg:w-8 cursor-pointer hover:drop-shadow-lg hover:scale-105 border border-white/70 rounded-full" />
            }
            {currentLocale !== 'pt' &&
                <img src="/images/lang/pt.svg" alt="Portuguese Flag" loading="lazy" className="w-6 md:w-7 lg:w-8 cursor-pointer hover:drop-shadow-lg hover:scale-105" />
            }
        </div>
    )
}