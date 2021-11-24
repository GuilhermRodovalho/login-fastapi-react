import styled from "styled-components";

export const Container = styled.input`
  border-radius: 50px;
  width: 100%;
  border: 2px solid #301b52;

  padding: 10px;
  
  & + input {
    margin-top: 8px;
  }
`;