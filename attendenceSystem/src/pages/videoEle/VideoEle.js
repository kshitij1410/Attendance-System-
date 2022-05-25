import { func } from 'prop-types';
import React, { useState, useEffect } from 'react'
import UserList from '../userList/UserList';
import "./videoEle.css"



function VideoEle({ addToAttendance, attendance,people }) {


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


        return [...prev, { ...student, time: new Date().toLocaleString(), isPresent: true }];
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

      videoElem.srcObject = stream;
      // await startFaceRecognition()
      let images = document.getElementsByClassName("image");
      for (let i = 0; i < images.length; i++) {

        await processImage(images[i], images[i].id);
      }

    } catch (err) {
      console.log(err);
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

      setInterval(async () => {

        const detections = await window.faceapi.detectAllFaces(videoElem, new window.faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptors()
        
        detections.forEach(async fd => {
          const bestMatch = faceMatcher.findBestMatch(fd.descriptor)
          // console.log(bestMatch);
          if(bestMatch._distance >= 0.4)
          { 
            await markPresent(bestMatch._label);
          }
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

  function downloadExcel() {

    addToAttendance((attendance) => {


      const markedAttendace = people.map(p => {
      
        let isfind = attendance.find((a) => {
          // console.log("a.id", a.id)
          if (a.id === p.id) {
            return a;
          }
        })
        // console.log(isfind)
        if (isfind) {
          return { ...isfind, isPresent: true };
          
        }
        else {
          // console.log("isfind",isfind);
          return { ...p, time: new Date().toLocaleString(), isPresent: false };
        }
      })
      console.log("markedAttendence", markedAttendace);
      localStorage.setItem("attendance", JSON.stringify(markedAttendace));
      window.location.href="/recent"
      return markedAttendace;
    })
    // addToAttendance(markedAttendace);
    
    document.getElementById("clickMe").click();
  }

  function setTime(time) {
    setTimeout(() => {

      downloadExcel();
     
    }, time);
  }

  useEffect(() => {

    videoElem = document.getElementById('video')
    queryImage1 = document.getElementById("image1");

    Promise.all([
      window.faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      window.faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      window.faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      window.faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(getMedia)
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
            localStorage.clear("attendance");
            document.getElementById("start").innerHTML="Started"
            startFaceRecognition();
          setTime(Number(document.getElementById("TimerValue").value) *60000);
          }}>
          <p id="start">Start</p>
          </button>
          <br/>
          <label >Enter Time in Minutes: </label>
          <input type="number" defaultValue="1" id="TimerValue"/>


      </div>
    </div>
  );
}

export default VideoEle;




