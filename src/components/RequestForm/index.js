import React, {Component} from 'react'
import {connect} from 'react-redux';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import FlipWizard from '../FlipPanel/index'
import Layout from '../../containers/App'
import PickHome from './steps/Estate/PickHome'
import LocateHome from './steps/Estate/LocateHome'
import Budget from './steps/Estate/Budget'
import OwnerShip from './steps/OwnerShip'
import InCome from './steps/Income'
import AboutYou from './steps/AboutYou'
import MortgagePickHome from './steps/Mortgage/PickHome'
import MortgageBudget from './steps/Mortgage/Budget'
import MortgageLocateHome from './steps/Mortgage/LocateHome'

class CreateRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLanding: false,
            _request: {
                isEstate: props.app.requestType.estate === true,
                kindOfHome: -1,
                numberOfBedRoom: -1,
                squareFT: -1,
                homeAddress: {
                    address: '',
                    lat: '',
                    lng: ''
                },
                budget: {
                    min: '',
                    max: ''
                },
                areQualified: '',
                ownership: '',
                houseHold: '',
                monthlyLiability: '',
                downPayment: '',
                netAsset: '',
                birthDay: moment(),
                occupationType: '',
                citizenType: '',
                homeValue: '',
                mortgageAmount: '',
                needMore: '',
                mortgageType: ''
            }
        }
        if (props.app.requestType === -1)
            props.history.push('/')
    }

    render() {
        const {app} = this.props

        const {_request} = this.state
        const estateSteps = [
            {
                render: ({onGoNext}) => (
                    <PickHome
                        onGoNext={onGoNext}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.kindOfHome != -1 && _request.numberOfBedRoom != -1 && _request.squareFT != -1}
                    />
                )
            },
            {
                render: ({onGoNext, onGoBack}) => (
                    <LocateHome
                        onGoNext={onGoNext}
                        onGoBack={onGoBack}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.homeAddress.address !== ''}
                    />
                )
            },
            {
                render: ({onGoNext, onGoBack}) => (
                    <Budget
                        onGoNext={onGoNext}
                        onGoBack={onGoBack}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.budget.min !== '' && _request.budget.max !== '' && _request.areQualified !== ''}
                    />
                )
            },
            {
                render: ({onGoNext, onGoBack}) => (
                    <OwnerShip
                        onGoNext={onGoNext}
                        onGoBack={onGoBack}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.ownership !== ''}
                    />
                )
            },
            {
                render: ({onGoNext, onGoBack}) => (
                    <InCome
                        onGoNext={onGoNext}
                        onGoBack={onGoBack}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.houseHold !== '' && _request.downPayment !== '' && _request.monthlyLiability !== '' && _request.netAsset !== ''}
                    />
                )
            },
            {
                render: ({onGoNext, onGoBack}) => (
                    <AboutYou
                        onGoNext={onGoNext}
                        onGoBack={onGoBack}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.birthDay !== '' && _request.citizenType !== '' && _request.occupationType}
                    />
                )
            }
        ]
        const mortgageSteps = [
            {
                render: ({onGoNext}) => (
                    <MortgageBudget
                        onGoNext={onGoNext}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.homeValue !== '' && _request.mortgageAmount !== '' && _request.mortgageType !== '' && _request.needMore !== ''}
                    />
                )
            },
            {
                render: ({onGoNext, onGoBack}) => (
                    <MortgagePickHome
                        onGoNext={onGoNext}
                        onGoBack={onGoBack}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.kindOfHome != -1 && _request.numberOfBedRoom != -1 && _request.squareFT != -1}
                    />
                )
            },
            {
                render: ({onGoNext, onGoBack}) => (
                    <MortgageLocateHome
                        onGoNext={onGoNext}
                        onGoBack={onGoBack}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.homeAddress.address !== ''}
                    />
                )
            },
            {
                render: ({onGoNext, onGoBack}) => (
                    <OwnerShip
                        onGoNext={onGoNext}
                        onGoBack={onGoBack}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.ownership !== ''}
                    />
                )
            },
            {
                render: ({onGoNext, onGoBack}) => (
                    <InCome
                        onGoNext={onGoNext}
                        onGoBack={onGoBack}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.houseHold !== '' && _request.downPayment !== '' && _request.monthlyLiability !== '' && _request.netAsset !== ''}
                    />
                )
            },
            {
                render: ({onGoNext, onGoBack}) => (
                    <AboutYou
                        onGoNext={onGoNext}
                        onGoBack={onGoBack}
                        _request={_request}
                        onChange={(_request) => {
                            this.setState({_request})
                        }}
                        isValid={_request.birthDay !== '' && _request.citizenType !== '' && _request.occupationType}
                    />
                )
            }
        ]

        let steps = app.requestType.estate ? estateSteps : mortgageSteps
        console.log(this)
        return (
            <Layout {...this.state}>
                <div className="container create-request-form">
                    <div className="row">
                        <div className="col-md-8">
                            <FlipWizard
                                initStepIndex={0}
                                steps={steps}
                            />
                        </div>
                        <div className="col-md-4">
                            <div className="flip-panel">
                                <div className="request-intro">
                                    <h3>Need helps</h3>
                                    <p>You need the potential to <br/> design something completely new and fresh.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }

}

export default connect(mapStateToProps)(CreateRequest)