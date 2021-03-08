import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 4rem;
    margin: 1rem 3rem;

    a {
      color: black;
      text-decoration: none;
    } 
  }

  body {
    background: linear-gradient(to right, #0099cc 0%, #0066ff 100%);
    -webkit-font-smoothing: antialiased
  }
  
  body, input, button {
    font: 16px "Poppins", sans-serif;
  }
  button {
    cursor: pointer;
  }
`;
  