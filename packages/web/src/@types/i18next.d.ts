// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import { AppTranslation } from '../types/app-translation';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'ns1';
    // custom resources type
    resources: {
      ns1: AppTranslation;
    };
    // other
  }
}
