import './App.css';
import Navigation from './Components/navigation/Navigation';
import Logo from './Components/logo/Logo';
import Imageform from './Components/ImageForm/Imageform';
import TitleMessage from './Components/TitleMessage/TitleMessage';
import ParticlesDemo from './ParticlesDemo'

function App() {
  return (
    <div className="App">
      <ParticlesDemo/>
      <Navigation />
      <Logo />
      <TitleMessage />
      <Imageform/>
      {/* <FaceDetection /> */}
    </div>
  );
  }

export default App;
