import React, { Component } from "react";
import "../App.css";
import CardsPlay from "../components/cardsNowPlay";
import CardsNew from "../components/cardsNew";
import CardsSoon from "../components/cardsSoon";
import CardsPopular from "../components/cardsPopular";
import Cards from "../components/cards";
// import { Card, Row, Col } from "react-bootstrap";
// import Footer from "../components/footer";
// import { withRouter, Link } from "react-router-dom";
// import StarRating from "../components/rate";

export default class MyTabs extends Component {
    constructor() {
      super();
      
      this._handleTabChange = this._handleTabChange.bind(this)
    }
    
    _handleTabChange(index) {
      console.log('Selected tab index', index);
    }
  
    render() {
      return (
        <TabPanel onTabChange={this._handleTabChange}>
          <div title="New">
          <CardsNew/>
          </div>
          <div title="In Cinema">
          <CardsPlay/>
          </div>
          <div title="Coming Soon">
          <CardsSoon/>
          </div>
          <div title="Popular">
          <CardsPopular/>   
          </div>
          <div title="More">
           <Cards/>
          </div>
        </TabPanel>
      );
    }
  }
  
  class TabPanel extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedTabIndex: props.children.length === 0 ? null : 0
      };
  
      this._handleClick = this._handleClick.bind(this);
    }
  
    _handleClick(index) {
      this.setState({
        selectedTabIndex: index
      });
      
      this.props.onTabChange(index);
    }
  
    _renderTabs() {
      let tabs = [];
      
      for (let i = 0; i < this.props.children.length; i++) {
        tabs.push(
          <Tab 
            key={`tab-${i}`}
            label={this.props.children[i].props.title}
            index={i}
            isSelected={i === this.state.selectedTabIndex}
            onClick={this._handleClick} />
        );
      }
  
      return tabs;
    }
    
    _renderTabContent() {
      return this.props.children[this.state.selectedTabIndex].props.children;
    }
  
    render() {
      if (this.state.selectedTabIndex == null) {
        return 'nope';
      }
      
      return (
        <div className="tabpanel">
          <div className="tabheader">
           
            {this._renderTabs()} </div>
          
          <div className="tabcontent">
            {this._renderTabContent()}
          </div>
        </div>
     );
    }
  }
  
  class Tab extends Component {
    constructor(props) {
      super(props);
  
      this._handleClick = this._handleClick.bind(this);
    }
  
    _handleClick() {
      this.props.onClick(this.props.index);
    }
  
    render() {
      const tabClassName = this.props.isSelected ? 'tab tab--selected' : 'tab';
  
      return (
        <span className={tabClassName} onClick={this._handleClick}>
          <span className="tab__label">{this.props.label}</span>
        </span>
      );
    }
  }
  
  