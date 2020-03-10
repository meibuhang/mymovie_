import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import "../App.css";
import { Button,Card, Col, Row, Image } from "react-bootstrap";
import Axios from "axios";
import Header from "../components/header";
import Recomendation from "../components/recomendation";
import Footer from "../components/footer";
import { withRouter } from "react-router";
import StarRating from "../components/rate";
import moment from "moment";
class Trailer extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      data: [],
      thevideo: [],
      genres: [],
      production_companies: [],
      playing: false
    };
  }  
  componentDidMount() {
    const { match } = this.props;
    Axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=7fe26f747001d020e92fed615ac69b70`
    }).then(res => {
      this.setState({ data: res.data });
      this.setState({ genres: res.data.genres });
      this.setState({ production_countries: res.data.production_countries });
      this.setState({ production_companies: res.data.production_companies });
    });
    Axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=7fe26f747001d020e92fed615ac69b70`
    }).then(res => {
      this.setState({ thevideo: res.data.results });
      
    });
  }
  handlePlay = () => {
    this.setState({playing: true});
  };
  
  handlePause = () => {
    this.setState({playing: false});
  };
  render () {
   const data = this.state.data;
    const x='';
    return (   <div  style={{background:'#0f0011'}}>
    <Header/>    
    <div className='contentDetailMovie' >
    <Card >
     <Row>
       <Col  xs={12} lg={12} md={12} sm={12}>
       <Card.Header as="h4" className='cardHeader'>
        {data.original_title}
      </Card.Header>
       </Col>
       <Col  xs={12} lg={8} md={8} sm={12}>
      <Card.Body style={{width:'100%'}}> 
      {this.state.thevideo.length === 0 && (
        <p>Upss Sorry</p>
      )
      }{
        this.state.thevideo[0]? console.log( this.state.thevideo[0].key) : ''
      }
       
       
       <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url={this.state.thevideo[0]?`https://www.youtube.com/watch?v=${this.state.thevideo[0].key}` : ""}
          width='100%'
          height='100%'
          playing={this.state.playing}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          controls={true}
        />
         
      </div>
         
       
     <Card.Header as='h6' className='cardHeader'>Overview</Card.Header>
     <Card.Body>
       <Card.Text>{data.overview}</Card.Text>
     </Card.Body>
</Card.Body>
       </Col>
       {/* start Description */}
       <Col xs={12} lg={4} md={4} sm={12}>
       <Card.Body style={{margin:'0 auto'}}>
       <Row>
          <Col style={{width:'100%', marginBottom:'3%'}}>
           <Card.Header as='h6' className='cardHeader'>Description </Card.Header>
              <Card.Body >
              <p>Name : {data.original_title}</p>
                    <p>Tag Line : {data.tagline}</p>
                    <p>Homepage : {data.homepage}</p>
                    <p>Status : {data.status}</p>
                    <p>Release Date : {String(moment(data.release_date)).substring(
                          0,
                          15
                        )}
                        </p>
                   <div className='cardFoo'> Countries : &nbsp; {!this.state.production_countries ? '' : this.state.production_countries.map((data, index) => {
                 return (
                   <div
                     key={index}
                   >
                     {data.iso_3166_1} &nbsp;
                   </div>
                 );
               }
             )}
             </div> 
                 <div className='cardFoo'>
                 Rating : &nbsp;
                    <StarRating rating={data.vote_average} />
                    <label className='vote'>{data.vote_average} / 10</label>
                 </div>
                    <div className='genre'>
                      <ul >
                    {!this.state.genres ? '' : this.state.genres.map((data, index) => {
                      return <li key={index} className='genreList' >#{data.name}</li>;
                    })}
                    </ul>
                    </div>
              </Card.Body>
          </Col>
          {/* End Description */}
 {/* start Company */}
 <Col xs={12} lg={12} md={12} sm={12}>
              <Card.Header as='h6' className='cardHeader'>Production Company</Card.Header>
                  {this.state.production_companies.map((data, index) => {
                    if (data.logo_path === null) {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <Image
                            src={`https://cdn.pixabay.com/photo/2015/09/02/12/45/movie-918655__340.jpg`}
                            thumbnail
                            style={{ maxWidth: "70px", margin: "10px" }}
                          />
                          <p>{data.name}</p>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <Image
                            src={
                              `https://image.tmdb.org/t/p/w500_and_h282_face` +
                              data.logo_path
                            }
                            thumbnail
                            style={{ maxWidth: "70px", margin: "10px" }}
                          />
                          <h6>{data.name}</h6>
                        </div>
                      );
                    }
                  })}
              </Col>
             {/* End Company */}
          </Row>
         </Card.Body>
         </Col>
     </Row>
     {/* Start review */}
      <Card.Body>
        {/* start maybe You Like */}
        <Card style={{border:'none'}}>
      <Row>
        <Col>
        <Card.Header as='h6' className='cardHeader'>Recomendation</Card.Header>
        <Card.Body className="recomendationCard">
        <Recomendation id={data.id}/>
        </Card.Body>
            </Col>
      </Row>
    </Card>
        {/* End maybe You Like */}
      </Card.Body>
    </Card>
    <Footer />
  </div>
 
  </div>
);
}
}


export default withRouter(Trailer);