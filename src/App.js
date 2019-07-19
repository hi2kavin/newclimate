import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import {isLogged} from './actions/userAction'
import {connect} from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component{
  componentWillMount(){
    
    this.props.dispatch(isLogged())
  }
  render(){
  return (
    <div>
      <ToastContainer autoClose={2500}/>
        <SearchBar />
    </div>
  );
}
}
function mapStateToProps(state)
{
  return {islog:state.userReducer.islog}
}
export default connect(mapStateToProps)(App)