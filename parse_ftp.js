var os = require('os');
if (os.platform() == 'win32') {
    var chilkat = require('chilkat_node5_win32');
} else if (os.platform() == 'linux') {
    if (os.arch() == 'arm') {
        var chilkat = require('chilkat_node5_arm');
    } else if (os.arch() == 'x86') {
        var chilkat = require('chilkat_node5_linux32');
    } else {
        var chilkat = require('chilkat_node5_linux64');
    }
} else if (os.platform() == 'darwin') {
    var chilkat = require('chilkat_node5_macosx');
}



function chilkatExample() {

    var ftp = new chilkat.Ftp2();
    var success;


    //  Any string unlocks the component for the 1st 30-days.
    success = ftp.UnlockComponent("Anything for 30-day trial");
    if (success !== true) {
        console.log(ftp.LastErrorText);
        return;
    }

    ftp.Hostname = "hostin13.ftp.ukraine.com.ua";
    ftp.Username = "hostin13_bot";
    ftp.Password = "123designloft456";

    //  Connect and login to the FTP server.
    success = ftp.Connect();
    if (success !== true) {
        console.log(ftp.LastErrorText);
        return;
    }
    else {
        console.log("Connected to FTP");
    }

    var ftpDir = "www/export/fileBot";
    var localFileDir = "temp/";
    var remoteFileName = "*.php";

    //  Change to the remote directory where the file is located.
    success = ftp.ChangeRemoteDir(ftpDir);
    if (success !== true) {
        console.log(ftp.LastErrorText);
        return;
    }
    else {
        console.log("Connected to DIR");
    }



    //  Download a files.
    var numFilesDownloaded = ftp.MGetFiles(remoteFileName,localFileDir);
    if (numFilesDownloaded < 0) {
        console.log(ftp.LastErrorText);
        return;
    }
    else{
        console.log(numFilesDownloaded + " files was download");

        //Delete files from FTP
        var numDeleted = ftp.DeleteMatching(remoteFileName);
        if (numDeleted < 0) {
            console.log(ftp.LastErrorText);
            return;
        }
        else{
            console.log(numDeleted + " Files deleted");
        }
    }

    success = ftp.Disconnect();

}

chilkatExample();