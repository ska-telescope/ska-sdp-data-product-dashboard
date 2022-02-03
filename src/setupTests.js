import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

jest.mock(`react-i18next`, () => ({
  useTranslation: () => ({
    t: str => str
  })
}));
