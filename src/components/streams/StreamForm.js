import React from "react";
import { Field, reduxForm } from "redux-form";


class StreamForm extends React.Component {
    renderError({ touched, error }) {
        if (touched && error)
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
    }

    renderForm = ({ input, label, meta }) => {
        return (
            <div className={`field ${meta.error && meta.touched ? "error" : ""}`}>
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>

        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="title" component={this.renderForm} label="Enter Title" />
                    <Field name="description" component={this.renderForm} label="Enter Description" />
                    <button className="ui button primary">Submit</button>
                </form>
            </div>
        )
    }
}

const validate = (formValues) => {
    const error = {};
    if (!formValues.title)
        error.title = "You must enter a title"
    if (!formValues.description)
        error.description = "You must enter a description"
    return error;

}

export default reduxForm({
    form: "streamForm",
    validate
})(StreamForm);