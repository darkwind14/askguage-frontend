import React, {Component} from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import Icon from '../../../../assets/images/avatar.svg'
import Config from '../../../../configs/AppSetting'
import Rating from 'react-rating'
import StarEmpty from '../../../../assets/images/icons/star-empty.svg'
import StarFull from '../../../../assets/images/icons/star-full.svg'

function Input(props) {
    return (
        <div className="row">
            <div className="col-md-3 col-6">
                <p className="title">{props.label}</p>
            </div>
            <div className="col-md-9 col-6">
                {props.children}
            </div>
        </div>
    )
}

function MortgageView({item}) {
    return (
        <div className="bid-details">
            <p>
                Based on your stated Income and liabilities,
                <b> {item.provider.firstName}</b> provided the following quote:
            </p>
            <div className="options">
                <div className="row">
                    <div className="col-md-3 col-6">
                        <p className="title">Mortgage Amount:</p>
                    </div>
                    <div className="col-md-9 col-6">
                        <p className="description">
                            <NumberFormat
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                value={item.mortgageAmount}
                            />
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3 col-6">
                        <p className="title">Interest Rate:</p>
                    </div>
                    <div className="col-md-9 col-6">
                        {
                            item.options.map((opt, i) => (
                                <p className="description" key={i}>{<CheckMortgageTerm item={opt.mortgageTerm}/>}
                                    &nbsp;Years {opt.mortgageType === 0 ? 'Variable' : 'Fixed'}
                                    &nbsp;Term Mortgage for {opt.interestRate} %</p>
                            ))
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3 col-6">
                        <p className="title">Amortization:</p>
                    </div>
                    <div className="col-md-9 col-6">
                        {
                            item.options.map((opt, i) => (
                                <p className="description" key={i}>{<CheckArmo item={opt.amortization}/>} Years</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function EstateView({item}) {
    return (
        <div className="bid-details">
            <p>
                <b> {item.provider.firstName}</b> has recommended you the following neighbourhood(s), property type,
                square feet and average home price for you to consider based on your preference and situation
            </p>
            <div className="options">
                <Input
                    label="Commission Fee:"
                >
                    <p className="description">{item.commissionFee}%</p>
                </Input>

                <Input
                    label="Property Type:"
                >
                    {
                        item.options.map((opt, i) => (
                            <p className="description" key={i}><CheckPropertyType item={opt.propertyType}/></p>
                        ))
                    }
                </Input>

                <Input
                    label="Neighbourhood:"
                >
                    {
                        item.options.map((opt, i) => (
                            <p className="description" key={i}><CheckPropertyType item={opt.neighbourhood}/></p>
                        ))
                    }
                </Input>

                <Input
                    label="Square Ft:"
                >
                    {
                        item.options.map((opt, i) => (
                            <p className="description" key={i}>{opt.squareFT}</p>
                        ))
                    }
                </Input>

                <Input
                    label="Avg Price:"
                >
                    {
                        item.options.map((opt, i) => (
                            <p className="description" key={i}>
                                <NumberFormat
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    value={opt.price}
                                />
                            </p>
                        ))
                    }
                </Input>

            </div>
        </div>
    )
}

function CheckPropertyType({item}) {
    if (item == 0)
        item = 'Detached House'
    if (item == 1)
        item = 'Semi Detached'
    if (item == 2)
        item = 'Town House'
    if (item == 3)
        item = 'Condo'
    return <span>{item}</span>
}

function CheckMortgageTerm({item}) {
    if (item == 0)
        item = 1
    if (item == 1)
        item = 3
    if (item == 2)
        item = 5
    return <span>{item}</span>
}

function CheckArmo({item}) {
    if (item == 0)
        item = 10
    if (item == 1)
        item = 15
    if (item == 2)
        item = 20
    if (item == 3)
        item = 25
    return <span>{item}</span>
}

class BidInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            myBid: {
                callback: {
                    availableDate: '',
                    availableTime: ''
                },
                status: 0
            },
            isBiding: true,
            isError: false
        }
    }

    doBid(item, myBid, isBid) {
        isBid({isBid: true})
        let data = {
            ...myBid,
            status: 2
        }
        axios.patch(Config.URL + `/bids/${item.id}`, data)
            .then((res) => {
                isBid({isBid: false})
            })
    }

    doReject(item, isBid) {
        axios.patch(Config.URL + `/bids/${item.id}`, {status: 1})
            .then((res) => {
                isBid({isBid: true})
            })
    }

    doComplete(item, isBid, request) {
        isBid({isBid: true})
        axios.patch(Config.URL + `/bids/${item.id}`, {status: 3})
            .then((res) => {
                axios.patch(Config.URL + `/customerRequests/${request.id}`, {status: 4})
                    .then((res) => {
                        isBid({isBid: false})
                    })
            })
    }

    render() {
        console.log(this)
        const {item, isBid, request} = this.props
        const {myBid} = this.state
        const bind = (field) => ({
            onChange: (e) => this.setState({
                myBid: {
                    ...myBid,
                    callback: {
                        ...myBid['callback'],
                        [field]: e.target.value
                    }
                }
            })
        })

        return (
            <div className="row">
                {
                    !this.props.bidFetched && <div className="loading">Loading&#8230;</div>
                }
                <div className="col-md-2">
                    <img
                        src={item.provider.avatarUrl ? Config.URL + `/containers/images/download/${item.provider.avatarUrl}` : Icon}
                        alt=""
                        className="provider-avatar"
                    />
                </div>
                <div className="col-md-7">
                    <div className="provider-info">
                        <p className="intro">Quote from <b>{item.provider.firstName}</b></p>
                        <div className="details">
                            <div style={{display: 'inline'}}>
                                                <span className="rating-count">
                                                    <p style={{marginTop: '3px'}}>3.5</p>
                                                </span>
                                <div style={{display: 'inline-block', position: 'absolute', top: '25px'}}>
                                    <Rating
                                        fullSymbol={<img src={StarFull} alt=""/>}
                                        emptySymbol={<img src={StarEmpty} alt=""/>}
                                        fractions={2}
                                        initialRating={3.5}
                                        readonly={true}
                                    />
                                </div>
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: '131px'
                                    }}>({item.provider.profiles.yearOfExperience}
                                    &nbsp;years of experience)</span>
                            </div>
                            <p>{(item.provider.profiles.kindOfService == 0 || item.provider.profiles.kindOfService == 2 || item.provider.profiles.kindOfService == 3) ? 'Real Estate Agent' : 'Mortgage Advisor'}</p>
                        </div>
                    </div>
                    {
                        (item.provider.profiles.kindOfService == 0 || item.provider.profiles.kindOfService == 2 || item.provider.profiles.kindOfService == 3) ?
                            <EstateView item={item}/>
                            : <MortgageView
                                item={item}
                            />
                    }
                </div>

                <div className="col-md-3">
                    <div className="callback">
                        {
                            item.status === 0
                            &&
                            <div>
                                <p htmlFor="">Select call back preference</p>
                                <div className="row">
                                    <div className="col-6">
                                        <select className="custom-select"
                                                {...bind('availableDate')}
                                        >
                                            <option value=""></option>
                                            <option value="0">Weekday</option>
                                            <option value="1">Weekend</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <select className="custom-select"
                                                {...bind('availableTime')}
                                        >
                                            <option value=""></option>
                                            <option value="0">Morning</option>
                                            <option value="1">Afternoon</option>
                                            <option value="2">Evening</option>
                                        </select>
                                    </div>
                                </div>
                                <CallBackActions
                                    disabled={myBid.callback.availableDate === '' || myBid.callback.availableTime === ''}
                                    doBid={this.doBid.bind(this, item, myBid, isBid)}
                                    doReject={this.doReject.bind(this, item, isBid)}
                                />
                            </div>
                        }

                        {
                            item.status === 1
                            &&
                            <p>Call back rejected</p>
                        }

                        {
                            item.status === 2
                            &&
                            <div>
                                <p htmlFor="">Call back submitted</p>
                                <CallBackDetails
                                    a={item.callback.availableDate}
                                    b={item.callback.availableTime}
                                />
                                <div className="row">
                                    <div className="col-12">
                                        <button className="btn btn-reject"
                                                onClick={this.doComplete.bind(this, item, isBid, request)}
                                        >
                                            Mark as complete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            item.status === 3
                            &&
                            <p>Call back completed</p>
                        }
                    </div>
                </div>

                <div className="col-12">
                    <div className="line"></div>
                </div>
            </div>
        )
    }
}

function CallBackActions({doBid, doReject, disabled}) {
    return (
        <div className="row">
            <div className="col-12">
                <button className="btn btn-submit"
                        onClick={doBid}
                        disabled={disabled}
                >Submit for call back
                </button>
            </div>
            <div className="col-12">
                <button className="btn btn-reject"
                        onClick={doReject}
                >Reject
                </button>
            </div>
        </div>
    )
}

function CallBackDetails({a, b}) {
    if (a === 0)
        a = 'Weekday'
    if (a === 1)
        a = 'Weekend'
    if (b === 0)
        b = 'Morning'
    if (b === 1)
        b = 'Afternoon'
    if (b === 2)
        b = 'Evening'
    return <label htmlFor="">{a}, {b}</label>
}

export default BidInfo