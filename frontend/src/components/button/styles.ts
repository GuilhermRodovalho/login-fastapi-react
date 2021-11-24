import styled from "styled-components";

export const Container = styled.button`
  /* width: 100px; */

  border: none;
  border-radius: 100px;

  background-color: #301B52;

  color: #FFFFFF;
  padding: 10px 18px;
  font-weight: bold;

  /* margin-left: 8px; */
  
  & + button {
    background-color: #DB0916;
    margin-left: 8px;
  }

  a {
    text-decoration: none;
    color: #FFFFFF;
  }
`;