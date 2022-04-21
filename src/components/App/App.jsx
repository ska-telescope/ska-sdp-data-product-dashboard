import React, { Suspense } from 'react';
import './App.scss';
import ExampleComponent from '../ExampleComponent/ExampleComponent';
import i18n from '../../services/i18n/i18n';

function App() {
  const handleOnclick = e => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Suspense fallback="...is loading">
      <div className="App">
        <div>
          <button value="af" onClick={handleOnclick} type="submit">
            Afrikaans
          </button>
          <button value="en" onClick={handleOnclick} type="submit">
            English
          </button>
        </div>
        <ExampleComponent id="exampleComponentId" />

        <a
          className="App-link"
          href="https://reactjs.org"
          id="appLinkId"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </Suspense>
  );
}

export default App;
