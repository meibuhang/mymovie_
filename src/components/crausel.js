import React, { Component } from "react";
import Axios from "axios";
import { Carousel, Row, Col } from "react-bootstrap";
import "../App.css";
import { withRouter,Link } from "react-router-dom";
import Header from "../components/header";
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
class Crausel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    Axios({
      method: "get",
      url:
        "https://api.themoviedb.org/3/movie/popular?api_key=7fe26f747001d020e92fed615ac69b70"
    }).then(res => {
      this.setState({ data: res.data.results });
    });
  }

  render() {
    const datas = this.state.data;

    return (
      <div>
        <Row style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        
          <Col
            xs={12} md={12} lg={12} sm={12}
          >
          
            <Carousel
              controls={false}
              indicators={false}
              className='carousel'
            >
             
              {datas.map((data, index) => {
                return (
                  <Carousel.Item key={index}>
                     <Header/>
                    <img
                      className="d-block w-100"
                      src={
                        `https://image.tmdb.org/t/p/w500_and_h282_face` +
                        data.poster_path
                      }
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <Row>
                      <Col xs={12} lg={12}  className='playbutton'>
                      <Link to={"/movieTrailer/" + data.id} className='linkBtnIcon'> 
                       <PlayCircleOutlineOutlinedIcon style={{fontSize:'10vw'}}/>
                       </Link>
                      <h4>{data.title.substring(0,30)}</h4>
                      <h6>{data.overview.substring(0,50)}</h6>
                      </Col>
                      </Row>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
         
          </Col>
        
        </Row>
      </div>
    );
  }
}


export default withRouter(Crausel);
