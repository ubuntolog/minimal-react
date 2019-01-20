import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Col, Row, FormGroup, ControlLabel, FormControl, Button, Glyphicon, ButtonToolbar, Modal, HelpBlock, Tabs, Tab, Radio, Checkbox} from 'react-bootstrap';

const formFields = ["name", "email", "phone", "salary", "age", "pets", "tenantsNum", "space", "floor", "roomsNum", "rentPeriod"];
const BookingsTableRow = ({name, email}) => {
    return (
        <Row style={{marginTop:10}}>
            <Col xs={4} sm={4} md={4} lg={4} >
                {name}
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} >
                {email}
            </Col>
        </Row>
    );
}
class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlePetsCheckbox = this.handlePetsCheckbox.bind(this);
        this.handleFieldValidation = this.handleFieldValidation.bind(this);
        this.handleValidationWithNameAndValue = this.handleValidationWithNameAndValue.bind(this);
        this.handleFormValidation = this.handleFormValidation.bind(this);

        this.state = {
            key: 1,
            show: false,
            hasPets: false
        };
    }

    validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    }

    validatePhoneNumber(phone) {       
        // +XX-XXX-XXXXXXXX
        // +XX.XXX.XXXXXXXX
        // +XX XXX XXXXXXXX 
        if (phone.match(/^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{8})$/)) {
            return true;
        } else {
            return false;
        }
    }

    validateAge(age) {    
        // 18 - 125
        if (age.match(/^(12[0-5]|1[01][0-9]|[4-9][0-9]|1[8-9])$/)) {
            return true;
        } else {
            return false;
        }
    }

    validateTenantsNum(num) {    
        // 7 max
        if (num.match(/^(7|[1-7]?)$/)) {
            return true;
        } else {
            return false;
        }
    }

    handleSelect(key) {
        this.setState({ key });
        this.props.actions.fetchBookings();
      }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    handlePetsCheckbox() {
        if (this.state.hasPets) {
            this.setState({ hasPets: false });
        } else {
            this.setState({ hasPets: true });
        }
        
    }

    handleFormValidation() {
        for (let i = 0; i<formFields.length; i++) {
            
            this.handleValidationWithNameAndValue(formFields[i], "");
          
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        for (let i = 0; i<formFields.length; i++) {
            
            this.handleValidationWithNameAndValue(formFields[i], "");
          
        }
        
        this.props.actions.submitRegistration(
                                                data.get(formFields[0]),
                                                data.get(formFields[1]),
                                                data.get(formFields[2]),
                                                data.get(formFields[3]),
                                                data.get(formFields[4]),
                                                this.state.hasPets,
                                                data.get(formFields[6]),
                                                data.get(formFields[7]),
                                                data.get(formFields[8]),
                                                data.get(formFields[9]),
                                                data.get(formFields[10])
                                            );
        this.props.actions.fetchBookings();
    }

    handleFieldValidation(e) {
        this.handleValidationWithNameAndValue(e.target.name, e.target.value);
    }

    handleValidationWithNameAndValue(name, value) {
        console.log(name);
        console.log(value);
        let validation = {};
        validation[name] = {};
        validation[name]["state"] = null;
        validation[name]["message"] = "";
        
        if (name == formFields[0]) {
            if (value.length == 0) {
                validation[name]["state"] = "error";
                validation[name]["message"] = "Name cannot be empty";
            } else {
                validation[name]["state"] = "success";
            }            
        }

        if (name == formFields[1]) {
            if (value.length == 0) {
                validation[name]["state"] = "error";
                validation[name]["message"] = "Email address cannot be empty";
            } else if (!this.validateEmail(value)) {
                validation[name]["state"] = "error";
                validation[name]["message"] = "Email is not valid, please check it";
            } else {
                validation[name]["state"] = "success";
            }          
        }

        if (name == formFields[2]) {
            if (value.length == 0) {
                validation[name]["state"] = "error";
                validation[name]["message"] = "You did not enter your phone number";
            } else if (!this.validatePhoneNumber(value)) {
                validation[name]["state"] = "error";
                validation[name]["message"] = "Your phone number is not correct. It should be like +XX-XXX-XXXXXXXX";
            } else {
                validation[name]["state"] = "success";
            }            
        }

        if (name == formFields[4]) {
            if (value.length == 0) {
                validation[name]["state"] = "error";
                validation[name]["message"] = "You did not enter your age";
            } else if (!this.validateAge(value)) {
                validation[name]["state"] = "error";
                validation[name]["message"] = "Age should be a reasonable number between 18 and 125";
            } else {
                validation[name]["state"] = "success";
            }            
        }

        if (name == formFields[6]) {
            if (value.length == 0) {
                validation[name]["state"] = "error";
                validation[name]["message"] = "You did not enter the number of tenants";
            } else if (!this.validateTenantsNum(value)) {
                validation[name]["state"] = "error";
                validation[name]["message"] = "The number should be at least 1 and no more than 7";
            } else {
                validation[name]["state"] = "success";
            }            
        }

        this.props.actions.validateForm(validation);
    }

    componentDidMount() {
        this.props.actions.fetchBookings();        
    }

    render() {
        let validation = (this.props.validation ? this.props.validation : {});
      
        let validationStatus = {};
        for (let field of formFields) {
            if (!(field in validation)) {
                validationStatus[field] = {};
                validationStatus[field]["state"] = null;
                validationStatus[field]["message"] = "";
            } else {
                validationStatus[field] = validation[field];
            }
        }
        console.log(validationStatus);
        return(
                <div>
                    <Tabs
                        activeKey={this.state.key}
                        onSelect={this.handleSelect}
                        id="controlled-tab-example"
                    >
                        <Tab eventKey={1} title="Enter your data">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup
                                controlId="nameGroup"
                                validationState={validationStatus[formFields[0]]["state"]}
                            >
                                <ControlLabel>Name*</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your name"
                                    name={formFields[0]}
                                    onChange={this.handleFieldValidation}                                   
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[0]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="emailGroup"
                                validationState={validationStatus[formFields[1]]["state"]}
                            >
                                <ControlLabel>Email*</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your email address"
                                    name={formFields[1]} 
                                    onChange={this.handleFieldValidation} 
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[1]]["message"]}</HelpBlock>
                            </FormGroup>
                            
                            <FormGroup
                                controlId="phoneGroup"
                                validationState={validationStatus[formFields[2]]["state"]}
                            >
                                <ControlLabel>Phone number*</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your phone number"
                                    name={formFields[2]}
                                    onChange={this.handleFieldValidation}                                        
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[2]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="salaryGroup"
                                validationState={validationStatus[formFields[3]]["state"]}
                            >
                                <ControlLabel>Salary</ControlLabel>
                                <p>
                                    <Radio name={formFields[3]} value="0" inline>
                                        0 - 1.000
                                    </Radio>{' '}
                                    <Radio name={formFields[3]} value="1" inline>
                                        1.000 - 2.000
                                    </Radio>{' '}
                                    <Radio name={formFields[3]} value="2" inline>
                                        2.000 - 3.000
                                    </Radio>
                                    <Radio name={formFields[3]} value="3" inline>
                                        3.000 - 4.000
                                    </Radio>
                                    <Radio name={formFields[3]} value="4" inline>
                                        Mehr als 4.000
                                    </Radio>
                                </p>
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[3]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="ageGroup"
                                validationState={validationStatus[formFields[4]]["state"]}
                            >
                                <ControlLabel>Age*</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter your age"
                                    name={formFields[4]} 
                                    onChange={this.handleFieldValidation}                                      
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[4]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="petsGroup"
                            >
                                <ControlLabel>Do you have any pets?</ControlLabel>
                                <p>
                                    <Checkbox
                                        name={formFields[4]}
                                        checked={this.state.hasPets}
                                        onChange={this.handlePetsCheckbox} 
                                        inline
                                    >I do have pets</Checkbox>
                                </p>
                            </FormGroup>

                            <FormGroup
                                controlId="tenantsNumGroup"
                                validationState={validationStatus[formFields[6]]["state"]}
                            >
                                <ControlLabel>Number of tenants*</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter the number of tenants"
                                    name={formFields[6]}
                                    onChange={this.handleFieldValidation}                                      
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[6]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="spaceGroup"
                                validationState={validationStatus[formFields[7]]["state"]}
                            >
                                <ControlLabel>Desired size of the apartment (in square meters)</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter the desired size of the apartment"
                                    name={formFields[7]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[7]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="floorGroup"
                                validationState={validationStatus[formFields[8]]["state"]}
                            >
                                <ControlLabel>Desired floor</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter the desired floor"
                                    name={formFields[8]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[8]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="roomsNumGroup"
                                validationState={validationStatus[formFields[9]]["state"]}
                            >
                                <ControlLabel>Desired number of rooms</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter the desired number of rooms"
                                    name={formFields[9]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[9]]["message"]}</HelpBlock>
                            </FormGroup>

                            <FormGroup
                                controlId="rentPeriodGroup"
                                validationState={validationStatus[formFields[10]]["state"]}
                            >
                                <ControlLabel>Approximate rent period (in months)</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter the rent period"
                                    name={formFields[10]}                                       
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{validationStatus[formFields[10]]["message"]}</HelpBlock>
                            </FormGroup>

                            <p>* this field cannot be empty</p>
                            <ButtonToolbar>
                                <Button type="submit">Register</Button>
                                <Button title="Get help" onClick={this.handleShow}>
                                    <Glyphicon glyph="info-sign" />
                                </Button>

                                <Button title="Get help" onClick={this.handleFormValidation}>
                                    <Glyphicon glyph="info-sign" />
                                </Button>


                                
                            </ButtonToolbar>                    
                        </form> 


                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>About this application</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h4>User registration form {this.props.apiinfo.version}</h4>
                                <p>
                                    This application was developed by {this.props.apiinfo.author}
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </Tab>
                    <Tab eventKey={2} title="Complete list">
                        <Grid style={{width:600}}>
                            <Row>
                                <Col xs={4} sm={4} md={4} lg={4} ><b>Name</b></Col>
                                <Col xs={4} sm={4} md={4} lg={4} ><b>Email</b></Col>
                            </Row>
                            {  this.props.bookings.map(visitor =>
                                <BookingsTableRow
                                    key={visitor.id}
                                    name={visitor.name}
                                    email={visitor.email}
                                />
                            )
                            }
                        </Grid>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

Registration.propTypes = {
    apiinfo: PropTypes.object.isRequired,
    validation: PropTypes.object.isRequired,
    bookings: PropTypes.array.isRequired
};

export default Registration;
