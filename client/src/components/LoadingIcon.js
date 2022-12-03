import styled from "styled-components/macro";

function LoadingIcon() {
    return(
        <Wapper>
            <IconBlock>
                <Stick>
                    <div></div>
                    <div></div>
                    <div></div>
                </Stick>
            </IconBlock>
        </Wapper>
    )
};

export default LoadingIcon;

const Wapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const IconBlock = styled.div`
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: #ffffff;
`;

const Stick = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
    div { 
        position: absolute; 
        width: 30px;
        box-sizing: content-box;
    }
    div:nth-child(1) {
        left: 35px;
        background: #002c6d;
        animation: ldio-byqhwutcwy9-1 0.9174311926605504s cubic-bezier(0,0.5,0.5,1) infinite;
        animation-delay: -0.1834862385321101s
    }
    div:nth-child(2) {
        left: 85px;
        background: #ffaf51;
        animation: ldio-byqhwutcwy9-2 0.9174311926605504s cubic-bezier(0,0.5,0.5,1) infinite;
        animation-delay: -0.09174311926605505s
    }   
    div:nth-child(3) {
        left: 135px;
        background: #aaaaaa;
        animation: ldio-byqhwutcwy9-3 0.9174311926605504s cubic-bezier(0,0.5,0.5,1) infinite;
        animation-delay: undefineds
    }
    @keyframes ldio-byqhwutcwy9-1 {
        0% { top: 36px; height: 128px }
        50% { top: 60px; height: 80px }
        100% { top: 60px; height: 80px }
    }
    @keyframes ldio-byqhwutcwy9-2 {
        0% { top: 41.99999999999999px; height: 116.00000000000001px }
        50% { top: 60px; height: 80px }
        100% { top: 60px; height: 80px }
    }
    @keyframes ldio-byqhwutcwy9-3 {
        0% { top: 48px; height: 104px }
        50% { top: 60px; height: 80px }
        100% { top: 60px; height: 80px }
    }
`;

/* generated by https://loading.io/ */