import english from '@/i18n/locales/en.json';
import spanish from '@/i18n/locales/es.json';
import portuguese from '@/i18n/locales/pt.json';

const LANG = {
	ENGLISH: 'en',
	SPANISH: 'es',
    PORTUGUESE: 'pt',
};

export const getI18N = ({
	currentLocale = 'es',
}: {
	currentLocale: string | undefined;
}) => {
	switch (currentLocale) {
        case LANG.ENGLISH:
            return { ...spanish, ...english };
        case LANG.PORTUGUESE:
            return { ...spanish, ...portuguese };
        default:
            return spanish;
    }
};