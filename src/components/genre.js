import React, { Component } from "react";
import "../App.css";
import Axios from "axios";
import { Button, Row, Col , Button} from "react-bootstrap";
import { withRouter, Link} from "react-router-dom";

class Genre extends Component {
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
        <div id='chooseGenre'>
          <Row >
            {datas.map((data, index) => {
              const star = data.vote_average;
              return (
                <Col xs={4} lg={2} md={3} sm={4} key={index}>
                <Link to={"/movieDetail/" + data.id} className='linkBtn'> <Button variant="outline-light" >
                       {data.name}
                          </Button>
                          </Link>
                </Col>
              
              );
            })}
          </Row>
            </div>
       
      
    );
  }
}

export default withRouter(Genre);
