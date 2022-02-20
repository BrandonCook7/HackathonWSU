import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from './apolloClient';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';


ReactDOM.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
