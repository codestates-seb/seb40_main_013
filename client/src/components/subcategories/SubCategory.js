import styled from "styled-components/macro";
import chair from '../../imgs/chair.png'
import SubCarousel from './SubCalousel'

const SubBlock = styled.div`
    width: 100vw;
    height: 1000px;
`;

const Img = styled.img`
    width: 200px;
    height: 200px;
`;

function SubCategory() {
  return(
    <SubBlock>
        <SubCarousel/>
        <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div>
            <div>0 개의 상품이 있습니다</div>
            <div>
                <div>
                    <Img src={chair} alt='파란색 스툴'/>
                    <div>루피스톨</div>
                    <div></div>
                    <div>
                        <div>소프시스</div>
                        <div>16,000</div>
                    </div>
                </div>
            </div>
        </div>
    </SubBlock>
  )
}
export default SubCategory;