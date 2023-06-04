import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { UseWalletProvider } from './context/wallet/WalletContext';
import { UseSpinnerProvider } from './context/loaderContext/globalSpinnerContext';
import { UseSkeletonProvider } from './context/skeletoncontext/skeletoncontext';
import "./i18n/i18n"
import { Web3ReactProvider } from '@web3-react/core'
// import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider, connector) {
  return 'web3.js' // this will vary according to whether you use e.g. ethers or web3.js
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
    <UseSkeletonProvider>
    <UseSpinnerProvider>
      <UseWalletProvider>
        <Suspense fallback="...is loading">
          <App />
        </Suspense>
      </UseWalletProvider>
    </UseSpinnerProvider>
    </UseSkeletonProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
