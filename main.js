leftWristx = 0;
leftWristy=0;
rightWristx = 0;
rightWristy =0;
scoreleftWrist = 0;
scorerightWrist = 0;
song2_status = "";
song1_status = "";
var silhouette = "";
var colors = "";

function preload(){
    silhouette = loadSound("KANA-BOON - Silhouette.mp3");
    colors = loadSound("Flow - COLORS.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("Model Loaded");
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke('red');
    song1_status =  silhouette.isPlaying();
    song2_status = colors.isPlaying();

    if(scoreleftWrist>0.2){
        circle(leftWristx, leftWristy,20);
        colors.stop();
        if(song1_status == false){
            sillouette.play();
            document.getElementById("songName").innerHTML = "Sillouette";
        }
    }
    if(scorerightWrist>0.2){
        circle(rightWristx,rightWristy,20);
        sillouette.stop();
        if(song2_status == false){
            colors.play();
            document.getElementById("songName").innerHTML = "Colors"
        }
    }
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score is " + scoreleftWrist );
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("Left Wrist x is " + leftWristx+"Left Wrist y is " + leftWristy);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("Right Wrist Score is "+ scorerightWrist);
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("Right Wrist x is "+ rightWristx+"Right Wrist y is "+rightWristy);
    }
}
