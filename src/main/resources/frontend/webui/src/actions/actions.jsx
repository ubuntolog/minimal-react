import axios from 'axios';
import Alert from 'react-s-alert';
import actionTypes from './actionTypes';
import {apiNames} from '../constants';

function errHandler(msg) {
    return function(err) {
        const alert = (msg) => {
            Alert.error(msg);
        };
        const response = err.response || {};
        if (response.status == 401) {
            alert("Please login");
        } else if (response.status == 403) {
            alert("Access denied. "+(response.data || ""));
        } else if (response.status == 504) {
            alert("The server does not respond (gateway timeout).");
        } else {
            msg = msg || "An error occurred while contacting the server.";
            alert(msg);
        }
    }
}

export function fetchApiInfo() {
    return function (dispatch, getState) {
        axios.get(apiNames.apiinfo).then(response => {
            dispatch({
                type: actionTypes.APIINFO_FETCH_SUCCESS,
                apiinfo: response.data
            });
        }).catch(errHandler());
    }
}

export function fetchBookings() {
    return function (dispatch, getState) {
        axios.get(apiNames.booking).then(response => {
            dispatch({
                type: actionTypes.FETCH_BOOKINGS_SUCCESS,
                bookings: response.data
            });
        }).catch(err => {
            errHandler("Could not retrieve the list of bookings")(err);
        });
    }
}

function registrationSubmissionSuccess(registration) {
    return {
        type: actionTypes.REGISTRATION_SUBMISSION_ERROR,
        registration: registration
    }
}

function registrationSubmissionError(registration) {
    return {
        type: actionTypes.REGISTRATION_SUBMISSION_ERROR,
        registration: registration
    }
}

export function submitRegistration(name, email, phone, salary, age, pets, tenantsNum, space, floor, roomsNum, rentPeriod) {
    console.log(name, email, phone, salary, age, pets, tenantsNum, space, floor, roomsNum, rentPeriod);
    return function (dispatch, getState)  {
        const fd = new FormData();
        fd.append("name", name);
        fd.append("email", email);
        fd.append("phone", phone);
        fd.append("salary", salary);
        fd.append("age", age);
        fd.append("pets", pets);
        fd.append("tenantsNum", tenantsNum);
        fd.append("space", space);
        fd.append("floor", floor);
        fd.append("roomsNum", roomsNum);
        fd.append("rentPeriod", rentPeriod);

        axios.post(apiNames.booking, fd).then(response => {
            dispatch(registrationSubmissionSuccess(response.data));
            Alert.success("You have successfully registered");            
        }).catch(err => {
            errHandler("There has been an error. Consider checking the form data")(err);
            dispatch(registrationSubmissionError(err.response.data));
        })
    }
}

export function validateForm(validation) {
    console.log("VALIDATE");
    return {
        type: actionTypes.VALIDATE_FORM_SUCCESS,
        validation: validation
    }
}
