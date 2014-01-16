function writeInFile() {
    // Wait for device API libraries to load
    //
    
    
    
    
    
        console.log("Device ready");
        document.getElementById("debug").innerHTML += "Device ready...<br />";
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    

    function gotFS(fileSystem) {
        document.getElementById("debug").innerHTML += "GotFS...<br />";
        fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        document.getElementById("debug").innerHTML += "Got file entry...<br />";
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
        document.getElementById("debug").innerHTML += "Got file writer...<br />";
            writer.onwriteend = function(evt) {
                for(var i=100; i>80; i--) {
                    writer.write(""+i+"\r\n");
                    writer.onwriteend = function(evt) {//console.log("contents of file now 'some different text'");
                    };
                }
            };
        document.getElementById("debug").innerHTML += "Written in file.<br />";
        //Written ; let's read it
        readFile();
    }

    function fail(error) {
        document.getElementById("debug").innerHTML += "FAIL :"+error.code+"<br />";
        console.log(error.code);
    }
    
}
        
        
        
    function readFile() {
        
        document.addEventListener("deviceready", onDeviceReady, false);
    
        // device APIs are available
        //
        function onDeviceReady() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        }
    
        function gotFS(fileSystem) {
            fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
        }
    
        function gotFileEntry(fileEntry) {
            fileEntry.file(gotFile, fail);
        }
    
        function gotFile(file){
            readAsText(file);
        }
    
        function readAsText(file) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                console.log("Read as text");
                console.log(evt.target.result);
                document.getElementById("debug").innerHTML += "Read as text : "+evt.target.result;
            };
            reader.readAsText(file);
        }
    
        function fail(error) {
            console.log(error.code);
        }
            
    }
