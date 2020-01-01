import React from 'react';
import axios from 'axios';

export default class TestApi extends React.Component {
    constructor() {
        super();
        this.getTopics = this.getTopics.bind(this);
        this.login = this.login.bind(this);
        this.markAll = this.markAll.bind(this);
    }

    getTopics() {
        axios.get('/api/topics').then((resp) => {
            console.log(resp);
        }).catch((err) => {
            console.log(err);
        });
    }

    login() {
        axios.post('/api/user/login', {
            accessToken: '7f6bc367-58d0-4fc3-b9ed-968b830e815e'
        }).then((resp) => {
            console.log(resp);
        }).catch((err) => {
            console.log(err);
        });       
    }

    markAll() {
        axios.post('/api/message/mark_all?needAccessToken=true').then((resp) => {
            console.log(resp);
        }).catch((err) => {
            console.log(err);
        });           
    }

    render() {
        return (
            <div>
                <button onClick={this.getTopics}>Topics</button>
                <button onClick={this.login}>login</button>
                <button onClick={this.markAll}>markAll</button>
            </div>
        )
    }
}