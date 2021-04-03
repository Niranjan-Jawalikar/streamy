import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream } from "../../actions";
import { deleteStream } from "../../actions";

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }
    renderActions = () => {
        return (
            <React.Fragment>
                <button onClick={this.onDeleteClick} className="ui negative button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment >
        )
    }

    onDeleteClick = () => {
        this.props.deleteStream(this.props.stream.id)
    }
    renderContent = () => {
        if (!this.props.stream)
            return "Are you sure you want to delete this stream?"
        return `Are you sure you want to delete the stream with title:${this.props.stream.title}?`
    }
    render() {
        return (
            <div><Modal title="Delete Stream" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push("/")} /></div>
        )
    }

}

const maptStateToProps = (state, ownProps) => ({ stream: state.streams[ownProps.match.params.id] })

export default connect(maptStateToProps, { fetchStream, deleteStream })(StreamDelete);