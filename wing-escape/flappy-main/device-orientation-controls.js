let debug = document.getElementById("debug");
debug.innerHTML = "Device Orientation API is not supported by your browser.";

let orientbutton = document.getElementById("orientbutton");
let startbutton = document.getElementById("startbutton");

startbutton.style.display = "none";

let jumpvalue = 0;
let jump = false;
let counterdebug = 0;

function requestOrientationPermission() {
  console.log("requesting orientation permission");

  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    console.log("This is an iOS device.");

    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response == "granted") {
          window.addEventListener("deviceorientation", (e) => {
            const acl = new Accelerometer({ frequency: 60 });
            acl.addEventListener("reading", () => {
              let x = (Math.round(acl.x * 100) / 100).toFixed(2);

              if (!jump) {
                if (x > 2 || x < -2) {
                  jumpvalue = 1;
                  jump = true;
                  bird_dy = -7.6;
                }
              }
              if (x < 1 && x > -1) {
                jumpvalue = 0;
                jump = false;
              }

              debug.innerHTML = jumpvalue + " - " + x;
            });
            acl.start();
            startbutton.style.display = "block";
            orientbutton.style.display = "none";
          });
        }
      })
      .catch(console.error);
  } else {
    console.log("This is not an iOS device!");
       const acl = new Accelerometer({ frequency: 60 });
      acl.addEventListener("reading", () => {
        let x = (Math.round(acl.x * 100) / 100).toFixed(2);

        if (!jump) {
          if (x > 2 || x < -2) {
            jumpvalue = 1;
            jump = true;
            bird_dy = -7.6;
          }
        }
        if (x < 1 && x > -1) {
          jumpvalue = 0;
          jump = false;
        }

        debug.innerHTML = jumpvalue + " - " + x;
      });
      acl.start();
      startbutton.style.display = "block";
      orientbutton.style.display = "none";
  
    
  }
}
