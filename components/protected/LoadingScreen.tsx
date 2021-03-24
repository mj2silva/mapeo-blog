import Image from 'next/image';
import { FC } from 'react';

const LoadingScreen : FC = () => (
  <main>
    <div className="loading-screen">
      <div className="loading-screen__loader">
        <div className="loading-screen__logo-circle">
          <Image src="/img/circulo-cliente.svg" layout="fill" />
        </div>
        <h1 className="loading-screen__text">M</h1>
      </div>
    </div>
  </main>
);

export default LoadingScreen;
