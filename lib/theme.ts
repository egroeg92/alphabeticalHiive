import { extendTheme, ThemeConfig } from '@chakra-ui/react'

interface CustomFonts {
    heading: string;
    body: string;
}

const config: ThemeConfig & { fonts: CustomFonts } = {
    initialColorMode: 'system',
    useSystemColorMode: true,
    fonts: {
        heading: 'var(--font-rubik)',
        body: 'var(--font-rubik)',
    },
}

const theme = extendTheme({ config });

export default theme