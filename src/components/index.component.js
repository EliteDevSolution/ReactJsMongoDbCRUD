import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { business: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/business")
      .then((response) => {
        this.setState({ business: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleDelete(id) {
    let newRows = this.state.business.filter((obj) => {
      return id !== obj._id;
    });
    this.setState({ business: newRows });
  }

  render() {
    return (
      <div>
        <h3 align="center"> Business List </h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th> Person </th> <th> Business </th> <th> GST Number </th>
              <th colSpan="2"> Action </th>
            </tr>
          </thead>
          <tbody>
            {this.state.business.map((object, i) => (
              <TableRow
                obj={object}
                key={i}
                onDelete={() => this.handleDelete(object._id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
