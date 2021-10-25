import styled from 'styled-components';
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import {AddButton} from "../components/AddButton";


export const StyledMain = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    & > ${AddButton} {
            position: fixed;
            bottom: 20px;
            right: 80px;
        }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin-top: 40px;
`;

export const SearchContainer = styled.div`
    position: relative;
    top: 45px;
    left: 0px;
    height: 50px;
    width: 200px;
`;

export const StyledItemDetails = styled(Modal)`
    width: 40%;
    flex-flow: column nowrap;
`;

export const StyledAddView = styled(Modal)`
    width: 60%;
    flex-flow: row nowrap;
    
    & > ${Button} {
        position: absolute;
        bottom: 3%;
        right: 3%;
    }
`;
