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

  background-color: #F4F3F3;
  color: #301B52;

  border-radius: 20px;

  border: 2px solid #BDBDBD;
`

export const CardContent = styled.div`
  margin: 15px 25px;

  h1 {
    font-size: 24px;
    margin-left: 0px;
    padding-bottom: 12px;
  }

  form {
    display: flex;
    flex-direction: column;

    .buttons {
      display: flex; 
      justify-content: space-between;

      /* margin-left: -8px; */
      /* margin-right: 8px; */
    }

  }
`

export const Button = styled.button``


