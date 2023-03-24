import { textDecoration } from "@chakra-ui/react";

export default {
    variants: {
        "asButton": {
            display: 'inline-flex',
            appearance: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            position: 'relative',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            outline: '2px solid transparent',
            outlineOffset: '2px',
            lineHeight: '1.2',
            borderRadius: 'var(--chakra-radii-md)',
            fontWeight: 'var(--chakra-fontWeights-semibold)',
            transitionProperty: 'var(--chakra-transition-property-common)',
            transitionDuration: 'var(--chakra-transition-duration-normal)',
            height: 'var(--chakra-sizes-10)',
            minWidth: 'var(--chakra-sizes-10)',
            fontSize: 'var(--chakra-fontSizes-md)',
            paddingInlineStart: 'var(--chakra-space-4)',
            paddingInlineEnd: 'var(--chakra-space-4)',
            background: 'var(--chakra-colors-gray-100)',
            _hover: {
                background: 'var(--chakra-colors-gray-300)',
                textDecoration: 'none'
            }
        }
    }
};
