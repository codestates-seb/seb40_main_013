import styled from "styled-components/macro";
import chair from '../../imgs/chair.png'
import chair2 from '../../imgs/chair2.png'
import chair3 from '../../imgs/chair3.png'
import chair4 from '../../imgs/chair4.png'
import desk from '../../imgs/desk.png'
import shelf from '../../imgs/shelf.png'
import room from '../../imgs/room.jpg'
import SubCarousel from './SubCalousel'

const SubBlock = styled.div`
    margin: 30px 40px;
    div{
        display: flex;
    }
    .sub-menus{
        margin: 20px 0px;
        justify-content: space-between;
    }
`;

const Sub = styled.div`
    width: 200px;
    height: 120px;
    background-color: #F6F4E7;
    &:hover{
        background-color: #E1DFCE;
    }
    img {
        width: 70px;
        height: 70px;
        margin-bottom: 7px;
    }
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Img = styled.img`
    width: 200px;
    height: 200px;
`;

const Products = styled.div`
    width: 100%;
    flex-direction: column;
    .total{
        margin: 15px 0px;
        font-weight: 600;
        font-size: 20px;
    }
    .goods{
        flex-wrap : wrap
    }
`;

const Goods = styled.div`
    margin: 10px;
    flex-direction: column;
    div{
        margin-top: 5px;
    }
    .price{
        justify-content: space-between;
    }
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

function SubCategory() {
  return( 
    <SubBlock>
        <SubCarousel/>
        <div className="sub-menus">
            <Sub>
                <img src={room}></img>
                <div>전체보기</div>
            </Sub>
            <Sub>
                <img src={desk}></img>
                <div>책상</div>
            </Sub>
            <Sub>
                <img src={shelf} alt='선반 카테고리'></img>
                <div>선반</div>
            </Sub>
            <Sub>
                <img src={chair}></img>
                <div>의자</div>
            </Sub>
        </div>
        <Products>
            <div className="total">0 개의 상품이 있습니다</div>
            <div className="goods">
                <Goods>
                    <Img src={chair2} alt='파란색 스툴'/>
                    <div>루피스톨</div>
                    <Color>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Color>
                    <div className="price">
                        <span>소프시스</span>
                        <span>16,000</span>
                    </div>
                </Goods>
                <Goods>
                    <Img src={chair3} alt='파란색 스툴'/>
                    <div>루피스톨</div>
                    <Color>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Color>
                    <div className="price">
                        <span>소프시스</span>
                        <span>16,000</span>
                    </div>
                </Goods>
                <Goods>
                    <Img src={chair4} alt='파란색 스툴'/>
                    <div>루피스톨</div>
                    <Color>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Color>
                    <div className="price">
                        <span>소프시스</span>
                        <span>16,000</span>
                    </div>
                </Goods>
                <Goods>
                    <Img src={chair} alt='파란색 스툴'/>
                    <div>루피스톨</div>
                    <Color>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Color>
                    <div className="price">
                        <span>소프시스</span>
                        <span>16,000</span>
                    </div>
                </Goods>
                <Goods>
                    <Img src={chair} alt='파란색 스툴'/>
                    <div>루피스톨</div>
                    <Color>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Color>
                    <div className="price">
                        <span>소프시스</span>
                        <span>16,000</span>
                    </div>
                </Goods>
                <Goods>
                    <Img src={chair} alt='파란색 스툴'/>
                    <div>루피스톨</div>
                    <Color>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Color>
                    <div className="price">
                        <span>소프시스</span>
                        <span>16,000</span>
                    </div>
                </Goods>
            </div>
        </Products>
    </SubBlock>
  )
}
export default SubCategory;