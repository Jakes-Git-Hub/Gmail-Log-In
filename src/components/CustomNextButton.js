import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomNextButton = styled(Button)({
    backgroundColor: '#1a73e8',
    color: 'white',
    padding: '5px 23.59px',
    fontSize: '15px',
    boxShadow: "none",
    '&:hover': {
        backgroundColor: 'rgb(34 106 202)',
        boxShadow: ('0px 3px 1px -2px rgba(0,0,0,0.2)', '0px 2px 2px 0px rgba(0,0,0,0.14)', '0px 1px 5px 0px rgba(0,0,0,0.12)'),    
        '& .MuiTouchRipple-child': {
            color: 'white',
            backgroundColor: '#1c58a8', // Change this to your desired ripple color
        },
    },
    textTransform: 'none',
    margin: 'margin: 7px 1.5px 20px 0;'
});

export default CustomNextButton;
