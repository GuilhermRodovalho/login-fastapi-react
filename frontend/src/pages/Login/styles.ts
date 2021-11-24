import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 20%;
  min-height: 30%;

  background-color: #F4F3F3;
  color: #301B52;

  border-radius: 20px;

  border: 2px solid #BDBDBD;
`

export const CardContent = styled.div`
  margin: 15px 30px;

  h1 {
    font-size: 36px;
    margin-left: 8px;
    padding-bottom: 14px;
  }

  form {
    display: flex;
    flex-direction: column;
    /* flex: 1; */

    .buttons {
      display: flex; 
      justify-content: space-between;

      margin-top: 8px;
    }

  }
`


