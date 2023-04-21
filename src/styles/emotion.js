import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 10px 1px #134c76;
  border-radius: 7px;
  background: white;
  // min-width: 440px;
  // min-height: 320px;
  padding: 10px;
`;

export const StyledCard = styled.div`
    display: flex;
    align-items:center;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
    margin: 40px 0;
    padding: 60px;
    flex-direction: ${({ layout }) => layout || 'row'};

    img{
        width: 80%;
    }

    &>div{
        flex:1;
    }

    @media(max-width: ${({ theme }) => theme.mobile}){
        flex-direction: column;
    }
`;


export const Button = styled.button`
    border-radius: 50px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 15px 60px;
    background-color: ${({ bg }) => bg || '#fff'};
    color: ${({ color }) => color || '#333'};
    &:hover {
        opacity: 0.9;
        transform: scale(0.98);
    }
`