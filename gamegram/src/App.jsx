import FileUpload from "./Components/FileUpload";
import { FileUploadProvider } from "./Contexts/fFileUploadContext";
import { FileUpProvider } from "./Contexts/FileUploadContext";
import MainRoutes from "./Routes";


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
