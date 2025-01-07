import { json, redirect } from '@remix-run/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';







const HomePage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng); // Use the i18n instance from useTranslation hook
  };

  useEffect(() => {
    const isRTL = ['ar', 'he'].includes(i18n.language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [i18n.language]);
  

  return (
    <div>
      <h1>{t('home')}</h1>
      {/* Dropdown list for language selection */}
      <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>
  );
};

export default HomePage;


