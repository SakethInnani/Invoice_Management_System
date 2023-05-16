import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceList from './components/invoiceList';
import { Provider } from "react-redux";
import store from "./store";
import InvoiceForm from './components/InvoiceForm';

class App extends Component {
  render() {
  return (
    
    <Provider store={store}>
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        <InvoiceList initialdisplay={false} />
      </Container>
    </div>
    </Provider>
  );
}}

export default App;

