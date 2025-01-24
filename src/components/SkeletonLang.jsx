export default function SkeletonLang({scrolled}){
    return (
        <div className={`${scrolled ? "hidden" : "" } flex justify-end gap-4 lg:gap-2 max-lg:py-3`}>
            <img src="/images/lang/esp.svg" alt="Spanish Flag" loading="lazy" className="w-6 md:w-7 lg:w-8 cursor-pointer hover:drop-shadow-lg hover:scale-105" />
            <img src="/images/lang/eng.svg" alt="Spanish Flag" loading="lazy" className="w-6 md:w-7 lg:w-8 cursor-pointer hover:drop-shadow-lg hover:scale-105 border border-white/70 rounded-full" />
            <img src="/images/lang/pt.svg" alt="Spanish Flag" loading="lazy" className="w-6 md:w-7 lg:w-8 cursor-pointer hover:drop-shadow-lg hover:scale-105" />
        </div>
    )
}