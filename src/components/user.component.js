import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser, deleteUser } from "../actions/users";
import UserDataService from "../services/user.service";

class User extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.removeUser = this.removeUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                title: "",
                description: "",
                published: false,
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getUser(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    title: title,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentUser: {
                ...prevState.currentUser,
                description: description,
            },
        }));
    }

    getUser(id) {
        UserDataService.get(id)
            .then((response) => {
                this.setState({
                    currentUser: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateStatus(status) {
        var data = {
            id: this.state.currentUser.id,
            title: this.state.currentUser.title,
            description: this.state.currentUser.description,
            published: status,
        };

        this.props
            .updateUser(this.state.currentUser.id, data)
            .then((reponse) => {
                console.log(reponse);

                this.setState((prevState) => ({
                    currentUser: {
                        ...prevState.currentUser,
                        published: status,
                    },
                }));

                this.setState({ message: "The status was updated successfully!" });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateContent() {
        this.props
            .updateUser(this.state.currentUser.id, this.state.currentUser)
            .then((reponse) => {
                console.log(reponse);

                this.setState({ message: "The user was updated successfully!" });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    removeUser() {
        this.props
            .deleteUser(this.state.currentUser.id)
            .then(() => {
                this.props.history.push("/users");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                {currentUser ? (
                    <div className="edit-form">
                        <h4>User</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentUser.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentUser.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentUser.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentUser.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateStatus(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateStatus(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.removeUser}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateContent}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a User...</p>
                    </div>
                )}
            </div>
        );
    }
}


export default connect(null, { updateUser, deleteUser })(User);