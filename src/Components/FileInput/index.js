import React, {Component} from 'react';
import './styles.css'
import ipfs from "../../Utils/ipfs";

export default class FileInput extends Component {
  state = {
    fileID: "fileInput",
    buffer: [],
  };

  ofFileChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => this.convertToBuffer(reader);
      this.setState({
        name: file.name,
      });
    }
  };

  convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    this.setState({buffer});
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.props.isLoading(true);
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      this.props.onHashRecieved(ipfsHash[0].hash);
      this.props.isLoading(false);
    })
  };

  render() {
    return (
        <div className="block">
          <h3> Choose file to send to IPFS </h3>
          <div className="upload-btn-wrapper">
            <button>Upload a file</button>
            <input type="file" name="myfile" id={this.state.fileID} onChange = {this.ofFileChange}/>
            {this.state.name ?
                <p className="selected-file">Selected: {this.state.name}</p>
                : ''
            }
            <button
                onClick = {this.onSubmit}
                disabled={!this.state.buffer.length}
                className={ this.state.buffer.length ? 'active' : ''}
            >Send it</button>
          </div>
        </div>
    );
  }
}

