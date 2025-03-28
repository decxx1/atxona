import {
	initTooltips
} from 'flowbite';
import { useEffect } from 'react';
export default function LangSelector({scrolled, langLinks, tooltipId,  currentLocale}) {
    useEffect(() => {
        initTooltips();
    }, [])
    return (
        <>
        <div className={`${scrolled ? "hidden" : "" } animate-fade flex justify-end gap-4 lg:gap-2 max-lg:py-3`}>
            {currentLocale !== 'es' &&
                <>
                    <a href={langLinks.es} data-tooltip-target={"tooltip-spanish"+tooltipId} data-tooltip-placement="bottom" type="button">
                        <img src="/images/lang/esp.svg" alt="Spanish Flag" loading="lazy" className="w-6 md:w-7 lg:w-8 cursor-pointer hover:drop-shadow-lg hover:scale-105" />
                    </a>
                    <div id={"tooltip-spanish"+tooltipId} role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-tertiary rounded-lg shadow-sm opacity-0 tooltip">
                        Español
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </>
            }
            {currentLocale !== 'en' &&
                <>
                    <a href={langLinks.en} data-tooltip-target={"tooltip-english"+tooltipId} data-tooltip-placement="bottom" type="button">
                        <img src="/images/lang/eng.svg" alt="Spanish Flag" loading="lazy" className="w-6 md:w-7 lg:w-8 cursor-pointer hover:drop-shadow-lg hover:scale-105 border border-white/70 rounded-full" />
                    </a>
                    <div id={"tooltip-english"+tooltipId} role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-tertiary rounded-lg shadow-sm opacity-0 tooltip">
                        English
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </>
            }
            {currentLocale !== 'pt' &&
                <>
                    <a href={langLinks.pt} data-tooltip-target={"tooltip-portuguese"+tooltipId} data-tooltip-placement="bottom" type="button">
                        <img src="/images/lang/pt.svg" alt="Spanish Flag" loading="lazy" className="w-6 md:w-7 lg:w-8 cursor-pointer hover:drop-shadow-lg hover:scale-105" />
                    </a>
                    <div id={"tooltip-portuguese"+tooltipId} role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-tertiary rounded-lg shadow-sm opacity-0 tooltip">
                        Português
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </>
            }
        </div>
        </>
    )
            
}