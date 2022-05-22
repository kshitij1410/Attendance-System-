import React, { useState, useEffect } from 'react'
import "./videoEle.css"
// import Excel from '../excel/Excel.jsx'


function VideoEle({ addToAttendance, attendance }) {


  var people = [
    { id: "1", name: "Lokesh", rollNo: "19eskcs127", img: "/my_profile.JPG" },
    // { id: "2", name: "Utsav",rollNo:"19eskcs133", img:"/vaibhav.jpeg" },
    { id: "3", name: "Kshtij", rollNo: "19eskcs121", img: "/kshtij.jpeg" },
    { id: "4", name: "ritik", rollNo: "19eskcs137", img: "/ritik.jpeg" },
    { id: "5", name: "Prof. Mayank Sir", rollNo: "Aap Ko Kon Nhi Janta", img: "/mayankSir.jpg" }
  ]



  function markPresent(id) {

    let student = people.find(p => {
      if (p.id === id) return p;
    })

    if (student) {

      addToAttendance((prev) => {


        let isStudentExist = prev.find(att => {
          if (att.id === id) return att;
        })

        if (isStudentExist) return prev;


        return [...prev, { ...student, time: new Date().toLocaleString() }];
      });
    }





  }

  var videoElem;
  var gLable = [];
  var queryImage1;


  async function processImage(queryImage1, name) {
    if (queryImage1) {
      const detections = await window.faceapi
        .detectSingleFace(queryImage1, new window.faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptor()


      console.log(detections);
      if (detections) {
        var labeledDescriptors = new window.faceapi.LabeledFaceDescriptors(
          name,
          [detections.descriptor]
        )
        gLable.push(labeledDescriptors);
        // startFaceRecognition();
      }
    }
  }


  async function getMedia(constraints) {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log(stream);
      videoElem.srcObject = stream;
      // await startFaceRecognition()
      let images = document.getElementsByClassName("image");
      for (let i = 0; i < images.length; i++) {
        console.log(images[i], images[i].dataval);
        await processImage(images[i], images[i].id);
      }


      // console.log(gLable); 
      /* use the stream */
    } catch (err) {
      console.log(err);
      /* handle the error */
    }
  }


  async function startFaceRecognition() {
    console.log("started")
    try {
      const canvas = await window.faceapi.createCanvasFromMedia(videoElem)
      var faceMatcher = new window.faceapi.FaceMatcher(gLable);
      document.body.append(canvas)
      const displaySize = { width: videoElem.width, height: videoElem.height }
      window.faceapi.matchDimensions(canvas, displaySize)
      console.log(gLable);
      setInterval(async () => {
        const detections = await window.faceapi.detectAllFaces(videoElem, new window.faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptors()
        detections.forEach(async fd => {
          const bestMatch = faceMatcher.findBestMatch(fd.descriptor)
          console.log("Finding face")
          console.log(bestMatch._label);
          await markPresent(bestMatch._label);
        })

        const resizedDetections = window.faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        window.faceapi.draw.drawDetections(canvas, resizedDetections)
        window.faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        window.faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
      }, 100)


    }
    catch (err) {

    }
  }



  useEffect(() => {

    videoElem = document.getElementById('video')
    queryImage1 = document.getElementById("image1");
    // queryImage2=document.getElementById("image2");
    console.log(videoElem);
    Promise.all([
      window.faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      window.faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      window.faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      window.faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(getMedia)

    videoElem.addEventListener('play', () => {
      startFaceRecognition();
    })


  }, [])

  return (
    <div className='face'>

      <video controls id="video" width="720" height="560" autoPlay muted></video>
      
      <div id="imgDiv" >
        {people.map((p) => {
          return <img width="200" height="200" src={p.img} className='image' id={p.id} />
        }
        )}

      </div>


      <div>
        <button
          onClick={() => {
            startFaceRecognition();
          }}>Start</button>
         
      </div>





    </div>
  );
}

export default VideoEle




