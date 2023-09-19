import React from "react";
import {BackgroundImage, Body, DirectoryItemContainer,} from "./directory-item.style";
import {useNavigate} from "react-router-dom";

export const DirectoryItem = ({category}) => {
    const {imageUrl, title, route} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <Body>
                <h2>{title}</h2>
                <p>Shop now</p>
            </Body>
        </DirectoryItemContainer>
    );
};
