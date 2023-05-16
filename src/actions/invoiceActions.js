import {  EDIT_INVOICE, VIEW_INVOICE, DELETE_INVOICE,PS,INC,DEC } from './invoiceTypes';
// different actions related to invoice list
export const changeState=(newInvoice)=>{
  return {
    type: PS,
    payload: newInvoice
  };
}

export const increment=(noOfinvoices)=>{
  return{
    type:INC,
    payload: noOfinvoices
  };
}
export const decrement=(noOfinvoices)=>{
  return{
    type:DEC,
    payload: noOfinvoices
  };
}
export const editInvoice = (invoiceNumber,invoice) => {
  return {
    type: EDIT_INVOICE,
    payload: {invoiceNumber,invoice}
  };
};

export const viewInvoice = (invoiceId) => {
  return {
    type: VIEW_INVOICE,
    payload: invoiceId
  };
};

export const deleteInvoice = (invoiceId) => {
  return {
    type: DELETE_INVOICE,
    payload: invoiceId
  };
};
