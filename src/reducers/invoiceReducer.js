import {  EDIT_INVOICE, VIEW_INVOICE, DELETE_INVOICE,PS,INC, DEC } from '../actions/invoiceTypes';
// Defining the initial State
const initialState = {
    invoices: [{
      currency: '$',
      currentDate: '',
      invoiceNumber: 0,
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billFrom: '',
      billFromEmail: '',
      billFromAddress: '',
      notes: '',
      total: '0.00',
      subTotal: '0.00',
      taxRate: '',
      taxAmmount: '0.00',
      discountRate: '',
      discountAmmount: '0.00',
      items: [{id: 0,
        name: '',
        description: '',
        price: '1.00',
        quantity: 1}]
      }],
    displayForm: false,
      initialBool:true,
    currentInvoice: null,
    noOfinvoices:0,
    viewForm:false,
    editForm: false,
    
    
  };
  const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
      case INC: // increments the counter
        state.noOfinvoices= state.noOfinvoices+1;
        return{
          ...state
        }
        case DEC: // increments the counter
          state.noOfinvoices= state.noOfinvoices-1;
          return{
            ...state
          }
      case PS:  // adding an invoice to the list
        state.initialBool=false
        state.invoices[state.noOfinvoices]=action.payload;
        state.invoices[state.noOfinvoices].invoiceNumber=state.noOfinvoices+1;
        state.noOfinvoices= state.noOfinvoices+1;
        state.displayForm= !state.displayForm;
        return{
          ...state
          
        }
      case EDIT_INVOICE:  // editing the invoice
        state.initialBool=true;
        const x=action.payload.invoiceNumber;
        state.invoices[x]=action.payload.invoice;
        return {
          ...state,
        };
      case VIEW_INVOICE:  //display the invoice
          
        return {
          ...state,
          viewForm:true
        };
      case DELETE_INVOICE:  //deleting the invoice
        return {
          
          ...state,
          noOfinvoices:state.noOfinvoices-1,
          displayForm: !state.displayForm,
          invoices:state.invoices.filter(invoice => invoice.invoiceNumber !== action.payload)
        };
      default:  //default case
        return state;
    }
  };
  
  export default invoiceReducer;
  