import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveUsers, findUsersByTitle, deleteAllUsers } from "../actions/users";
import { Link } from "react-router-dom";
class UsersList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.findByTitle = this.findByTitle.bind(this);
        this.removeAllUsers = this.removeAllUsers.bind(this);

        this.state = {
            currentUser: null,
            currentIndex: -1,
            searchTitle: "",
        };
    }

    componentDidMount() {
        this.props.retrieveUsers();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    refreshData() {
        this.setState({
            currentUser: null,
            currentIndex: -1,
        });
    }

    setActiveUser(user, index) {
        this.setState({
            currentUser: user,
            currentIndex: index,
        });
    }

    removeAllUsers() {
        this.props
            .deleteAllUsers()
            .then((response) => {
                console.log(response);
                this.refreshData();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    findByTitle() {
        this.refreshData();

        this.props.findUsersByTitle(this.state.searchTitle);
    }

    render() {
        const { searchTitle, currentUser, currentIndex } = this.state;
        const { users } = this.props;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.findByTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Users List</h4>

                    <ul className="list-group">
                        {users &&
                            users.map((user, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveUser(user, index)}
                                    key={index}
                                >
                                    {user.title}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllUsers}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentUser ? (
                        <div>
                            <h4>User</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentUser.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentUser.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentUser.published ? "Published" : "Pending"}
                            </div>

                            <Link
                                to={"/users/" + currentUser.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a User...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.users,
    };
};

export default connect(mapStateToProps, { retrieveUsers, findUsersByTitle, deleteAllUsers })(UsersList);