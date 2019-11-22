window.onload = function(){

    // Berechtigungen
    let constraints = { video: { facingMode: "user" }, audio: false };

    // laden der Elemente
    const cameraView = document.querySelector("#camera--view"),
        cameraOutput = document.querySelector("#camera--output"),
        cameraSensor = document.querySelector("#camera--sensor"),
        cameraTrigger = document.querySelector("#camera--trigger");

    // Kamera Starten
    function cameraStart() {
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function(stream) {
                track = stream.getTracks()[0];
                cameraView.srcObject = stream;
            })
            .catch(function(error) {
                console.error("Oops. Something is broken.", error);
            });
    }

    // Foto aufnehmen
    cameraTrigger.onclick = function() {
        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/webp");
        cameraOutput.classList.add("taken");
    };

    // startet den Stream  beim Start
    window.addEventListener("load", cameraStart, false);
};