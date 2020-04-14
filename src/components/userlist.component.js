import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const UserListP = (props) => {
    return (
        <tr>
            <td>{props.username.username}</td>
            <td><Link to={'useredit/'+ props.username._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUsername(props.username._id) }}>delete</a></td>
        </tr>
    );
}


export default class UserList extends Component{
    constructor(props){
        super(props);

        this.state = {
            usernames: []
        }

        this.deleteUsername = this.deleteUsername.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(usernames => {
                // console.log(usernames.data);

                this.setState({
                    usernames: usernames.data
                });
            })
            .catch(err => console.log(err));
    }

    deleteUsername(id) {
        axios.delete('http://localhost:5000/users/' + id)
            .then(res => {
                // console.log(res.data);

                this.setState({
                    usernames: this.state.usernames.filter(el => el._id !== id)
                });
            })
            .catch(err => console.log(err));
    }

    usernamesList() {
        return this.state.usernames.map(username => {
            return <UserListP username={username} key={username._id} deleteUsername = {this.deleteUsername} />
        });
    }

    render() {
        return (
            <div>
                <h3>Verifed users</h3>
                <table className="table">
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.usernamesList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
