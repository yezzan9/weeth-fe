// utils/iconUtils.ts
import FEIcon from '@/assets/images/ic_FE_color.svg';
import BEIcon from '@/assets/images/ic_BE_color.svg';
import DEIcon from '@/assets/images/ic_DE_color.svg';
import ADIcon from '@/assets/images/ic_MA_color.svg';

const positionIcons: Record<string, string> = {
  FE: FEIcon,
  BE: BEIcon,
  DE: DEIcon,
  AD: ADIcon,
};

const setPositionIcon = (role: string, position: string): string => {
  return role === 'ADMIN' ? ADIcon : positionIcons[position] || FEIcon;
};

export default setPositionIcon;
