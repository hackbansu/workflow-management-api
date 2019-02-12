import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { showLoader } from 'utils/helpers/loader';
import { makeSignupRequest } from 'services/auth';
import { showToast } from 'utils/helpers/toast';

// importing components
import SignupForm from 'components/signupForm';
import PageBanner from 'components/pageBanner';
import LinkButton from 'components/linkButton';

/**
 * Login page component.
 */
export class Signup extends React.Component {
    /**
     * Constructor for the component.
     * @param {object} props - props object for the component.
     */
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * function to submit login request.
     */
    onSubmit = (
        email,
        password,
        firstName,
        lastName,
        designation,
        companyName,
        companyAddress,
        companyCity,
        companyState
    ) => {
        const { history } = this.props;

        // dispatch action to show loader
        showLoader(true);

        const data = {
            user: {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            },
            company: {
                name: companyName,
                address: companyAddress,
                city: companyCity,
                state: companyState,
            },
            designation,
        };

        // call the service function
        makeSignupRequest(data).then(obj => {
            showLoader(false);

            if (!obj) {
                return;
            }

            const { response, body } = obj;

            showToast('Successful Signup');

            // dispatch action to update user token and data
            history.push('/');
        });
    };

    /**
     * function to render the component.
     */
    render() {
        return (
            <div>
                <div className="container">
                    <PageBanner text="Sign Up" />
                    <SignupForm onSubmit={this.onSubmit} />
                    <ul className="nav justify-content-center page-nav-links">
                        <LinkButton name="Back to login" toUrl="/login" />
                    </ul>
                </div>
            </div>
        );
    }
}

Signup.propTypes = {
    history: PropTypes.object.isRequired,
};

Signup.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
