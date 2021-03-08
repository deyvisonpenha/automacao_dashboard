import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 350px;
  width: 50%;
  border-radius: 30px;
  background-color: #fff;
  margin: 0 auto;

  form {
   margin-top: 50px;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
   
    .MuiFormControl-root {
      width: 400px;
      margin-bottom: 20px;
    }
    button {
      margin-top: 24px;
      margin-right: auto;
    }
  }

`