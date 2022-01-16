Ractive.components.Loader = Ractive.extend({
  template: `
    <div class="loader">
      <div class="progress"></div>
    </div>
  `,
  css: `    
    @keyframes progress {
      0% {
        transform: translateX(-240px);
        opacity: 0;
      }
    
      50% {
        opacity: 1;
      }
    
      100% {
        transform: translateX(240px);
        opacity: 0;
      }
    }
    
    .loader {
      position: absolute;
      top: 0;
      left: 0;
      height: 2px;    
    }

    .progress {
      position: absolute;
      width: 120px;
      height: 2px;
      line-height: 2px;
      background-image: linear-gradient(-45deg, #eeeeee, #8fc2e4 );
      background-size: 120px 2px;
      animation: progress 1.8s ease-in-out 0s infinite;
    }
  `
})