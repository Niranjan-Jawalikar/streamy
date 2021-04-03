import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import StreamForm from "./StreamForm";
import { updateStream } from "../../actions"

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }
    onSubmit = (formValues) => {
        this.props.updateStream(this.props.stream.id, formValues);
    }
    render() {
        if (!this.props.stream)
            return <div>Loading...</div>
        return (
            <div>
                <h3>Edit A Stream:</h3>
                <StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.stream, "title", "description")} id={this.props.stream.id} />
            </div>
        )
    }

}

const maptStateToProps = (state, ownProps) => ({ stream: state.streams[ownProps.match.params.id] })

export default connect(maptStateToProps, { fetchStream, updateStream })(StreamEdit);