import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';
import { Card, Row, Col,Button } from "react-bootstrap";
import { withRouter, Link} from "react-router-dom";

import Axios from "axios";
class Recomendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
 
  }
  componentDidMount() {
    const { match } = this.props;
    
    Axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=7fe26f747001d020e92fed615ac69b70`
    }).then(res => {
      this.setState({ data: res.data.results });
    });
  }
  render() {
    const datas = this.state.data;
    const settings = {
      dots: false,
      autoplay: true,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll:1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div >
        <Row style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        
          <Col
            xs={12} md={12} lg={12} sm={12}
          >
        {datas.length === 0 && (
          <div>
              <Card>
            no data
            </Card>
          </div>
        )}
        <Slider {...settings}>
        
          { datas.map((data, index) => {
            const star = data.vote_average;
                return ( 
                  <div key={index} className='cardRecomend'>
                  <Card>
                  <Card.Img
                    variant="top"
                    src={
                      `https://image.tmdb.org/t/p/w500_and_h282_face` +
                      data.poster_path
                    }
                   
                  />
                     <div className="details fadeIn">
                        <div className='componentBtn'>
                        <p className='title'>
                      {data.title ? data.title.substr(0,25):'???'}
                      </p>
                      <Link to={"/redirect-page/" + data.id} className='linkBtn'> <Button variant="outline-light" >
                         Sinopsis
                          </Button>
                          </Link>
                          <Link to={"/redirect-page-movie/" + data.id} className='linkBtn'> 
                            <Button variant="outline-light" >Trailer</Button>
                            </Link>
                        </div>
                         </div>
                  <Card.Footer>
                      <div className='foot'>
                      <p className='title'>
                      {data.title ? data.title.substr(0,25):'???'} 
                      </p>
                      <p className='text2'> 
                      {data.overview.substring(0, 30) + ".."}  </p>
                      </div>
           </Card.Footer>
                </Card>
                </div>
                )
              })}
             
        </Slider>
              </Col>
        </Row>
      </div>
    );
  }
}


export default withRouter(Recomendation);
