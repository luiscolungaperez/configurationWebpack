import React, { Component } from "react";

import "./styles/BadgeEdit.css";

import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";
import PageLoading from "../components/PageLoading";
import header from "../images/platziconf-logo.svg";

import api from "../api";

export default class BadgeEdit extends Component {
  state = {
    loading: true,
    error: null,
    form: {
      firstName: "",
      lastName: "",
      twitter: "",
      jobTitle: "",
      email: "",
    },
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async (e) => {
    this.setState({ loading: true, error: null });
    try {
      const data = await api.badges.read(this.props.match.params.badgeId);
      this.setState({ loading: false, form: data });
    } catch (e) {
      this.setState({ loading: false, error: e });
    }
  };

  handleChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true, error: null });
    try {
      await api.badges.update(this.props.match.params.badgeId, this.state.form);
      this.setState({ loading: false });

      this.props.history.push("/badges");
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading === true) {
      return <PageLoading />;
    }
    return (
      <>
        <div className="BadgeEdit__hero">
          <img
            src={header}
            alt="Logo"
            className="BadgeEdit__hero-image img-fluid"
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col">
              <Badge
                firstName={this.state.form.firstName || "First name"}
                lastName={this.state.form.lastName || "Last name"}
                twitter={this.state.form.twitter || "Twitter"}
                avatar="https://www.gravatar.com/avatar?d=identicon"
                email={this.state.form.email || "Email"}
                jobTitle={this.state.form.jobTitle || "Job title"}
              />
            </div>
            <div className="col">
              <h1>Edit Attedant</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
