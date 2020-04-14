import React, { Component } from 'react';
import axios from 'axios';

export default class UserEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ""
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/' + this.props.match.params.id )
            .then(user => {
                // console.log(this.props);
                this.setState({
                    username: user.data.username
                });
            });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        // console.log(user);

        axios.patch('http://localhost:5000/users/update/' + this.props.match.params.id, user)
            .then(res => {
                // console.log(res.data);

                this.setState({
                    username: ''
                });

                window.location = '/userlist';
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                <h3>Edit User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                                        
                    <div className="form-group">
                        <input type="submit" value="Save Edit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}