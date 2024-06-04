import React, { useState } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface SortToggleProps {
  onSortChange?: (sortOrder: 'asc' | 'desc') => void;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 0,
}));

const StyledIcon = styled('div')<{ active: boolean }>(({ theme, active }) => ({
  color: active ? theme.palette.light.main : theme.palette.dark.main,
}));

const SortToggle: React.FC<SortToggleProps> = ({ onSortChange }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>('asc');

  const sortUp = () => {
    if (sortOrder !== 'asc') {
      setSortOrder('asc');
    } else {
      setSortOrder(undefined);
    }
  };

  const sortDown = () => {
    if (sortOrder !== 'desc') {
      setSortOrder('desc');
    } else {
      setSortOrder(undefined);
    }
  };

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <StyledIconButton >
        <StyledIcon active={sortOrder === 'asc'}>
          <ArrowDropUpIcon onClick={sortUp} sx={{margin: -2, fontSize: '2rem'}}/>
        </StyledIcon>
        <StyledIcon active={sortOrder === 'desc'}>
          <ArrowDropDownIcon onClick={sortDown} sx={{fontSize: '2rem'}}/>
        </StyledIcon>
      </StyledIconButton>
    </Box>
  );
};

export default SortToggle;