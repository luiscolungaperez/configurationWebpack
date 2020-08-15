import React from "react";
import { Link } from "react-router-dom";

import Badge from "../components/Badge";

import logo from "../images/platziconf-logo.svg";
import "./styles/BadgeDetails.css";
import DeleteBadgeModal from "../components/DeleteBadgeModal";

function useIncreaseCount(max) {
  const [count, setCount] = React.useState(0);
  if (count > max) {
    setCount(0);
  }

  return [count, setCount];
}

export default function BadgeDetails(props) {
  const { firstName, lastName, twitter, jobTitle, email, id } = props.badge;
  const [count, setCount] = useIncreaseCount(4);
  return (
    <div>
      <div className="BadgeDetails__hero">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img src={logo} alt="Logo de la conferencia" />
            </div>
            <div className="col-6 BadgeDetails__hero-attendant-name">
              <h1>
                {firstName} {lastName}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <Badge
              firstName={firstName}
              lastName={lastName}
              email={email}
              twitter={twitter}
              jobTitle={jobTitle}
            />
          </div>
          <div className="col">
            <h2>Actions</h2>
            <Link className="btn btn-primary" to={`/badges/edit/${id}`}>
              Edit
            </Link>
            <button onClick={props.onOpenModal} className="btn btn-danger ml-4">
              Delete
            </button>

            <button
              className="btn btn-primary ml-4"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              Count {count}
            </button>

            <DeleteBadgeModal
              isOpen={props.modalIsOpen}
              onClose={props.onCloseModal}
              onDeleteBadge={props.onDeleteBadge}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
