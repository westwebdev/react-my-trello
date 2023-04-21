import React from 'react';
import { Image, keyframes, Link, usePrefersReducedMotion } from '@chakra-ui/react';
import logo from './logo.svg';

const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const Logo = props => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const animation = prefersReducedMotion
        ? undefined
        : `${spin} infinite 20s linear`;

    return (
        <Image
            width='30px'
            height='30px'
            animation={animation}
            src={logo}
            {...props}
        />
    );
};

export default Logo;