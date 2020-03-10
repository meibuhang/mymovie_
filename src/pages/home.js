import React, { Component } from "react";
import Crausel from "../components/crausel";
import "../App.css";
import Footer from "../components/footer";
import MyTabs from "../components/tabs"
import { withRouter} from "react-router-dom";
class Home extends Component {

  render() {
    return (
      <div style={{background:'#0f0011'}}>
        <div className='contents'>
        <Crausel />
              <MyTabs/>
        <Footer />
        </div>
        </div>
    
      
    );
  }
}

export default withRouter(Home);
