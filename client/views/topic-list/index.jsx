import React from 'react'
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types'
import { AppState } from '../../store/app.state';

@inject ('appState') @observer

export default class TopicList extends React.Component {
    componentDidMount() {
        
    }    
    render() {
        return (
            <div>{this.props.appState.msg}</div>
        )
    }
}

TopicList.propTypes = {
    appState: PropTypes.instanceOf(AppState).isRequired
}