import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // loads tsparticles-slim
import { useCallback, useMemo } from "react";

// tsParticles Repository: https://github.com/matteobruni/tsparticles
// tsParticles Website: https://particles.js.org/
const ParticlesComponent = (props) => {
  // using useMemo is not mandatory, but it's recommended since this value can be memoized if static
const options = useMemo(() => {
    // using an empty options object will load the default options, which are static particles with no background and 3px radius, opacity 100%, white color
    // all options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
    return {
      "background": {
        "color": {
          "value": "#222831",
        },
        "repeat": "no-repeat",
      },
      "fullScreen": {
        "zIndex": 1,
      },
        "autoPlay": true,

        "particles": {
          "number": {
            "value": 168,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#00ADB5"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#00ADB5"
            },
            "polygon": {
              "nb_sides": 5
            },
          },
          "opacity": {
            "value": 1,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0,
              "sync": false
            }
          },
          "size": {
            "value": 4.008530152163807,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "size_min": 1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 600
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "bubble"
            },
            "onclick": {
              "enable": true,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 410,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 170.53621458328246,
              "size": 10.241544246026905,
              "duration": 2,
              "opacity": 0,
              "speed": 3
            },
            "repulse": {
              "distance": 300,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
        }
}, []);

  // useCallback is not mandatory, but it's recommended since this callback can be memoized if static
const particlesInit = useCallback((engine) => {
    loadSlim(engine);
    // loadFull(engine); // for this sample the slim version is enough, choose whatever you prefer, slim is smaller in size but doesn't have all the plugins and the mouse trail feature
}, []);

  // setting an id can be useful for identifying the right particles component, this is useful for multiple instances or reusable components
return < Particles id={props.id} init={particlesInit} options={options} />;
};

export default ParticlesComponent;