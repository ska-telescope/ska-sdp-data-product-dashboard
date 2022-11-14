import { configure } from '@testing-library/react';
import '@testing-library/jest-dom';

configure();

jest.mock(`react-i18next`, () => ({
  useTranslation: () => ({
    t: str => str
  })
}));
