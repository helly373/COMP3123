import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";

class PersonList extends Component {
  state = {
    persons: [],
  };

  componentDidMount() {
    axios.get(`https://randomuser.me/api/?results=10`).then((res) => {
      console.log(res.data);
      const persons = res.data.results;
      this.setState({ persons });
    });
  }

  
  render() {
    return (
      <div style={{ padding: "20px" }}>
        <h2
          className="text-center mb-4"
          style={{ padding: "20px", backgroundColor: "lightgreen" }}
        >
          User List
        </h2>
        {this.state.persons.map((person) => (
          <Card
            key={person.login.uuid}
            className="mb-4"
            style={{ backgroundColor: "#1E7D85", color: "black" }}
          >
            <Card.Body>
              <Row>
                <Col md={3} className="d-flex flex-column align-items-center">
                  <img
                    src={person.picture.large}
                    alt="User"
                    style={{
                      borderRadius: "50%",
                      width: "200px",
                      marginBottom: "20px",
                    }}
                  />
                  <Button variant="primary">Details</Button>
                </Col>

                <Col md={6}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                      rowGap: "10px",
                      columnGap: "20px",
                    }}
                  >
                    <div style={{ textAlign: "right" }}>
                      <p>
                        <strong>User Name:</strong>
                      </p>
                      <p>
                        <strong>Gender:</strong>
                      </p>
                      <p>
                        <strong>Time Zone Description:</strong>
                      </p>
                      <p>
                        <strong>Address:</strong>
                      </p>
                      <p>
                        <strong>Email:</strong>
                      </p>
                      <p>
                        <strong>Birth Date and Age:</strong>
                      </p>
                      <p>
                        <strong>Register Date:</strong>
                      </p>
                      <p>
                        <strong>Phone#:</strong>
                      </p>
                      <p>
                        <strong>Cell#:</strong>
                      </p>
                    </div>

                    <div style={{ textAlign: "left" }}>
                      <p>{person.login.username}</p>
                      <p>{person.gender.toUpperCase()}</p>
                      <p>{person.location.timezone.description}</p>
                      <p>{`${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country} - ${person.location.postcode}`}</p>
                      <p>{person.email}</p>
                      <p>{`${person.dob.date} (${person.dob.age})`}</p>
                      <p>{person.registered.date}</p>
                      <p>{person.phone}</p>
                      <p>{person.cell}</p>
                    </div>
                  </div>
                </Col>

                <Col md={3}></Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default PersonList;