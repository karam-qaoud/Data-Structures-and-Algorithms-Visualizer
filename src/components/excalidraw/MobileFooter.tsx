import { useDevice, Footer } from '@excalidraw/excalidraw';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';

const MobileFooter = ({
  excalidrawAPI,
}: {
  excalidrawAPI: ExcalidrawImperativeAPI;
}) => {
  const device = useDevice();
  if (device.isMobile) {
    return <Footer></Footer>;
  }
  return null;
};
export default MobileFooter;
