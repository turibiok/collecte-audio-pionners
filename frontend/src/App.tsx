import AudioRecoderPage from "./pages/AudioRecoderPage"
import "./index.css"
import { Toaster } from 'react-hot-toast';


function App() {
  
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AudioRecoderPage/> 
    </>
  );
}

export default App;
