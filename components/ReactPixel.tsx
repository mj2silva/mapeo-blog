const ReactPixel = async () : Promise<typeof import('/home/manuelsilva/mapeo/mapeo-blog/node_modules/react-facebook-pixel/types/index')> => {
  const reactPixel = (await (import('react-facebook-pixel'))).default;
  reactPixel.init('844583566270749');
  return reactPixel;
};

export const pageViewFbPixel = async (): Promise<void> => {
  (await ReactPixel()).pageView();
};
export default ReactPixel;
