import React, { Component, Fragment } from 'react';
import ReactFitText from 'react-fittext';

import moment from 'moment';
import pickaday from 'pikaday';
import yearDiff from './main.js'

class Navbar extends Component {
  render() {
    return(
      <nav className="navbar justify-content-between">
        <h5><a href=".">Just a Number</a></h5>
        <a href="#about" id="opener" data-toggle="modal" data-target="#modal">About</a>
      </nav>
    )
  }
}

class About extends Component {
  render() {
    return(
      <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modal-label" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">About</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Just a Number displays the number of years, as a decimal, elapsed since the midnight of the given day. Based on the Chrome extension <b><a href="https://chrome.google.com/webstore/detail/motivation/ofdgfpchbidcgncgfpdlpclnpaemakoj?hl=en"
              target="_blank" rel="noopener noreferrer">Motivation</a></b>.
             </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Welcome extends Component {
  componentDidMount() {
    new pickaday({
      field: document.getElementById('dob'),
      yearRange: 100,
      maxDate: new Date(),
      onSelect: this.props.onChange
    });
  }

  render() {
    return(
      <div className="row align-self-center">
        <div className="col-md-12 mx-auto text-center">
          <h3>Watch your age updated live for some motivation</h3>
          <div className="top-buffer"></div>
          <h1 id="dob-title" className="age-label font-weight-bold">When were you born?</h1>
          <form className="form-inline justify-content-center" onSubmit={this.props.onClick}>
          <input type="text" name="dob" id="dob" ref="dob" placeholder="YYYY-MM-DD" required="true" className="my-1 mr-sm-2 form-control" onChange={this.props.onChange} />
          <button type="submit" className="btn btn-primary" id="btn-submit">Show</button>
          </form>
        </div>
      </div>        
    );
  }
};

class Age extends Component {
  constructor(props) {
    super(props)
    this.tick = this.tick.bind(this);
    this.state = {
      years: 0.
    }
  }

  tick() {
    var now = moment(new Date());
    var start = moment.unix(this.props.dob / 1000);
    var years = yearDiff(start, now);

    this.setState({
      years: years
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    var majorMinor = this.state.years.toFixed(9).toString().split('.');
    var year = majorMinor[0];
    var ms = majorMinor[1];

    return(
      <div className="row align-self-center age-div">
        <div className="col-md-12 mx-auto text-left">
        <ReactFitText compressor={1}>
          <h1 className="age-label">Your Age</h1>
        </ReactFitText>
        <ReactFitText compressor={0.3}>
          <h2 className="count align-top">{year}<sup>.{ms}</sup></h2>
        </ReactFitText>
        </div>
      </div>
    );
  }
};

class Main extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      init: true,
      dob: null
    }
  }

  onClick(e) {
    e.preventDefault();
    this.setState({
      init: false
    })
  }

  onChange(inputDate) {
    this.setState({
      dob: inputDate
    });
  }

  render() {
    if (this.state.init || !this.state.dob ) {
      return <Welcome onClick={this.onClick} onChange={this.onChange} />
    } else {
      return <Age dob={this.state.dob} />
    }
  }
}

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <About />
        <main id="main" role="main" className="container d-flex h-100 justify-content-center">
          <Main />
        </main>
      </Fragment>
    );
  }
}

export default App;
