import React, {Component} from 'react'
import HomeBuyer from '../MyRequestFields/HomeBuyer'
import PropertyType from '../MyRequestFields/PropertyType'
import Status from '../MyRequestFields/Status'
import {Link} from 'react-router-dom'

class RequestBox extends Component {

    render() {
        return (
            <div>
                {
                    this.props.requests.map((item, key) => {
                        return (
                            <div className="row" key={key}>
                                <Link to={`/view/${item._id}`} className="col-sm-12">
                                    <div className="request-item" style={{cursor: 'pointer'}}>
                                        <div className="row">
                                            <div className="col-sm-2">
                                                <HomeBuyer source={item.profile.lookingTo}/>
                                                <label className="label-header">Posted on Oct, 17, 2017</label>
                                            </div>
                                            <div className="col-sm-2 offset-sm-8">
                                                <button className="btn btn-bid" style={{cursor: 'pointer'}}>5 bids
                                                    received
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-2 col-4">
                                                <div className="d-flex flex-column">
                                                    <label className="label-header">Property type</label>
                                                    <PropertyType source={item.preference.propertyType}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-2 col-4">
                                                <div className="d-flex flex-column">
                                                    <label className="label-header">Location</label>
                                                    <label
                                                        className="label-header content">{item.preference.whereBuy}</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-2 col-4">
                                                <div className="d-flex flex-column">
                                                    <label className="label-header">Status</label>
                                                    <Status source={item.status}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="profile-line"></div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default RequestBox