import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import Autocomplete from 'react-google-autocomplete'
import moment from 'moment'
import Select from 'react-select';

function Input(props) {
    return (
        <div className="col-md-6 col-12">
            <div className="row">
                <div className="col-md-4 ">
                    <label className={props.class ? props.class : "col-form-label"}>{props.label}</label>
                    {props.tooltip &&
                    <span className="question-mark-icon opt-in-mark"
                          data-toggle="tooltip"
                          title="By opting in, you are subscribing and agreeing to receive news and special offers from Ask Gauge Inc."
                    ></span>}
                </div>
                <div className="col-md-8">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default class AdvanceInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: (props.user.profiles.languages && props.user.profiles.languages.length !== 0) ? props.user.profiles.languages : [],
            options: [
                {value: '0', label: 'Chinese'},
                {value: '1', label: 'Cantonese'},
                {value: '2', label: 'Italian'},
                {value: '3', label: 'Spanish'},
                {value: '4', label: 'Tagalog'},
                {value: '5', label: 'Tamil'},
                {value: '6', label: 'Mandarin'},
                {value: '7', label: 'Portuguese'},
                {value: '8', label: 'Persian'},
                {value: '9', label: 'Urdu'},
                {value: '10', label: 'Russian'},
                {value: '11', label: 'Korean'},
                {value: '12', label: 'Greek'},
                {value: '13', label: 'Gujarati'},
                {value: '14', label: 'Polish'},
                {value: '15', label: 'Arabic'},
                {value: '16', label: 'Bengali'},
                {value: '17', label: 'Vietnamese'},
                {value: '18', label: 'Panjabi (Punjabi)'},
                {value: '19', label: 'German'},
            ]
        }
    }

    handleSelectChange(value) {
        const {user, onChange} = this.props

        this.setState({
            value: value,
        }, () => onChange({
            ...user,
            profiles: {...user["profiles"], languages: this.state.value}
        }));
    }

    render() {
        const {user, onChange, onChangeLanguage, formFields} = this.props
        const bind = (field) => ({
            value: user['profiles'][field],
            onChange: (e) => onChange({...user, profiles: {...user['profiles'], [field]: e.target.value}})
        })
        // console.log(this)

        return (
            <div>
                <div className="form-group row">
                    <Input
                        label="What languages do you speak?"
                    >
                        <Select
                            options={this.state.options}
                            multi={true}
                            value={this.state.value}
                            onChange={this.handleSelectChange.bind(this)}
                        />
                    </Input>
                    <Input
                        label="Opt In"
                        tooltip={true}
                        class="col-form-label opt-in"
                    >

                        <div className="group-check-boxes">
                            <label className="col-md-6 custom-control custom-radio">
                                <input type="radio" className="custom-control-input"
                                       value='1'
                                       name='optIn'
                                       defaultChecked={user["profiles"]["optIn"] === 1 ? true : user["profiles"]["optIn"] !== 0}
                                       onChange={(e) => onChange({
                                           ...user,
                                           profiles: {...user.profiles, optIn: 1}
                                       })}
                                />

                                <span className="custom-control-indicator"></span>
                                <span className="custom-control-description custom-label">Yes</span>
                            </label>
                            <label className="col-md-6 custom-control custom-radio">
                                <input type="radio" className="custom-control-input"
                                       value='0'
                                       name='optIn'
                                       defaultChecked={user["profiles"]["optIn"] === 0}
                                       onChange={(e) => onChange({
                                           ...user,
                                           profiles: {...user.profiles, optIn: 0}
                                       })}
                                />
                                <span className="custom-control-indicator"></span>
                                <span className="custom-control-description custom-label">No</span>
                            </label>
                        </div>
                    </Input>

                </div>
                <div className="form-group row">
                    <Input
                        label="Length of Employment"
                    >
                        <input type="number" className="form-control"
                               {...bind("lengthOfEmployment")}
                        />
                        {
                            !formFields.lengthOfEmpValid && <p className="error-text no-margin">is required</p>
                        }
                    </Input>

                    <Input
                        label="Address"
                    >
                        <Autocomplete className="form-control"
                                      onPlaceSelected={(place) => {
                                          onChange({
                                              ...user,
                                              profiles: {
                                                  ...user.profiles,
                                                  userAddress: {
                                                      address: place.formatted_address,
                                                      lat: place.geometry.location.lat(),
                                                      lng: place.geometry.location.lng()
                                                  }
                                              },
                                          })
                                      }}
                                      onChange={(e) => onChange({
                                          ...user,
                                          profiles: {
                                              ...user.profiles,
                                              userAddress: {
                                                  address: e.target.value,
                                                  lat: '',
                                                  lng: ''
                                              }
                                          },
                                      })}
                                      types={['geocode']}
                                      defaultValue={user['profiles']['userAddress']['address']}
                        >
                        </Autocomplete>
                        {
                            !formFields.addressValid && <p className="error-text no-margin">is required</p>
                        }
                    </Input>
                </div>
                <div className="form-group row">
                    <Input
                        label="Birthday"
                    >
                        {
                            user.profiles.dob !== ''
                                ? <DatePicker
                                    dateFormat="YYYY/MM/DD"
                                    className="form-control"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    selected={moment(user["profiles"]["dob"])}
                                    placeholderText="Select Date"
                                    onSelect={(e) => onChange({...user, profiles: {...user.profiles, dob: e}})}
                                    onChange={(e) => onChange({...user, profiles: {...user.profiles, dob: e}})}
                                />
                                :
                                <DatePicker
                                    dateFormat="YYYY/MM/DD"
                                    className="form-control"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    placeholderText="Select Date"
                                    onSelect={(e) => onChange({...user, profiles: {...user.profiles, dob: e}})}
                                    onChange={(e) => onChange({...user, profiles: {...user.profiles, dob: e}})}
                                />
                        }
                    </Input>

                    <Input
                        label="Gender"
                    >
                        <select className="custom-select"
                                {...bind("sex")}
                        >
                            <option value=""></option>
                            <option value="0">Male</option>
                            <option value="1">Female</option>
                            <option value="2">Other</option>
                            <option value="3">Prefer not to say</option>
                        </select>
                    </Input>

                </div>
                <div className="form-group row">
                    <Input
                        label="Canadian Citizen"
                    >
                        <select className="custom-select"
                                {...bind("citizenship")}
                        >
                            <option value=""></option>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </Input>
                </div>
            </div>
        )
    }
}