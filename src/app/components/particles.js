import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles'; // if you are going to use `loadFull`, install the "tsparticles" package too.
//import { loadSlim } from 'tsparticles-slim'; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import Options from './particles.json';

import { tsParticles } from 'tsparticles-engine';
import { loadPolygonPath } from 'tsparticles-path-polygon';

// tsParticles Repository: https://github.com/matteobruni/tsparticles
// tsParticles Website: https://particles.js.org/
const ParticlesComponent = (props) => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadPolygonPath(tsParticles);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  // setting an id can be useful for identifying the right particles component, this is useful for multiple instances or reusable components
  return (
    <Particles id={props.id} init={particlesInit} loaded={particlesLoaded} options={Options} />
  );
};

export default ParticlesComponent;
