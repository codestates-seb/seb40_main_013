import styled from "styled-components/macro";
import { IoIosArrowDown } from 'react-icons/io';

const Radio = styled.div`

`;
const Check = styled.div`
    width: 1em;
    height: 1em;
    border-radius: 50%;
    border: 1px solid #999;
`;


function DropDown() {

    const clickHandler = ({target}) => {
        console.log(target.innerText);
    }
    return (
        <>
          <div>
            <span>최신순</span>
            <IoIosArrowDown/>
          </div>
          <ul>
            <li>
                <Check></Check>
                <div>
                    최신순
                </div>
            </li>
            <Radio>
              <input type='radio' id='expensive'></input>
              <label htmlFor="expensive">높은가격순</label>
            </Radio>
            <Radio>
              <input type='radio' id='chip'></input>
              <label htmlFor="chip">낮은가격순</label>
            </Radio>
            <Radio>
              <input type='radio' id='sell'></input>
              <label htmlFor="sell">판매순</label>
            </Radio>
          </ul>
        </>
    );
}

export default DropDown;