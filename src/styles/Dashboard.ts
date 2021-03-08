import styled from 'styled-components'

export const Dashboard = styled.div`
  margin: 1rem 3rem;

  h1 {
    margin: 1rem 0;
    color: #fff;
  }
  h3{
    margin-left: 1rem;
    color: #fff;
  }
`
export const ListDevices = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 3rem;
  width: 100%;
`

export const Device = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 200px;
  width: 200px;
  border-radius: 30px;
  background-color: #324368;
  margin-right: 30px;
  margin-bottom: 40px;

  strong {
    margin: 12px 0 8px 0;
    font-size: 24px;
    color: #fff;
  }

  p {
    font-size: 18px;
  }

  svg {
    display: block;
    margin: 0 auto;
  }
`