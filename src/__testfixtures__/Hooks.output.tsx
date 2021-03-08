import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

const SiteHeader = () => {
  const { t } = useTranslation();
  const [text] = useState('');
  return <span>{t('my_simple_text')}</span>;
};

export default SiteHeader;
