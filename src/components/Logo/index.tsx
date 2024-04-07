import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project import
import { Logo } from './Logo';
import { activeItem } from '../../store/reducers/menuSlice';
import { RootState } from '../../store';

// ==============================|| MAIN LOGO ||============================== //

type LogoSectionProps = {
  sx: object;
  to: string;
};

export const LogoSection = ({ sx, to }: LogoSectionProps) => {
  const { defaultId } = useSelector((state: RootState) => state.menu);
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={to}
      sx={sx}
    >
      <Logo />
    </ButtonBase>
  );
};
