import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function DiscreteSlider({ value, onChange }) {
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                aria-label="Password Length"
                value={value} 
                onChange={onChange} 
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={10} 
            />
        </Box>
    );
}
