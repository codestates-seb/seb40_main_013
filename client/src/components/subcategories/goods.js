import styled from "styled-components/macro";


const GoodsBlock = styled.div`

margin: 10px;
flex-direction: column;
div{
    margin-top: 5px;
}
.brand{
    justify-content: space-between;
    font-size: 13px;
    .price{
        font-size: 13px;
    }
}
`;

const Img = styled.img`
    width: 200px;
    height: 200px;
`;

const Color = styled.div`
    display: flex;
    justify-content: end;
    span{
        width: 10px;
        height: 10px;
        background-color: blue;
        border-radius: 50%;
        margin-left: 2px;
    }
`;

function Goods({img}) {
    return(
        <GoodsBlock>
        <Img src={img} alt='파란색 스툴'/>
        <div>루피스톨</div>
        <Color>
            <span></span>
            <span></span>
            <span></span>
        </Color>
        <div className="brand">
            <span>소프시스</span>
            <span className="price">16,000</span>
        </div>
    </GoodsBlock>
    )
}

export default Goods;