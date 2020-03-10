import React, { Component } from "react";
import "../App.css";
import Axios from "axios";
import { Card, Row, Col , Button} from "react-bootstrap";
import { withRouter, Link} from "react-router-dom";
import StarRating from "../components/rate";
class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    Axios({
      method: "get",
      url:
        "https://api.themoviedb.org/3/trending/all/day?api_key=7fe26f747001d020e92fed615ac69b70"
    }).then(res => {
      this.setState({ data: res.data.results });
    });
  }

  render() {
    const datas = this.state.data;
    return (
        <div className='cardsMovie'>
          <Row >
            {datas.map((data, index) => {
              const star = data.vote_average;
              return (
                <Col xs={12} lg={4} md={4} sm={12} key={index}>
                <Card  className="gridFilm">
                  <Card.Img
                    variant="top"
                    src={
                      `https://image.tmdb.org/t/p/w500_and_h282_face` +
                      data.poster_path
                    }
                    style={{width:'100%', height:'100%'}}
                  />
                    <div className="details fadeIn">
                        <div className='componentBtn'>
                        <p className='title'>
                      {data.title ? data.title.substr(0,25):'???'}
                      </p>
                      <Link to={"/movieDetail/" + data.id} className='linkBtn'> <Button variant="outline-light" >
                         Sinopsis
                          </Button>
                          </Link>
                          <Link to={"/movieTrailer/" + data.id} className='linkBtn'> 
                            <Button variant="outline-light" >Trailer</Button>
                            </Link>
                     
                        </div>
                        <div className='cornerBtn'><span>+</span></div>
        </div>
                  <Card.Footer>
                      <div className='foot'>
                      <p className='title'>
                      {data.title ? data.title.substr(0,25):'???'}
                      </p>
                      <p className='text'> 
                      {data.overview.substring(0, 30) + ".."}  </p>
                      <div className='cardFoo'>
                  <StarRating rating={star} />  <span>{data.vote_average}</span>
                  </div>
                      </div>
           </Card.Footer>
                </Card>
                </Col>
              
              );
            })}
          </Row>
            </div>
       
      
    );
  }
}

export default withRouter(Cards);
