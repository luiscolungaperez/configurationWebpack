import React, { Component } from "react";

import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";

import api from "../api";
import BadgeDetails from "./BadgeDetails";

export default class BadgeDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      form: {
        id: "",
        firstName: "",
        lastName: "",
        twitter: "",
        jobTitle: "",
        email: "",
      },
      modalIsOpen: false,
    };
  }

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.badges.read(this.props.match.params.badgeId);
      this.setState({ loading: false, form: data });
    } catch (e) {
      this.setState({ loading: false, error: e });
    }
  };

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  };

  handleDeleteBadge = async () => {
    this.setState({ loading: true, error: null });

    try {
      await api.badges.remove(this.props.match.params.badgeId);
      this.props.history.push("/badges");
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ loading: false, error: e });
    }
  };

  render() {
    const { loading, error } = this.state;
    if (loading) {
      return <PageLoading />;
    }

    if (error) {
      return <PageError error={error} />;
    }
    return (
      <BadgeDetails
        onCloseModal={this.handleCloseModal}
        onOpenModal={this.handleOpenModal}
        modalIsOpen={this.state.modalIsOpen}
        onDeleteBadge={this.handleDeleteBadge}
        badge={this.state.form}
      />
    );
  }
}
