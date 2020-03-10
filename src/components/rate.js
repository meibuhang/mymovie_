import React, { Component } from "react";
import "../App.css";

export default class Rating extends Component {
   constructor (props) {
      super(props);
      this.state = {
        rating: props.rating
      };
      
      this.updateRating = this.updateRating.bind(this);
    }
    
    updateRating (rating) {
      if (this.state.rating === rating) {
        this.setState({
          rating: 0
        });
      } else {
        this.setState({
          rating
        });
      }
    }
    
    render () {
      let markup = [];
      const rating = this.props.rating;
      let star;
      if (rating>=8.5 ){
         star=5;
      }else if (rating>=7.5 && rating<8.5){
         star = 4;
      } else if(rating>6.5 && rating<7.5){
         star=3;
      }else if(rating>5 && rating<=6.5){
         star=2;
      }else if(rating<5) {
         star=1;
      }
      for (let i=0; i<5; i++) {
        markup.push(
          <RatingStar rating={star} isSet={i<star} updateRating={this.updateRating} key={i} />
        );  
      }
      
      return (
        <div>
          {markup}
        </div>
      );
    }
  }
 
 Rating.defaultProps = {
   rating: 0,
   totalStars: 5
 };
 
 class RatingStar extends React.Component {
   constructor (props) {
     super(props);
     this.state = {};
     this.updateRating = this.updateRating.bind(this);
   }
   
   updateRating () {
     this.props.updateRating(this.props.rating);
   }
   
   render () {
     let cssClasses = 'star';
     if (this.props.isSet) {
       cssClasses += ' set'
     }
     
     return (
       <svg className={cssClasses} width="25px" height="25px">
         <path d="m55,237 74-228 74,228L9,96h240" transform='scale(0.10)' />
       </svg>
     );
   }
 }
 
 
 