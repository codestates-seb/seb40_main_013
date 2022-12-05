import styled from "styled-components/macro";
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from "react";

const DownClick = styled.div`
    margin: 19px 0 7px 0;
    list-style: none;
    cursor: pointer;
    display: flex;
    span{
        margin-right: 5px;
        color: #AAAAAA;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
    }
`;

const CheckBox = styled.div`
    position: absolute;
    right: 7.5vw;
    z-index: 10;
    background-color: white;
    width: 12rem;
    height: 10rem;
    border-radius: 3px;
    box-shadow: 0 1px 5px 0 rgb(0 0 0 / 30%);
    &.closed{
        display: none;
    }
`;

const Radio = styled.li`
    list-style: none;
    cursor: pointer;
    display: flex;
    padding: 0.655rem 1rem;
    color: #515151;
    position: relative;
    span{
        display: flex;
        align-items: center;
    }
    .circle{
        border-radius: 50%;
        width: 0.3em;
        height: 0.3em;
        background-color: white;
        position: relative;
        left: -0.75em;
        top: 0.45em;
        /* z-index: 2; */
    }
`;

const Check = styled.div`
    width: 1.2em;
    height: 1.2em;
    border-radius: 50%;
    border: 1px solid #bdbebe;
    &:hover{
        background-color: #e2e2e3;
        border: 1px solid #939496;
        opacity: 0.5;
    }
    &.checked{
        border: 0;
        background-color: #FFAF51;
    }
`;


function RankingDown({ third, setThird, dropDownclicked, setDropDownClicked, closeDropDown, closeHandler, setPage, setProducts }) {

    const getRadioText = (el, a) => {
        setDropDownClicked(el)
        setThird(a)
        closeHandler()
        setPage(0);
        setProducts([]);
    }

    return (
        <>
          <DownClick onClick={closeHandler}>
            <span>{dropDownclicked}</span>
            <span>
                <IoIosArrowDown/>
            </span>
          </DownClick>
            <CheckBox className={closeDropDown ? '' : 'closed'}>
                <Radio onClick={() => (getRadioText('최신순', 'desc'))} value='0'>
                    <Check className={ dropDownclicked === '최신순' ? 'checked' : ''}/>
                    <div className="circle"></div>
                    <span>최신순</span>
                </Radio>
                <Radio onClick={() => (getRadioText('높은가격순', 'desc'))}>
                    <Check className={ dropDownclicked === '높은가격순' ? 'checked' : '' }/>
                    <div className="circle" ></div>
                    <span>높은가격순</span>
                </Radio>
                <Radio onClick={() => (getRadioText('낮은가격순' , 'asc'))}>
                    <Check className={ dropDownclicked === '낮은가격순' ? 'checked' : ''}/>
                    <div className="circle"></div>
                    <span>낮은가격순</span>
                </Radio>
                <Radio onClick={() => (getRadioText('판매순', 'desc'))}>
                    <Check className={ dropDownclicked === '판매순' ? 'checked' : ''}/>
                    <div className="circle"></div>
                    <span>판매순</span>
                </Radio>
            </CheckBox>
        </>
    );
}

export default RankingDown;