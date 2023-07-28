import { extendTheme } from '@chakra-ui/react';

const myTheme = extendTheme({
    colors: {
        brand: {
            orange: "#e6791e",
            lightorange: "#f58e38",
            black: "#212121",
            gray: "#666565",
            lightgray: "#a8a8a8",
            white: "#d4d4d4"
        },
    },
});

export default extendTheme(myTheme);