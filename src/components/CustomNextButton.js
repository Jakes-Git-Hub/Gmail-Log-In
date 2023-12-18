import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomNextButton = styled(Button)({
    backgroundColor: 'rgb(26,115,232)',
    border: '2px solid rgb(26,115,232)',
    color: 'white',
    padding: '3px 21.59px',
    fontSize: '15px',
    '&:hover': {
        backgroundColor: 'rgb(34 106 202)',
        boxShadow: ('0 1px 2px 0 rgba(60, 64, 67, .3)', 
                    '0 1px 3px 1px rgba(60, 64, 67, .15)'),
        border: '2px solid rgb(34 106 202)',    
        '& .MuiTouchRipple-child': {
            backgroundColor: 'rgb(33 88 161)', // Change this to your desired ripple color
          },
    },
    textTransform: 'none',
    margin: 'margin: 7px 1.5px 20px 0;'
}); 

export default CustomNextButton;
