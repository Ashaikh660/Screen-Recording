let btn = document.querySelector(".record-btn");

btn.addEventListener("click", async function () {
    let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
    });

    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";

    let mediaRecorder = new MediaRecorder(stream, {
        mimeType: mime
    });

    let chunks = [];

    mediaRecorder.addEventListener("dataavailable", function (e) {
        chunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", function () {
        let blob = new Blob(chunks, {
            type: mime
        });

        let url = URL.createObjectURL(blob);

        let video = document.querySelector("video");
        video.src = url;

        let a = document.createElement("a");
        a.href = url;
        a.download = "screen-recording.webm";
        a.click();
    });

    mediaRecorder.start();

    // Optional: Stop recording after 10 seconds
    setTimeout(() => {
        mediaRecorder.stop();
    }, 10000);
});