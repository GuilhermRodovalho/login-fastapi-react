import styled from 'styled-components'

export const Container = styled.div`
  /* height: 100vh; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 40px;

  min-width: 30%;

  background-color: #F4F3F3;
  color: #301B52;

  border-radius: 20px;

  border: 2px solid #BDBDBD;
`

export const CardContent = styled.div`
  margin: 15px 20px;

  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 0px 20px;
  
  justify-content: space-between;

  h1 {
    margin-left: 8px;
    padding-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;

    .buttons {
      display: flex; 
      flex-direction: row;
      justify-content: space-between;

      margin-top: 8px;


    }
  }
`