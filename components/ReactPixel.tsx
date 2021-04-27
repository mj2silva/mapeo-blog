const ReactPixel = async () : Promise<typeof import('../node_modules/react-facebook-pixel/types/index')> => {
  const reactPixel = (await (import('react-facebook-pixel'))).default;
  reactPixel.init('294382768948111');
  return reactPixel;
};

export const pageViewFbPixel = async (): Promise<void> => {
  (await ReactPixel()).pageView();
};
export default ReactPixel;
