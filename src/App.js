import React,{Component} from 'react'
import './App.css';
import Navigation from './Components/navigation/Navigation';
import Logo from './Components/logo/Logo';
import Imageform from './Components/ImageForm/Imageform';
import TitleMessage from './Components/TitleMessage/TitleMessage';
import FaceDetection from './Components/FaceDetection/FaceDetection';
import ParticlesDemo from './ParticlesDemo';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';



class App extends Component  {
  constructor()
  {
    super();
    this.state = {
      input : '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  CalculateFaceLocation = (data) =>
  {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftB: clarifaiFace.left_col * width
      ,topB: clarifaiFace.top_row * height
      ,rightB: width - (clarifaiFace.right_col * width)
      ,bottomB: height - (clarifaiFace.bottom_row * height)
    };
  }

  displayBox = (boxdata) =>{
    this.setState({box:boxdata});
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

    let data
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(res => this.displayBox(this.CalculateFaceLocation(res)))
      .catch(err => console.log(err))

  }

  onRouteChange = (newRoute) => {
    console.log(`comparing ${newRoute} with ${this.state.route}`)
    if(newRoute == 'home'){
      this.setState({isSignedIn:true});
    }else if(newRoute === 'register' || newRoute === 'signin'){
      this.setState({isSignedIn:false});
    }
    this.setState({route:newRoute})
    
  }

  render(){
    const { route , isSignedIn , imageUrl , box } = this.state;
    return (
      <div className="App">
        <ParticlesDemo/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          route === 'home'?
            <React.Fragment>
              <Logo />
              <TitleMessage />
              <Imageform OnInputChange={this.OnInputChange} OnButtonSubmit={this.OnButtonSubmit} />
              <FaceDetection box={box} imageUrl={imageUrl} />
            </React.Fragment>
            :route === 'signin'?
              <SignIn onRouteChange={this.onRouteChange} />
              :<Register onRouteChange={this.onRouteChange}/>
        }

      </div>
    );}
  }

export default App;
