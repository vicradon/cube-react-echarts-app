import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Oval heigth="100" width="100" color="#5470C6" ariaLabel="loading" />
    </div>
  );
}

export default Loader;
