import React, { Component } from "react";
import "../App.css";
import { Button,Card, Col, Row, Image } from "react-bootstrap";
import Axios from "axios";
import Header from "../components/header";
import Recomendation from "../components/recomendation";
import Footer from "../components/footer";
import { withRouter } from "react-router";
import StarRating from "../components/rate";
import moment from "moment";
class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      genres: [],
      production_companies: [],
      reviews: []
    };
  }
  state = { showAll: false }
  showMore = () => this.setState({showAll: true}); 
  showLess = () => this.setState({showAll: false});


  componentDidMount() {
    const { match } = this.props;

    Axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=7fe26f747001d020e92fed615ac69b70`
    }).then(res => {
      this.setState({ data: res.data });
      this.setState({ genres: res.data.genres });
      this.setState({ production_companies: res.data.production_companies });
      this.setState({ production_countries: res.data.production_countries });
     
    });
    Axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${match.params.id}/reviews?api_key=7fe26f747001d020e92fed615ac69b70`
    }).then(res => {
      this.setState({ reviews: res.data.results });
    });
  }

  
 
  render() {
    const data = this.state.data;
    
    return (
      <div  style={{background:'#0f0011'}}>
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
           <Card.Img
              style={{ maxWidth: "100%", margin:'0',paddingBottom:'5%' }}
              src={
                `https://image.tmdb.org/t/p/w500_and_h282_face` +
                data.poster_path
              }
            />
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
                        )}</p>
                   
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
                    {this.state.genres.map((data, index) => {
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
            <Card
              bg="white"
              style={{
                color: "black",
                textAlign: "justify",
                margin: "10px 0",
                border:'none'
              }}
            >
              <Card.Header as="h6" className='cardHeader'>Review</Card.Header>
              {this.state.reviews.length === 0 && (
            <Card
            style={{ margin: "10px",color:'#6e6e6e',border:'none'}}
          >
              <Card.Body>
              <p>
            Sorry, No one has reviewed this movie yet</p>
            </Card.Body>
            </Card>
          
        )}
              {this.state.reviews.map((data, index) => {
                const {showAll} = this.state;
                if (data.content.length <=200){
                  return  (
                    <Card
                      key={index}
                      style={{ margin: "10px",color:'#6e6e6e'}}
                    >
                      <Card.Header>Author : {data.author}</Card.Header>
                      <Card.Body>
                        <Card.Text>{data.content}</Card.Text>
                        </Card.Body>
                    </Card>
                    ) 
                    
                }
                if(showAll) {
                  // We show the extended text and a link to reduce it
                  return (
                    <Card
                    key={index}
                    style={{ margin: "10px",color:'#6e6e6e'}}
                  >
                    <Card.Header>Author : {data.author}</Card.Header>
                    <Card.Body>
                    <Card.Text>{data.content} <br/>
                    
                    <span className='moreBtn'>
                    <Button size='sm' variant="light" onClick={this.showLess}>Read less</Button>
                   </span>
                   </Card.Text> 
                    </Card.Body>
                    </Card>
                  )
                   
              }
              const toShow = data.content.substring(0,200)+"...";
                return (
                  <Card
                    key={index}
                    style={{ margin: "10px",color:'#6e6e6e'}}
                  >
                    <Card.Header>Author : {data.author}</Card.Header>
                    <Card.Body>
                      <Card.Text> {toShow} <br/>
                      <span className='moreBtn'>
                     <Button size='sm' variant="light" onClick={this.showMore}>Read more</Button>
                    </span>
                     </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Card>
            {/* end review */}

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

export default withRouter(MovieDetail);
