import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Info from "./Info.jsx";

class UniverseEvents extends Component {
  state = {
    events: [],
    newEvents: {
      eventImg: "",
      eventName: "",
      eventCategoryThreat: "",
      eventLocation: "",
      eventDescription: "",
      additionalInfo: []
    },
    isUniverseEventFormDisplayed: false,
    createdEvent: {},
    redirectToHome: false
  };

  //Use the componentDidMount lifecycle method
  // to execute our API call as soon as the component mounts
  componentDidMount = () => {
    console.log("Hey! You got me!!");
    this.getAllEvents();
  };

  //what I JUST added
  // componentDidMount() {
  //   console.log("infoId: ", this.props.match.params.infoId);
  //   console.log("Hey, you're getting each event!");
  //   this.getIndividualEvent();
  // }
  //Here too
  //   getIndividualEvent = () => {
  //     axios
  //       .get(
  //         `/api/events/${this.props.match.params.id}/info/${
  //           this.props.match.params.infoId
  //         }`
  //       )
  //       .then(response => {
  //         console.log(response.data);

  //         this.setState({
  //           info: response.data
  //         });
  //       })
  //       .catch(err => {
  //         console.log("Go back, goof!", err);
  //       });
  //   };

  //Function to get all Facts from axios via our API
  getAllEvents = () => {
    axios
      .get(`/api/events`)
      .then(response => {
        console.log(response.data);
        const events = response.data;
        this.setState({ events: events });
      })
      .catch(err => {
        console.log("You messed up somewhere, Jess. Go back!", err);
      });
  };

  //Creates a New Event
  createAnEvent = event => {
    event.preventDefault();
    axios
      .post("/api/events", {
        eventImg: this.state.newEvents.eventImg,
        eventName: this.state.newEvents.eventName,
        eventCategoryThreat: this.state.newEvents.eventCategoryThreat,
        eventLocation: this.state.newEvents.eventLocation,
        eventDescription: this.state.newEvents.eventDescription,
        additionalInfo: this.state.newEvents.additionalInfo
      })
      .then(response => {
        const eventList = [...this.state.events];
        eventList.push(response.data);
        this.setState({
          newEvents: {
            eventImg: "",
            eventName: "",
            eventCategoryThreat: "",
            eventLocation: "",
            eventDescription: "",
            additionalInfo: []
          },
          isUniverseEventFormDisplayed: false,
          events: eventList,
          redirecToHome: true
        });
      });
  };

  // Deletes an event
  deleteAnEvent = () => {
    axios.delete(`/api/events/${this.props.match.params.id}`).then(response => {
      this.setState({ redirectToHome: true });
    });
  };
  // Deletes an event

  //Toggles the Edit form
  displayUniverseEventForm = () => {
    this.setState((state, props) => {
      return {
        isUniverseEventFormDisplayed: !state.isUniverseEventFormDisplayed
      };
    });
  };

  //Handles form change event value
  handleFormChange = event => {
    //Preserves Event State
    const cloneNewEvent = { ...this.state.newEvents };
    cloneNewEvent[event.target.name] = event.target.value;
    this.setState({ newEvents: cloneNewEvent });
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }
    const events = this.state.events.map((event, index) => {
      //   let pathname = `/events/${event._id}/info/${event.additionalInfo[0]._id}`;
      let pathname = `/events/${event._id}`;
      return (
        <div>
          <h2 className="text-white">Hi!</h2>
          <div>
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
                  src={event.eventImg}
                  alt={event.eventName}
                />
                <div className="card-body">
                  <p className="link-name">
                    <Link to={pathname}>{event.eventName}</Link>
                  </p>
                  <p>
                    <strong>Category Threat: </strong>
                    {event.eventCategoryThreat}
                  </p>
                  <p>
                    <strong>Event Location: </strong>
                    {event.eventLocation}
                  </p>
                  <p>
                    <strong>Event Description: </strong>
                    {event.eventDescription}
                  </p>
                  <Link onClick={() => this.state.deleteAnEvent}>
                    DeleteMe!
                  </Link>
                  <button
                    onSubmit={() => this.state.deleteAnEvent}
                    type="button"
                    class="close"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    });
    return (
      <div>
        {/* {this.state.events.map(event => {
          return (
            <div key={event._id}>
              <Link to={`/${event._id}`}>{event.eventName}</Link>
            </div>
          );
        })} */}
        <div class="card-container">{events}</div>

        <h1>Want to add a new Universe Event? You can! Click Below</h1>

        <button
          className="btn btn-primary "
          onClick={this.displayUniverseEventForm}
        >
          Display Add Event Form
        </button>
        <div>
          <section className="clean-block clean-form dark">
            <div className="container">
              {this.state.isUniverseEventFormDisplayed ? (
                <form onSubmit={this.createAnEvent}>
                  <div className="form-group">
                    <label htmlFor="eventImg">Event Image</label>
                    <input
                      className="form-control"
                      id="eventImg"
                      type="text"
                      name="eventImg"
                      onChange={this.handleFormChange}
                      value={this.state.newEvents.eventImg}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventName">Event Name</label>
                    <input
                      className="form-control"
                      id="eventName"
                      type="text"
                      name="eventName"
                      onChange={this.handleFormChange}
                      value={this.state.newEvents.eventName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventDescription">Event Description</label>
                    <textarea
                      className="form-control"
                      id="eventDescription"
                      type="text"
                      name="eventDescription"
                      onChange={this.handleFormChange}
                      value={this.state.newEvents.eventDescription}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventCategoryThreat">Event Threat</label>
                    <input
                      className="form-control"
                      id="eventCategoryThreat"
                      type="text"
                      name="eventCategoryThreat"
                      onChange={this.handleFormChange}
                      value={this.state.newEvents.eventCategoryThreat}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventLocation">Event Location</label>
                    <input
                      className="form-control"
                      id="eventLocation"
                      type="text"
                      name="eventLocation"
                      onChange={this.handleFormChange}
                      value={this.state.newEvents.eventLocation}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      value="submit"
                    >
                      Add New Event
                    </button>
                  </div>
                </form>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default UniverseEvents;
