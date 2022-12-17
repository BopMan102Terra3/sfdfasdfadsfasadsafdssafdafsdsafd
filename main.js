img = "";
status = "";
objects = [];



function preload()
{
    song = loadSound("mixkit-police-siren-us-1643.wav");

}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    
}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
    
}

function start()
{
   objectDetector = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 380, 380);
    
    if(status != "")
    {
        r = random(225);
        g = random(225);
        b = random(225);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
        if(objects[i].label == person)
        {
            document.getElementById("number_of_objects").innerHTML = "Baby Found" ;
            console.log("stop");
            song.stop();
        }
        else
        {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found" ;
            console.log("play");
            song.play();
        }
    }
   

    
}


