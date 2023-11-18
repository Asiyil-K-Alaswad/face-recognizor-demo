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

const initialState = {
  input : '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user:{
    id:'',
    name:"",
    email:"",
    entries: 0,
    joined: ''
  }
};

class App extends Component  {
  constructor()
  {
    super();
    this.state = {
      input : '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:{
        id:'',
        name:"",
        email:"",
        entries: 0,
        joined: ''
      }
    }
  }

  LoadUser = (data) =>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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

    fetch("http://localhost:3000/clarifai?input=" + this.state.input)
      .then(response => response.json())
      .then(res => {
        if(res){
          fetch('http://localhost:3000/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:this.state.user.id})})
          .then(res => res.json())
          .then(count => {
            const {id,name,email,joined} = this.state.user;
            this.setState({user:{
              entries:count,
              name,email,joined,id
            }})
          })
        }
        this.displayBox(this.CalculateFaceLocation(res))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (newRoute) => {
    if(newRoute == 'home'){
      this.setState({isSignedIn:true});
    }else if(newRoute === 'register' || newRoute === 'signin'){
      this.setState(initialState);
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
              <TitleMessage userName={this.state.user.name} userEntries={this.state.user.entries}/>
              <Imageform OnInputChange={this.OnInputChange} OnButtonSubmit={this.OnButtonSubmit} />
              <FaceDetection box={box} imageUrl={imageUrl} />
            </React.Fragment>
            :route === 'signin'?
              <SignIn onRouteChange={this.onRouteChange} LoadUser={this.LoadUser}/>
              :<Register onRouteChange={this.onRouteChange} LoadUser={this.LoadUser}/>
        }

      </div>
    );}
  }

export default App;
