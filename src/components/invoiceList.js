// Code to add additional functionality to the given invoiceForm, this includes list of invoices and operations to perform on them i.e. add,edit,delete or view an invoice

import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement, editInvoice, viewInvoice, deleteInvoice, changeState } from '../actions/invoiceActions';
import InvoiceForm from './InvoiceForm';
class InvoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices:[{
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
      editForm:false,
      viewForm:false,
      noOfinvoices:0
   
    }
    this.changeParent=this.changeParent.bind(this);
    this.displayFormFunc=this.displayFormFunc.bind(this);
    this.editFormFunc=this.editFormFunc.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
  }

//function logic for adding an invoice
  displayFormFunc = () => {
      
      this.setState({
          displayForm: !this.state.displayForm,
          editForm:false,
          initialBool: true
          
        })
        

  }
  changeParent=(newInvoice)=>{
    this.props.changeState(newInvoice);
    this.setState({
      noOfinvoices: this.state.noOfinvoices+1,
      displayForm: !this.state.displayForm
    })
    
  }
//function logic for viewing an invoice
  handleView = (invoiceId) => {
    this.props.viewInvoice(invoiceId)
    this.setState({
      viewForm: !this.state.viewForm
    })
    
  };

  //function logic for editing an invoice
  editFormFunc=()=>{
    this.setState({
      editForm: !this.state.editForm,
      initialBool:false
      
    })
    this.props.decrement(this.props.noOfinvoices)
  }
  handleEdit = (invoice) => {
    this.props.increment(this.props.noOfinvoices)
    this.props.editInvoice(invoice.invoiceNumber,invoice);
    this.setState({
      editForm: !this.state.editForm
    })
  };

  //function logic for deleting an invoice

  handleDelete = (invoiceId) => {
    this.props.deleteInvoice(invoiceId);
  };
  // React render
  render() {
    const { invoices } = this.props;
    return (
      <div>
        <h2>Invoice List</h2>
        {this.state.noOfinvoices === 0 ? (    //base condition for for no invoices
          <p>No invoices available.</p>
          
        ) : (
          <ul>                                
            {invoices.map((invoice) => (    //rendering as per requirement
              <li key={invoice.invoiceNumber}>
                <div>
                  <span>Date of Issue:&nbsp;&nbsp; {invoice.dateOfIssue}</span>
                  <br></br>
                  <span>Bill from:&nbsp; {invoice.billFrom}</span>
                  <br></br>
                  {(this.state.viewForm) && (
                  <div>
                    <span>Bill from Email:&nbsp; {invoice.billFromEmail}</span>
                    <br></br>
                    <span>Bill from Address:&nbsp; {invoice.billFromAddress}</span>
                    <br></br>
                  </div>
                )}
                  <span>Bill to:&nbsp; {invoice.billTo}</span>
                  <br></br>
                  {(this.state.viewForm) && (
                  <div>
                    <span>Bill To Email:&nbsp; {invoice.billToEmail}</span>
                    <br></br>
                    <span>Bill To Address:&nbsp; {invoice.billToAddress}</span>
                    <br></br>
                  </div>
                )}
                {(this.state.viewForm) && (
                  <div>
                    <span>Subtotal:&nbsp; {invoice.subTotal}</span>
                    <br></br>
                    <span>taxRate:&nbsp; {invoice.taxRate}</span>
                    <br></br>
                    <span>taxAmmount:&nbsp; {invoice.taxAmmount}</span>
                    <br></br>
                    <span>discountRate:&nbsp; {invoice.discountRate}</span>
                    <br></br>
                    <span>discountAmmount:&nbsp; {invoice.discountAmmount}</span>
                    <br></br>
                  </div>
                )}
                {(this.state.viewForm) && (
                  <div>
                    <span>currency:&nbsp;&nbsp; {invoice.currency}</span>
                  </div>
                )}
                  <span>Total:&nbsp;&nbsp; {invoice.total}</span>
                  <br></br>
                  <span>description: &nbsp;&nbsp; {invoice.notes}</span>
                  <br></br>
                </div>
                {/* buttons for different operations */}
                <button onClick={() => this.handleView(invoice.invoiceNumber)}>View</button>    
                <button onClick={this.editFormFunc}>{!this.state.editForm?"edit":null }</button>  
                {(this.state.editForm)&& (<InvoiceForm info={this.props} handleEdit={this.handleEdit}/>)}
                <button onClick={() => this.handleDelete(invoice.invoiceNumber)}>Delete</button>
              </li>
            ))}
          </ul>
        )
        
        }
        <button onClick={this.displayFormFunc}>{!this.state.displayForm?"Add New Invoice":"discard"}</button>
        {(this.state.displayForm)&& (<InvoiceForm info={this.props} changeParent={this.changeParent} />)}

      </div>
    );
  }
}

// mapping state and actions to props

const mapStateToProps = (state) => {
  
  return {invoices:state.invoices,
    displayForm: state.displayForm,
    initialBool:state.initialBool,
    noOfinvoices:state.noOfinvoices,
    editForm:state.editForm,
    viewForm:state.viewForm
  };
  
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: (newInvoice) => dispatch(changeState(newInvoice)),
    increment: (noOfinvoices) => dispatch(increment(noOfinvoices)),
    decrement: (noOfinvoices) => dispatch(decrement(noOfinvoices)),
    viewInvoice: (invoiceId) => dispatch(viewInvoice(invoiceId)),
    editInvoice: (invoiceNumber,invoice) => dispatch(editInvoice(invoiceNumber,invoice)),
    deleteInvoice: (invoiceId) => dispatch(deleteInvoice(invoiceId))
  };
};
//connecting to the store
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
