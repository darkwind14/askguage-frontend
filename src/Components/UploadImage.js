import React, {Component, PropTypes} from 'react'
import Dropzone from 'react-dropzone'
import Config from '../Configs/AppSetting'

export default class UploadImage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this)
        const {file, onChange, fileName} = this.props
        let imageUrl = Config.URL+'/containers/images/download/'+fileName
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={onChange}>
                        <img src={file[0] ? file[0].preview : imageUrl} style={{width: '100%', height:'100%'}} alt=""/>
                    </Dropzone>
                </div>
            </section>
        );
    }
}
