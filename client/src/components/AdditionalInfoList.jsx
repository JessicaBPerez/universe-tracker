import React, { Component } from "react";
import axios from "axios";

import { Link, Redirect } from "react-router-dom";
import AdditionalInfo from "./AdditionalInfo";
import AdditionalInfoListDummy from "./AdditionalInfoListDummy";

class AdditionalInfoList extends Component {
  state = {
    additionalFacts: [],
    newFacts: {
      infoImg: "",
      randomFacts: "",
      nextMajorEvent: "",
      eventDescription: "",
      threatLevel: "",
      info: []
    },
    isAdditionalInfoFormDisplayed: false,
    redirectToAdditionalInfo: false
  };

  componentDidMount() {
    this.getAdditionalInfo();
  }

  getAdditionalInfo = () => {
    axios
      .get(`/api/events/${this.props.match.params.id}/info`)
      .then(response => {
        console.log(response.data);
        this.setState({
          additionalFacts: response.data
        });
      })
      .catch(err => {
        console.log("You didn't get me!", err);
      });
  };

  //Handles Form Change on Facts
  handleFormChange = event => {
    //Preserves Event State
    const cloneNewFacts = { ...this.state.newFacts };
    cloneNewFacts[event.target.name] = event.target.value;
    this.setState({ newFacts: cloneNewFacts });
  };

  createANewFact = event => {
    event.preventDefault();
    axios
      .post(`/api/events/${this.props.match.params.id}/info`, {
        infoImg: this.state.newFacts.infoImg,
        randomFacts: this.state.newFacts.randomFacts,
        nextMajorEvent: this.state.newFacts.nextMajorEvent,
        eventDescription: this.state.newFacts.eventDescription,
        threatLevel: this.state.newFacts.threatLevel
      })
      .then(response => {
        const factList = [...this.state.additionalFacts];
        console.log(factList);

        // console.log("Array".Object.values(factList));
        factList.push(response.data);
        this.setState({
          newFacts: {
            infoImg: "",
            randomFacts: "",
            nextMajorEvent: "",
            eventDescription: "",
            threatLevel: "",
            info: []
          },
          // isAdditionalInfoFormDisplayed: false,
          additionalFacts: factList,
          redirectToAdditionalInfo: true
        });
      })
      .then(() => {
        this.getAdditionalInfo();
      });
  };

  render() {
    const additionalInfos = this.state.additionalFacts.map(
      (additionalInfo, index) => {
        // let pathname = `/events/${event._id}/info/${info._id}`;
        //   let pathname
        return (
          <div>
            <div key={index}>{additionalInfo.eventDescription}</div>
            <section
              className=" card-margin card-style"
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row"
              }}
            >
              <div className="card" style={{ width: "30rem" }}>
                <img
                  className="card-img-top"
                  src={additionalInfo.infoImg}
                  alt=""
                />
                <div className="card-body">
                  <p className="link-name">
                    {/* <Link to={pathname}>{event.eventName}</Link> */}
                  </p>
                  <p>
                    <strong>Random Fact: </strong>
                    {additionalInfo.randomFacts}
                  </p>
                  <Link
                    to={`/events/${this.props.match.params.id}/info/${
                      additionalInfo._id
                    }`}
                  >
                    Additional Info
                  </Link>
                  <p>
                    <strong>Next Major Event: </strong>
                    {additionalInfo.nextMajorEvent}
                  </p>
                  <p>
                    <strong>Event Description: </strong>
                    {additionalInfo.eventDescription}
                  </p>
                  <p>
                    <strong>Threat Level: </strong>
                    {additionalInfo.threatLevel}
                  </p>
                  {/* <Link onClick={() => this.state.deleteAnEvent}>
                    DeleteMe!
                  </Link> */}
                  <button
                    // onSubmit={() => this.state.deleteAnEvent}
                    type="button"
                    class="close"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </section>
            {/* <form onSubmit={this.createANewFact}>
              <div className="form-group">
                <label htmlFor="infoImg">Fact Image</label>
                <input
                  className="form-control"
                  id="infoImg"
                  type="text"
                  name="infoImg"
                  onChange={this.handleFormChange}
                  value={this.state.newFacts.infoImg}
                />
              </div>
              <div className="form-group">
                <label htmlFor="randomFacts">Event Name</label>
                <input
                  className="form-control"
                  id="randomFacts"
                  type="text"
                  name="randomFacts"
                  onChange={this.handleFormChange}
                  value={this.state.newFacts.randomFacts}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nextMajorEvent">Event Description</label>
                <textarea
                  className="form-control"
                  id="nextMajorEvent"
                  type="text"
                  name="nextMajorEvent"
                  onChange={this.handleFormChange}
                  value={this.state.newFacts.nextMajorEvent}
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDescription">Event Threat</label>
                <input
                  className="form-control"
                  id="eventDescription"
                  type="text"
                  name="eventDescription"
                  onChange={this.handleFormChange}
                  value={this.state.newFacts.eventDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="threatLevel">Event Location</label>
                <input
                  className="form-control"
                  id="threatLevel"
                  type="text"
                  name="threatLevel"
                  onChange={this.handleFormChange}
                  value={this.state.newFacts.threatLevel}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  value="submit"
                >
                  Add New Fact
                </button>
              </div>
            </form> */}
          </div>
        );
      }
    );
    return (
      <div>
        <div>{additionalInfos}</div>
        {/* {this.state.additionalFacts.map(fact => {
          return (
            <AdditionalInfoListDummy
              key={fact._id}
              infoImg={fact.infoImg}
              randomFacts={fact.randomFacts}
              nextMajorEvent={fact.nextMajorEvent}
              eventDescription={fact.eventDescription}
              threatLevel={fact.threatLevel}
              handleFormChange={this.handleFormChange}
              createANewFact={this.createANewFact}
            />
          );
        })} */}
        <div>
          <form onSubmit={this.createANewFact}>
            <div className="form-group">
              <label htmlFor="infoImg">Fact Image</label>
              <input
                className="form-control"
                id="infoImg"
                type="text"
                name="infoImg"
                onChange={this.handleFormChange}
                value={this.state.newFacts.infoImg}
              />
            </div>
            <div className="form-group">
              <label htmlFor="randomFacts">Event Name</label>
              <input
                className="form-control"
                id="randomFacts"
                type="text"
                name="randomFacts"
                onChange={this.handleFormChange}
                value={this.state.newFacts.randomFacts}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nextMajorEvent">Event Description</label>
              <textarea
                className="form-control"
                id="nextMajorEvent"
                type="text"
                name="nextMajorEvent"
                onChange={this.handleFormChange}
                value={this.state.newFacts.nextMajorEvent}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDescription">Event Threat</label>
              <input
                className="form-control"
                id="eventDescription"
                type="text"
                name="eventDescription"
                onChange={this.handleFormChange}
                value={this.state.newFacts.eventDescription}
              />
            </div>
            <div className="form-group">
              <label htmlFor="threatLevel">Event Location</label>
              <input
                className="form-control"
                id="threatLevel"
                type="text"
                name="threatLevel"
                onChange={this.handleFormChange}
                value={this.state.newFacts.threatLevel}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                type="submit"
                value="submit"
              >
                Add New Fact
              </button>
            </div>
          </form>
        </div>
        <h1>Hi Additonal List</h1>
      </div>
    );
  }
}

export default AdditionalInfoList;
