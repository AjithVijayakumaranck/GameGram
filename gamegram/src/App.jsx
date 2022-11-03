import { FileUploadProvider } from "./Contexts/fFileUploadContext";
import { FileUpProvider } from "./Contexts/FileUploadContext";
import MainRoutes from "./Routes";


const App = () => {
  return (
    <div>
      <FileUploadProvider>
        <FileUpProvider>
          <MainRoutes />
        </FileUpProvider>
      </FileUploadProvider>

    </div>
  )
}

export default App;
