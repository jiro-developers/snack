import React, {SetStateAction} from 'react';

import {AiOutlineCheck} from "react-icons/ai";
import styled from 'styled-components';

interface Props {
    items: {
        alt: string;
        src: string;
    }[];
    setSelectItem: React.Dispatch<SetStateAction<string[]>>;
    selectItem: string[];
}

const Items: React.FC<Props> = (props) => {
    const {items, selectItem, setSelectItem} = props;

    const handleSelectItem = (event: React.MouseEvent<HTMLDivElement>) => {
        const clickedItem = event.currentTarget.textContent as string;

        setSelectItem((prev) => {
            if (prev.includes(clickedItem)) {
                return prev;
            }

            return [...prev, clickedItem];
        });
    };

    return (
        <RootWrap>
            {items.map((item, index) => {
                const {src, alt} = item;
                const isSelected = selectItem.includes(item.alt);

                return (
                    <ItemWrap key={index} onClick={handleSelectItem}>
                        {isSelected && <DivWrap>
                            <AiOutlineCheck color={'rgb(97, 67, 255)'}/>
                        </DivWrap>}
                        <ImageWrap src={src} alt={alt}/>
                        <Discription>{alt}</Discription>
                    </ItemWrap>
                );
            })}
        </RootWrap>
    );
}
    ;

    export default Items;

    const RootWrap = styled.div`
      display: flex;
      gap: 40px;
      flex-wrap: wrap;
      justify-content: center;

      margin-top: 20px;
    `;

    const ItemWrap = styled.div`
      position: relative;
      display: flex;
      flex-direction: column;
      width: 200px;
      height: 268px;

      cursor: pointer;
    `;

    const DivWrap = styled.div`
      position: absolute;
      right: 10px;
      top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: 1px solid rgb(97, 67, 255);
      background-color: #fff;
    `;

    const ImageWrap = styled.img`
      width: 200px;
      height: 200px;
      object-fit: contain;
    `;

    const Discription = styled.div`
      margin-top: 16px;
    `;
