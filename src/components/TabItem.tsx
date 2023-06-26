'use client';
import React, {SetStateAction, useEffect, useState} from 'react';

import styled from 'styled-components';

interface Props {
    setItem: React.Dispatch<SetStateAction<'snack' | 'drink'>>;
    item: string;
}

const TabItem: React.FC<Props> = (props) => {
    const {item, setItem} = props;
    const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});

    const isSnackClicked = item === 'snack';
    const isDrinkClicked = item === 'drink';


    useEffect(() => {
        const handleScroll = () => {
            setScrollPositions((prevPositions) => ({
                ...prevPositions,
                [item]: window.scrollY,
            }));
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [item]);

    useEffect(() => {
        window.scrollTo(0, scrollPositions[item] || 0);
    }, [item, scrollPositions]);

    return (
        <RootWrap>
            <ButtonWrap
                value="과자"
                $isClicked={isSnackClicked}
                onClick={() => {
                    setItem('snack');
                }}
            >
                과자
            </ButtonWrap>
            <ButtonWrap
                value="음료"
                $isClicked={isDrinkClicked}
                onClick={() => {
                    setItem('drink');
                }}
            >
                음료
            </ButtonWrap>
        </RootWrap>
    );
};

export default TabItem;

const RootWrap = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  height: 68px;
  border-bottom: 1px solid #eef0f1;
  z-index: 1;
`;

const ButtonWrap = styled.button<{ $isClicked: boolean }>`
  width: 100%;
  background-color: ${({$isClicked}) => ($isClicked ? '#fff' : '#f3f5f7')};
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  padding: 0;
  border: none;
  cursor: pointer;
`;
