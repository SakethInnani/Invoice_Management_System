import { legacy_createStore } from "redux";
import invoiceReducer from "./reducers/invoiceReducer";

const store = legacy_createStore(invoiceReducer);

export default store;