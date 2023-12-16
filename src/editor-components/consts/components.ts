import {
  HiOutlineArrowsExpand,
  HiOutlineCloudUpload,
  HiOutlineCube,
  HiOutlineDownload,
  HiOutlineInformationCircle,
  HiOutlinePhotograph,
  HiOutlineTranslate,
} from 'react-icons/hi';
import {RiAiGenerate} from 'react-icons/ri'
import {LiaTshirtSolid} from 'react-icons/lia'
import { TbTextSize } from 'react-icons/tb';
import { BiLayerPlus } from 'react-icons/bi';

export const TOOLBAR_TABS = [
  {icon:LiaTshirtSolid , title: 'Product'},
  { icon: BiLayerPlus, title: 'Layers' },
  { icon: RiAiGenerate, title: 'Design with AI' },
  { icon: TbTextSize, title: 'Custom Text' },
  //{ icon: HiOutlineDownload, title: 'Export' },
  { icon: HiOutlinePhotograph, title: 'Images' },
  { icon: HiOutlineCloudUpload, title: 'Upload' },
  { icon: HiOutlineCube, title: 'Shapes' },
  //{ icon: HiOutlineInformationCircle, title: 'Hotkeys' },
];

export const NAVBAR_HEIGHT = 56;
export const EDITING_TOOLBAR_HEIGHT = 50;
export const FRAME_CONTAINER_PADDING = 20;
export const LOGO_FONT = '"Reem Kufi Fun", sans-serif';
