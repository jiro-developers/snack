import React from 'react';

import {AiOutlineClose} from "react-icons/ai";
import styled from 'styled-components';

import {Counter} from '@/components/Counter';
import {useCounter} from '@/hook/useCounter';

interface Props {
    items: {
        alt: string;
        src: string;
    }[];
    item: string;
    onClick: (id: string) => () => void;
}

const ItemListCard: React.FC<Props> = (props) => {
    const {items, item, onClick} = props;
    const {value, componentProps} = useCounter(1, {min: 1, max: Number.MAX_SAFE_INTEGER});

    const images = items.find((list) => {
        const {alt} = list;

        return alt === item;
    });

    return (
        <RootWrap>
            <CardWrap>
                <DivWrap>
                    <Image src={images?.src} alt={images?.alt}/>
                    <Content>
                        <span>{item}</span> {value > 1 && <span>* {value}</span>}
                    </Content>
                </DivWrap>
                <DeleteIcon onClick={onClick(item)}>
                    <AiOutlineClose size={'22px'} color={'#61666B'}/>
                </DeleteIcon>
            </CardWrap>
            <Counter {...componentProps} />
        </RootWrap>
    );
};

export default ItemListCard;

const RootWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  margin: 20px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const CardWrap = styled.div`
  display: flex;
  justify-content: space-between;
  
  height: 64px;
  width: 100%;
`;

const DivWrap = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
`;

const Content = styled.div`
  display: flex;
  align-items: center;

  color: #000;
  font-size: 16px;
  line-height: 160%;

  margin-left: 12px;
`;

const DeleteIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;

  width: 40px;
  height: 40px;

  padding: 8px;
`;
