import React, { Component } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import 'antd/dist/antd.css';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default class UploadImage extends Component {
  state = {
    loading: false,
    token: ''
  };

  componentDidMount () {
    let token = localStorage.getItem('auth')
    
    this.setState({token})
  }

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      console.log(info.file.response.file);
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
      this.props.handleImageUpdate(info.file.response.file)
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Upload
        name="image"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={process.env.REACT_APP_API + "admin/upload"}
        headers={{ Authorization: "Bearer "+ this.state.token}}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {(this.props.image || imageUrl) ? (
          <img src={imageUrl ? imageUrl : process.env.REACT_APP_IMAGE_PATH + this.props.image} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
