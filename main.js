leftwristX = 0;
leftwristY = 0;

rightwristX = 0;
rightwristY = 0;

scoreleftwrist = 0;
scorerightwrist = 0;

the_untold_story = "";
music = "";

status_the_untold_story = "";
status_music = "";

function preload()
{
    the_untold_story = "the untold story.mp3";
    music = "music.mp3";
}

function setup()
{
    var canvas = createCanvas(450, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("posenet is laoded");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftwristX + "leftWristY = " + leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightwristX + "rightWristY = " + rightwristY);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
    }
}

function draw()
{
    image(video, 0, 0, 450, 450);

    status_the_untold_story = the_untold_story.isPlaying();
    fill("red");
    stroke("#FF0000");
    if(scoreleftwrist >= 0.2)
    {
        circle(leftwristX, leftwristY, 100);
        music.stop();
        if(status_the_untold_story == false)
        {
            the_untold_story.play();
            document.getElementById("yay").innerHTML = "playing the untold story";
        }
    }
}