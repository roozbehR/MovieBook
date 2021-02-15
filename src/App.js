import './App.css';
import { Images } from "./themes";
import styled from 'styled-components';

function App() {
  return (
      <BackgroundWrapper>
        hello
      </BackgroundWrapper>
  );
}

const BackgroundWrapper = styled.div`
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-image: linear-gradient(rgba(0, 0, 0, 0.43), rgba(0, 0, 0, 0.43)),
    url(${Images.movieBackground});
`;

export default App;
