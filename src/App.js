import React,{Component} from 'react'
import './App.css';
import Navigation from './Components/navigation/Navigation';
import Logo from './Components/logo/Logo';
import Imageform from './Components/ImageForm/Imageform';
import TitleMessage from './Components/TitleMessage/TitleMessage';
import FaceDetection from './Components/FaceDetection/FaceDetection';
import ParticlesDemo from './ParticlesDemo'



class App extends Component  {
  constructor()
  {
    super();
    this.state = {
      input : '',
      imageUrl: ''
    }
  }

  OnInputChange = (event) =>
  {
    if(event.target.value !== '' )
    {
      this.setState({ input: event.target.value });
    }
    
  }

  OnButtonSubmit = (event) =>
  {
    this.setState({imageUrl: this.state.input});
    
    const PAT = 'ad029ad1c39740ca8f7879cf2e8200f7';
    const USER_ID = 'asiyil-k';
    const APP_ID = 'faceRecogTest';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = this.state.input;
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(res => console.log(res.outputs[0].data.regions[0].region_info.bounding_box))

  }

  render(){
    return (
      <div className="App">
        <ParticlesDemo/>
        <Navigation />
        <Logo />
        <TitleMessage />
        <Imageform OnInputChange={this.OnInputChange} OnButtonSubmit={this.OnButtonSubmit} />
        <FaceDetection imageUrl={this.state.imageUrl} />
      </div>
    );}
  }

export default App;
