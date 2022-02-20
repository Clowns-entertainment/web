import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { IntlProvider } from 'react-intl';

const locale = navigator.language;

async function loadLocalizedMessages(locale: string): Promise<any> {
  switch (locale) {
    case 'ru':
    case 'ru-RU':
      return import('./messages/compiled/ru.json');
    default:
      return import('./messages/compiled/en.json');
  }
}
loadLocalizedMessages(locale).then((messages) => {
  ReactDOM.render(
    <React.StrictMode>
      <IntlProvider messages={messages} locale={locale} defaultLocale="en">
        <App />
      </IntlProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
