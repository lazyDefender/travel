import React, { useState } from 'react';
import { CardMedia, makeStyles } from '@material-ui/core';
import classnames from 'classnames';

const useStyles = makeStyles({
  cardMedia: {
    objectFit: 'contain',
  },
});

export const ImageWithFallback = (props) => {
    const {
        alt,
        title,
        image,
        onError,
        height,
    } = props;
    const [wasImageError, setWasImageError] = useState(false);

    const classes = useStyles();

    const onImageError = (e) => {
        setWasImageError(true)
        onError(e)
    };
    
    const cardMediaClassName = classnames({
        [classes.cardMedia]: wasImageError,
    });

    return <CardMedia
                className={cardMediaClassName}
                component="img"
                alt={alt}
                image={image}
                title={title}
                onError={onImageError}
                height={height}
            />;
};
