import Dropdown from "./Components/dropDown";
import FileUpload from "./Components/FileUpload";
import Navbar from "./Components/navbar";
import { FileUploadProvider } from "./Contexts/fFileUploadContext";
import { FileUpProvider } from "./Contexts/FileUploadContext";
import MainRoutes from "./Routes";
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")


const App = () => {
  return (
    <div>
      <FileUploadProvider>
        <FileUpProvider>
        
          <FileUpload/>
          <MainRoutes />
        </FileUpProvider>
      </FileUploadProvider>

    </div>
  )
}

export default App;
